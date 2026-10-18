
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
                error: true,
                success: false
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY_ACCESS_TOKEN
        );

        req.userid = decoded.id;

        next();
    } catch (error) {
        console.error("Token verification error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired access token.",
            error: true,
            success: false
        });
    }
};

export default auth;
