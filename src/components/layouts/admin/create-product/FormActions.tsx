import { Package, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormActionsProps {
  loading: boolean;
  uploading: boolean;
  mode?: 'create' | 'edit';
  onSubmit?: () => void;
}

export const FormActions = ({
  loading,
  uploading,
  mode = 'create',
}: FormActionsProps) => {
  const isProcessing = loading || uploading;
  const isEditMode = mode === 'edit';

  const router = useRouter();

  return (
    <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
      <button
        type="button"
        onClick={() => router.back()}
        disabled={isProcessing}
        className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isProcessing}
        className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {uploading
              ? 'Uploading Images...'
              : isEditMode
                ? 'Updating Product...'
                : 'Creating Product...'}
          </>
        ) : (
          <>
            <Package className="w-4 h-4" />
            {isEditMode ? 'Update Product' : 'Create Product'}
          </>
        )}
      </button>
    </div>
  );
};
