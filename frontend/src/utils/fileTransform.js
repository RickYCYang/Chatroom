import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

export const transformToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // Resolve the Base64 string result
    reader.onload = () => {
      resolve(reader.result);
    };
    // Reject if error occurs
    reader.onerror = () => {
      reject(reader.error);
    };
    // Read the file
    reader.readAsDataURL(file);
  });
};
