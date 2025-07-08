const FetchMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

type ObjectValues<T> = T[keyof T];
type FetchMethod = ObjectValues<typeof FetchMethod>;

type MutationFetchOptions = {
  method: Exclude<FetchMethod, "GET">;
  body?: string | null;
};

type GetFetchOptions = {
  method?: "GET";
  next: {
    revalidate?: number;
    tags: string[];
  };
  cache?: RequestCache;
};

type FetchOptions = (GetFetchOptions | MutationFetchOptions) & {
  headers?: Record<string, string>;
};

export async function fetcher(path: string, options: Partial<FetchOptions> = {}) {
  const response = await fetch(path, options);
  const contentType = response.headers.get("Content-Type");
  const status = response.status;
  const data = status === 204 ? null : contentType === "text/csv" ? await response.text() : await response.json();

  return data;
}
