import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
// export const uploadFile = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto", 
//     });
//     console.log("File uploaded:", result.secure_url);
//     return result;  
//   } catch (error) {
//     console.error("Error uploading file to Cloudinary:", error);
//     throw error;
//   }
// };

 
// export const deleteImage = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: "image",
//     });
//     console.log("Image deleted:", result);
//     return result;
//   } catch (error) {
//     console.error("Error deleting image from Cloudinary:", error);
//     throw error;
//   }
// };

export default cloudinary