import React from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {articles.length === 0 && (
        <div className="text-center text-gray-600 py-12">
          <p className="text-xl">No articles found.</p>
          <p className="mt-2">Please try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
