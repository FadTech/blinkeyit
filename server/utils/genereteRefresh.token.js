const generateRefreshToken = async (userId) => {
    const token = jwt.sign({ userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '7d' }
    )

    const updateRefreshTokenUser = await UserModel.updateOne(

        { _id: userId },
        {
            refreshToken: token
        }
    )
    return token;
}

export default generateRefreshToken;