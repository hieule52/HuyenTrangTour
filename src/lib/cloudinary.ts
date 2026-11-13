import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImageToCloudinary(
  base64Data: string,
  folder = 'huyentrangtour/reviews'
): Promise<{ url: string; publicId: string }> {
  // If Cloudinary credentials are not configured, fallback to data URI / local placeholder
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.warn('⚠️ Cloudinary is not fully configured, using base64 preview format as fallback.');
    return {
      url: base64Data,
      publicId: `mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };
  }

  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    transformation: [
      { width: 1200, height: 1200, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export default cloudinary;

