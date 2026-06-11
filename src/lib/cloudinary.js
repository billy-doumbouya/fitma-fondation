// src/lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

export async function uploadBuffer(buffer, folder = "fitma", resourceType = "image") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType, transformation: [{ quality:"auto", fetch_format:"auto" }] },
      (err, result) => err ? reject(err) : resolve({ url: result.secure_url, publicKey: result.public_id })
    )
    stream.end(buffer)
  })
}

export async function deleteFile(publicKey, resourceType = "image") {
  return cloudinary.uploader.destroy(publicKey, { resource_type: resourceType })
}
