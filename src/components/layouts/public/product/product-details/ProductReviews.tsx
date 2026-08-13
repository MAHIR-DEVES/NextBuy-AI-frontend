import { IProductReview } from '@/types/products.type';
import { Star } from 'lucide-react';

interface ProductReviewsProps {
  reviews: IProductReview[];
  rating: number;
  reviewCount: number;
}

const ProductReviews = ({
  reviews,
  rating,
  reviewCount,
}: ProductReviewsProps) => {
  return (
    <section className="mt-8 bg-white rounded-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Customer Reviews
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {reviewCount} review{reviewCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

          <span className="font-semibold text-gray-800">
            {rating > 0 ? rating.toFixed(1) : 'No rating'}
          </span>
        </div>
      </div>

      {reviews?.length > 0 ? (
        <div className="space-y-5">
          {reviews.map(review => (
            <div
              key={review.id}
              className="border-b border-gray-100 last:border-0 pb-5 last:pb-0"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-sm text-gray-700 leading-6">
                {review.comment}
              </p>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <Star className="w-10 h-10 mx-auto text-gray-300 mb-3" />

          <p className="text-sm font-medium text-gray-700">No reviews yet</p>

          <p className="text-xs text-gray-400 mt-1">
            Be the first customer to review this product.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
