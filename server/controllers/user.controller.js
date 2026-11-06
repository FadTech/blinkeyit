import sendEmail  from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import { response } from "express";
import generateAccessToken from "../utils/generateAccesstoken.js";
import generateRefreshToken from "../utils/genereteRefreshtoken.js";
import uploadImageCloudinary from "../utils/uploadimageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";

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
        const refresh_token = await generateRefreshToken(user._id)

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        };

        res.cookie("accessToken", accessToken,cookieOptions);
        res.cookie("refresh_token", refresh_token,cookieOptions);

        return res.json({
            message: "Login successful",
            error: false,
            success: true,
            data: {
                accessToken,
                refresh_token,
               
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
        const userid = req.userid;
        
        if (!userid) {
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

       await UserModel.findByIdAndUpdate(userid, {
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
         const userid = req.userid;
        const image = req.file;

        const uploadedImage = await uploadImageCloudinary(image);
        await UserModel.findByIdAndUpdate(userid, {
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
        const userid = req.userid;
        const { name, email, mobile, password } = req.body;
        let hashPassword = null;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);

        }

        const updateUser = await UserModel.updateOne({ _id: userid }, {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(password && { password: hashPassword })
            })
            return res.json({
                message: "User details updated successfully",
                error: false,
                success: true,
                data: updateUser
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

export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Utilisateur non trouvé avec cet email",
                error: true,
                success: false
            });
        }
        const otp = generateOtp();
        const expireTime = new Date(Date.now()  + 60 * 60 * 1000); // 10 minutes from now
        const update = await UserModel.findByIdAndUpdate(user._id, {
                forgot_password_otp: otp,
                forgot_password_otp_expire_time: new Date(expireTime).toISOString() // 10 minutes from now

            })
            await sendEmail({
                sendTo: email,
                subject: "Réinitialisation de votre mot de passe sur Blinkeyit",
                html: forgotPasswordTemplate({ name: user.name, otp : otp })
            });

        return res.json({
            message: "OTP generated successfully. Please check your email for the OTP.",
            data: {
                otp,
                expireTime: new Date(expireTime).toISOString()
            },
            error: false,
            success: true
        });
    } catch (error) {
        console.error("Erreur forgotPasswordController :", error);
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

export async function verifyForgotPasswordOtpController(req, res) {
    try {
            const { email, otp } = req.body;


            if (!email || !otp) {
                return res.status(400).json({
                    message: "Email and OTP are required",
                    error: true,
                    success: false
                });
            }

            const user = await UserModel.findOne({ email });
           
            if (!user) {
                return res.status(400).json({
                    message: "Utilisateur non trouvé avec cet email",
                    error: true,
                    success: false
                });
            }

             const currentTime = new Date().toISOString();

             if (user.forgot_password_expiry > currentTime) {
                return res.status(400).json({
                    message: "OTP a expiré",
                    error: true,
                    success: false
                });
            }

            if (otp !== user.forgot_password_otp) {
                return res.status(400).json({
                    message: "OTP incorrect",
                    error: true,
                    success: false
                });
            }
                return res.json({
                    message: "OTP vérifié avec succès",
                    error: false,
                    success: true
                });
            } catch (error) {
                console.error("Erreur verifyForgotPasswordOtpController :", error);
                return res.status(500).json({
                    message: error.message || error,
                    error: true,
                    success: false,
            });
        }
}

export async function resetPasswordController(req, res) {
    try {
            const { email, newPassword, confirmPassword } = req.body;

            if (!email || !newPassword || !confirmPassword) {
                return res.status(400).json({
                    message: "Email, new password, and confirm password are required",
                    error: true,
                    success: false
                });
            }

             const user = await UserModel.findOne({ email });
            
            if (!user) {
                return res.status(400).json({
                    message: "Utilisateur non trouvé avec cet email",
                    error: true,
                    success: false
                });
            }

             if(newPassword !==confirmPassword){
                return res.status(400).json({
                    message: "Le nouveau mot de passe et le mot de passe de confirmation ne correspondent pas",
                    error: true,
                    success: false
                });
            }
           
           
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);

            const update = await UserModel.findOneAndUpdate(user._id,{
                password: hashPassword,
            })

            return res.json({
                message: "Mot de passe réinitialisé avec succès",
                error: false,
                success: true
            });
            
        } catch (error) {
            console.error("Erreur resetPasswordController :", error);
            return res.status(500).json({
                message: error.message || error,
                error: true,
                success: false,
            });
        }
}

export async function refreshTokenController(req, res) {
    try {
        const refresh_token =
        req.cookies?.refresh_token ||
        req.headers.authorization?.split(" ")[1];

        
        if (!refresh_token) {
            return res.status(401).json({
                message: "Refresh token not found",
                error: true,
                success: false
            });
        }

        const verifyToken = await jwt.verify(refresh_token, process.env.SECRET_KEY_REFRESH_TOKEN);
        
        if (!verifyToken) {
            return res.status(401).json({
                message: "Invalid refresh token",
                error: true,
                success: false
            });
        }

        const userid = verifyToken.id;

        const newAccessToken = await generateAccessToken(userid);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.cookie("accessToken", newAccessToken, cookieOptions); 

        return res.json({
            message: "Access token refreshed successfully",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });

    }
}

    