import { NewsAggregator } from "./NewsAggregator";

const newsAggregator = new NewsAggregator({
    guardian: import.meta.env.VITE_GUARDIAN_API_KEY as string,
    nytimes: import.meta.env.VITE_NYTIMES_API_KEY! as string,
    newsapi: import.meta.env.VITE_NEWSAPI_API_KEY! as string,
    thenews: import.meta.env.VITE_THENEWS_API_KEY! as string,
    mediastack: import.meta.env.VITE_MEDIASTACK_API_KEY! as string, // Add MediaStack API key
  });

export default newsAggregator
