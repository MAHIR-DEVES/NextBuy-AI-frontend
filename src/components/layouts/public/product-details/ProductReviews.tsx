'use client';

import { IProductReview } from '@/types/products.type';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

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
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 4);

  const hasMoreReviews = reviews.length > 4;

  return (
    <section className="mt-8 rounded-sm border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            Customer Reviews
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {reviewCount} review{reviewCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Overall Rating */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 sm:h-5 sm:w-5" />

          <span className="text-sm font-semibold text-gray-800 sm:text-base">
            {rating > 0 ? rating.toFixed(1) : 'No rating'}
          </span>
        </div>
      </div>

      {/* Reviews */}
      {reviews?.length > 0 ? (
        <>
          <motion.div
            layout
            transition={{
              layout: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <AnimatePresence initial={false}>
              {visibleReviews.map(review => (
                <motion.div
                  key={review.id}
                  layout="position"
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: 20,
                    marginBottom: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                    y: 0,
                    marginBottom: 20,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -15,
                    marginBottom: 0,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.25,
                    },
                    y: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    height: {
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    marginBottom: {
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  style={{
                    overflow: 'hidden',
                  }}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 sm:pb-5"
                >
                  {/* User Info */}
                  <div className="mb-2 flex items-center gap-3">
                    {/* Avatar */}
                    <motion.div
                      initial={{
                        scale: 0.8,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        scale: 0.8,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500 sm:h-10 sm:w-10">
                        {review.userName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    </motion.div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {review.userName || 'Anonymous'}
                      </p>

                      {/* Rating */}
                      <div className="mt-0.5 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <motion.div
                            key={starIndex}
                            initial={{
                              opacity: 0,
                              scale: 0.6,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.6,
                            }}
                            transition={{
                              duration: 0.2,
                              delay: starIndex * 0.025,
                            }}
                          >
                            <Star
                              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                                starIndex < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm leading-6 text-gray-700"
                  >
                    {review.comment}
                  </motion.p>

                  {/* Date */}
                  {/* <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 text-xs text-gray-400"
                  >
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </motion.p> */}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View More / View Less */}
          {hasMoreReviews && (
            <motion.div
              layout
              className="mt-5 flex justify-center border-t border-gray-100 pt-5"
            >
              <motion.button
                type="button"
                onClick={() => setShowAll(prev => !prev)}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
                className="inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-sm font-semibold text-title transition-colors hover:bg-gray-50 hover:text-hover-text"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {showAll ? (
                    <motion.span
                      key="less"
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="inline-flex items-center gap-1.5"
                    >
                      View less
                      <ChevronUp className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="more"
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="inline-flex items-center gap-1.5"
                    >
                      View more
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )}
        </>
      ) : (
        /* No Reviews */
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="py-10 text-center"
        >
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.35,
              type: 'spring',
              stiffness: 250,
            }}
          >
            <Star className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          </motion.div>

          <p className="text-sm font-medium text-gray-700">No reviews yet</p>

          <p className="mt-1 text-xs text-gray-400">
            Be the first customer to review this product.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default ProductReviews;
