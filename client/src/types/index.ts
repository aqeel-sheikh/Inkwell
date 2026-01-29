export interface Author {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  bio?: string;
  website?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags?: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDto {
  content: string;
  postId: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
