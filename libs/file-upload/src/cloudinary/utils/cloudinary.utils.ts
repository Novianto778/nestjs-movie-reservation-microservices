import cloudinary from '../cloudinary.config';

export const generateUploadSignature = ({ folder }: { folder: string }) => {
  const timestamp = Math.floor(Date.now() / 1000);

  const params = {
    timestamp,
    folder,
    upload_preset: 'movie_poster',
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET as string,
  );

  return {
    ...params,
    signature,
  };
};
