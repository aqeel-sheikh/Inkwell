import { API_ENDPOINTS } from "@/lib/config";
import type {
  BlogPost,
  CreateBlogDto,
  UpdateBlogDto,
  PaginatedResponse,
  DashboardStats,
  User,
  ChangePublishStatusDto,
} from "@/types";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fieldErrors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include", // Important for BetterAuth session cookies
    });

    if (response.status === 204) return undefined as T;

    const data = await response.json();

    if (!response.ok) {
      // Check if it's field errors (400)
      if (
        response.status === 400 &&
        typeof data === "object" &&
        !data.message
      ) {
        throw new ApiError(400, "Validation failed", data);
      }
      // Other errors (401, 500, etc)
      throw new ApiError(response.status, data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
}

export const api = {
  posts: {
    list: async (
      page = 1,
      limit = 20,
    ): Promise<PaginatedResponse<BlogPost>> => {
      return fetchApi(
        `${API_ENDPOINTS.posts.list()}?page=${page}&limit=${limit}`,
      );
    },

    getById: async (id: string): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.detail(id));
    },

    create: async (data: CreateBlogDto): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.create(), {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    update: async ({ id, ...data }: UpdateBlogDto): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.update(id), {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<void> => {
      return fetchApi(API_ENDPOINTS.posts.delete(id), {
        method: "DELETE",
      });
    },

    changePublishStatus: async ({
      postId,
      publishStatus,
    }: Omit<ChangePublishStatusDto, "id">): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.changePublishStatus(postId), {
        method: "PATCH",
        body: JSON.stringify({ postId, publishStatus }),
      });
    },
  },

  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      return fetchApi(API_ENDPOINTS.dashboard.stats());
    },
  },
  user: {
    update: async ({ ...data }: User): Promise<User> => {
      return fetchApi(API_ENDPOINTS.user.update(), {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
  },
};
