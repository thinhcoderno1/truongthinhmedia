export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  image: string;
  imageAlt: string;
  author: string;
  categories: Category[];
  tags: string[];
  sticky: boolean;
  readingMinutes: number;
};

export type PostCollection = { posts: Post[]; total: number; pages: number };
export type PostQuery = {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
  exclude?: number;
  sticky?: boolean;
};
