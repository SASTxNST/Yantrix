const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export type PaperVisibility = "PRIVATE" | "SHARED" | "PUBLIC";

export type ResearchPaperPayload = {
  title: string;
  abstract?: string;
  content?: string;
  visibility?: PaperVisibility;
  folderId?: string | null;
  tagIds?: string[];
};

export type ResearchPaper = {
  id: string;
  title: string;
  abstract?: string | null;
  content?: string | null;
  visibility: PaperVisibility;
  authorId: string;
  folderId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success?: boolean;
};

function getAuthToken(): string | null {
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
}

export const ResearchService = {
  createPaper(data: ResearchPaperPayload) {
    return request<ResearchPaper>("/research/papers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getMyPapers() {
    return request<ResearchPaper[]>("/research/my-papers");
  },

  getPaperById(id: string) {
    return request<ResearchPaper>(`/research/papers/${id}`);
  },

  updatePaper(id: string, data: ResearchPaperPayload) {
    return request<ResearchPaper>(`/research/papers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deletePaper(id: string) {
    return request<void>(`/research/papers/${id}`, {
      method: "DELETE",
    });
  },
};