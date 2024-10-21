import { NewsAggregator } from "./NewsAggregator";

const newsAggregator = new NewsAggregator({
    guardian: import.meta.env.VITE_GUARDIAN_API_KEY as string,
    nytimes: import.meta.env.VITE_NYTIMES_API_KEY! as string,
    newsapi: import.meta.env.VITE_NEWSAPI_API_KEY! as string,
  });

export default newsAggregator