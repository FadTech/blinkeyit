import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())
    const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "blinkeyit" }, (error, UploadeResult) => {
           return resolve(UploadeResult)
        }).end(buffer)
    })
    return uploadedImage
};

export default uploadImageCloudinary;