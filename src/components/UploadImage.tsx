import useUploadImage from "@/hooks/useUploadImages";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

type UploadImageProps = {
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  singleImage?: boolean;
};

const UploadImage = ({
  setImageUrls,
  className,
  singleImage,
}: UploadImageProps) => {
  const [images, setImages] = useState<File[]>([]);
  const { isImageUploading, imageUrls } = useUploadImage(images);
  const isDropZoneDisabled = singleImage && imageUrls.length === 1;
  if (imageUrls) {
    setImageUrls(imageUrls);
  }
  //   TODO: make onDrop function cleaner
  const onDrop = async (acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    ) as File[];
    if (!images) {
      setImages(acceptedFiles);
    } else {
      setImages((prev) => [...(prev as File[]), ...imageFiles]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      {!isDropZoneDisabled ? (
        <div>
          {isImageUploading ? (
            <div
              className={className}
              style={{
                border: "2px dashed #ccc",
                borderRadius: "5px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <p>Изображение загружается, пожалуйста, подождите</p>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={className}
              style={{
                border: "2px dashed #ccc",
                borderRadius: "5px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} disabled={isImageUploading} />
              {isDragActive ? (
                <p>Drop the images here ...</p>
              ) : (
                <p>
                  Перетащите сюда несколько изображений или щелкните, чтобы
                  выбрать некоторые
                </p>
              )}
            </div>
          )}
        </div>
      ) : null}

      <div className="flex gap-4 mt-3">
        {images?.map((item) => (
          <img
            src={URL.createObjectURL(item)}
            alt="Uploaded"
            className="w-[80px] h-[100px]"
          />
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
