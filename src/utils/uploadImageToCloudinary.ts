// src/utils/uploadImageToCloudinary.ts

export const uploadImageToCloudinary = async (image: File) => {
  try {
    const formData = new FormData();

    formData.append('file', image);

    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await res.json();

    return data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
