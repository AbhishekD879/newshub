import React from "react";
import {
  Calendar,
  Clock,
  User,
  Bookmark,
  Share2,
  ThumbsUp,
  ExternalLink,
} from "lucide-react";

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: Date | string;
  source: {
    id: string;
    name: string;
  };
  url: string;
  imageUrl?: string;
  category: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
          <span className="text-xs font-semibold text-white px-2 py-1 rounded-full bg-blue-500">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            {article.title?.length>30?`${article.title.substring(0,40)}...`:article.title}
            <ExternalLink className="w-5 h-5 ml-1 inline-block" />
          </a>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-2">{article.description?.substring(0,40)}</p>

        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4 mb-2">
            <User className="w-4 h-4 mr-1" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatTime(article.publishedAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <img
              src={`https://www.google.com/s2/favicons?domain=${article.source.name}&sz=32`}
              alt={article.source.name}
              className="w-4 h-4 mr-1"
            />
            <span>{article.source.name}</span>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Like</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200">
              <Bookmark className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200">
              <Share2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
