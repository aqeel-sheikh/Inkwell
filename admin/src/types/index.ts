export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  coverImage?: string;
  website?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags?: string[];
}

export interface CreateBlogDto {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  published: boolean;
  tags?: string[];
}

export interface UserDto {
  name: string;
  username: string;
  email: string;
  image?: string;
  coverImage?: string;
  website?: string;
  bio?: string;
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {
  id: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

export interface Session {
  user: User;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
