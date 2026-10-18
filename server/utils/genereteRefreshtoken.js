import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const generateRefreshToken = async (userid) => {
    const token = jwt.sign({ userid: userid },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '7d' }
    )

    const updateRefreshTokenUser = await UserModel.updateOne(

        { _id: userid },
        {
            refresh_token: token
        }
    )
    return token;
}

export default generateRefreshToken;