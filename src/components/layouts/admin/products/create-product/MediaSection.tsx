import { Upload, X, Video, ImageIcon } from 'lucide-react';
import { SectionTitle, FormInput } from './BasicInformationSection';

interface MediaSectionProps {
  thumbnail: string;
  images: string[];
  formData: {
    videoUrl: string;
  };
  uploading: boolean;
  onThumbnailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailRemove: () => void;
  onImagesUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
  onVideoUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MediaSection = ({
  thumbnail,
  images,
  formData,
  uploading,
  onThumbnailUpload,
  onThumbnailRemove,
  onImagesUpload,
  onImageRemove,
  onVideoUrlChange,
}: MediaSectionProps) => {
  return (
    <div className="space-y-4">
      <SectionTitle
        icon={<ImageIcon className="w-4 h-4 text-purple-500" />}
        title="Images & Video"
        subtitle="Upload product images and optional video"
      />

      {/* Thumbnail */}
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Thumbnail *
        </label>

        {!thumbnail ? (
          <UploadBox
            text="Click to upload thumbnail"
            subText="PNG, JPG, WEBP — max 2MB"
          >
            <input
              type="file"
              accept="image/*"
              onChange={onThumbnailUpload}
              disabled={uploading}
              className="hidden"
            />
          </UploadBox>
        ) : (
          <div className="relative inline-block">
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-32 h-32 object-cover rounded-lg border-3 border-orange-500 shadow-sm"
            />
            <button
              type="button"
              onClick={onThumbnailRemove}
              className="absolute -top-3 -right-3 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Product Images */}
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Images ({images.length}/10)
        </label>

        <UploadBox
          text="Add product images"
          subText="Maximum 10 images — 2MB each"
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImagesUpload}
            disabled={uploading}
            className="hidden"
          />
        </UploadBox>

        {images.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mt-4">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative aspect-square group"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => onImageRemove(index)}
                  className="absolute -top-3 -right-3 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video URL */}
      <FormInput
        label="Product Video URL (optional)"
        name="videoUrl"
        placeholder="https://www.youtube.com/watch?v=..."
        value={formData.videoUrl}
        onChange={onVideoUrlChange}
        icon={<Video className="w-4 h-4" />}
      />
    </div>
  );
};

interface UploadBoxProps {
  children: React.ReactNode;
  text: string;
  subText?: string;
}

const UploadBox = ({ children, text, subText }: UploadBoxProps) => {
  return (
    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-all bg-gray-50 dark:bg-gray-800/50 py-8 hover:bg-orange-50 dark:hover:bg-orange-900/10">
      <Upload className="w-8 h-8 text-gray-400 mb-2" />
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {text}
      </p>
      {subText && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {subText}
        </p>
      )}
      {children}
    </label>
  );
};
