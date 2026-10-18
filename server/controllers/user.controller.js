import sendEmail  from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import { response } from "express";
import generateAccessToken from "../utils/generateAccesstoken.js";
import generateRefreshToken from "../utils/genereteRefreshtoken.js";
import uploadImageCloudinary from "../utils/uploadimageCloudinary.js";


export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body

       if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required",
                error: true,
                success: false
            })
        }

        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                error: true,
                success: false
            })
        }


        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)



        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();
        const verifyEmail = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        console.log("email", email);
        const verifyEmailSend = await sendEmail({
            sendTo : email,
            subject : "Verification de votre email sur Blinkeyit",
            html : verifyEmailTemplate({
                name,
                url :verifyEmail
            })

        });

        
            return res.json({
                message: "Utilisateur enregistré avec succès. Veuillez vérifier votre email pour activer votre compte.",
                error: false,
                success: true,
                data: save
            })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
            
        })
    }
}

export async function verifyEmailController(req,res) {
    try {

        const { code } = req.body

        const user = await UserModel.findOne({ _id: code })
        if (!user) {
            return res.status(400).json({
                message: "Invalid verification code",
                error: true,
                success: false
            })
        }

        const updatedUser = await UserModel.updateOne({ _id: code }, {
            verify_email : true 
        })

        return res.json({
            message: "Email verified successfully",
            success: true,
            error: false,
        })
    }
        catch(error){
            return res.status(500).json({
                message: error.message || error,
                error: true,
                success: false,
            })

        }
    }

// login controler

export async function loginUserController(req, res) {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Provide email,password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Utilisateur non trouvé avec cet email",
                error: true,
                success: false
            })
        }

        if ( user.status !== "active") {
            return res.status(400).json({
                message: "Votre compte est inactif. Veuillez contacter l'administrateur.",
                error: true,
                success: false
            })
        }

        const chekpasword = await bcrypt.compare(password, user.password)
        if (!chekpasword) {
            return res.status(400).json({
                message: "Mot de passe incorrect",
                error: true,
                success: false
            })
        }

        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        };

        res.cookie("accessToken", accessToken,cookieOptions);
        res.cookie("refresh_token", refreshToken,cookieOptions);

        return res.json({
            message: "Login successful",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
               
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

// logout controller

export async function logoutUserController(req,res) {
    try {
        const userId = req.userid;
        
        if (!userId) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        };
        res.clearCookie("accessToken", cookiesOptions);
        res.clearCookie("refresh_token", cookiesOptions);

       await UserModel.findByIdAndUpdate(userId, {
                $set: { refresh_token: null }
        });

        return res.json({
            message: "Logout successful",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export async function UploadeAvatar(req, res) {
    try {
         const userId = req.userid;
        const image = req.file;

        const uploadedImage = await uploadImageCloudinary(image);
        await UserModel.findByIdAndUpdate(userId, {
            $set: { profileImage: uploadedImage.secure_url }
        });
        return res.json({
            message: "Avatar uploaded successfully",
            error: false,
            success: true
        });
    } catch (error) {

          console.error("Erreur uploadAvatar :", error);

        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export async function updateUserDetails(req, res) {
    try {
        const userId = req.userid;
        const { name, email, mobile, password } = req.body;
        let hashPassword = null;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);

        }

        const updateData = await UserModel.findByIdAndUpdate(userId, {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(password && { password: hashPassword })
            })
            return res.json({
                message: "User details updated successfully",
                error: false,
                success: true,
                data: updateData
            })
        
    } catch (error) {
        console.error("Erreur updateUserDetails :", error);
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}