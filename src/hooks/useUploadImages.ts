import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const useUploadImages = (images: File[]) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  // TODO: need to create custom hook for uploading image to firebase
  useEffect(() => {
    setImageUrls([]);
    const uploadImages = async (image: File) => {
      const imageRef = ref(storage, image?.name);
      const metadata = {
        contentType: image.type,
        cacheControl: 'public, max-age=3600', // Cache images for 1 hour (3600 seconds)
      };
      await uploadBytes(imageRef, image, metadata);
      const url = await getDownloadURL(imageRef);
      setImageUrls((prev) => [...prev, url]);
      setIsImageUploading(false);
    };
    if (images.length !== 0) {
      images?.map((image) => {
        setIsImageUploading(true);
        uploadImages(image);
      });
    }
  }, [images, setImageUrls]);

  return {imageUrls, isImageUploading};
};

export default useUploadImages;
