export async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  return (await res.json()) as T;
}