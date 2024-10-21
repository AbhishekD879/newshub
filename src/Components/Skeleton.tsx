import React from "react";

const SkeletonArticleCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

interface SkeletonArticleGridProps {
  count?: number;
}

const SkeletonArticleGrid: React.FC<SkeletonArticleGridProps> = ({
  count = 6,
}) => {
  return (
    <div className="container mx-auto">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="status"
        aria-label="Loading articles"
      >
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonArticleCard key={index} />
        ))}
        <span className="sr-only">Loading articles...</span>
      </div>
    </div>
  );
};

export default SkeletonArticleGrid;
