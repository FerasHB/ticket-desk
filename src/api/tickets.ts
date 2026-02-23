import { getJson } from "./client";
import { mapPostsToTickets } from "../utils/mapApi";
import type { Ticket } from "../models/ticket";

type Post = { id: number; title: string; body: string; userId: number };

export async function fetchTickets(signal?: AbortSignal): Promise<Ticket[]> {
  const posts = await getJson<Post[]>("https://jsonplaceholder.typicode.com/posts", signal);
  return mapPostsToTickets(posts);
}