import { useEffect, useMemo, useState } from "react";
import type { Ticket, TicketStatus } from "../models/ticket";

export function useTickets() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TicketStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`API error (${res.status})`);

        const posts: Array<{ id: number; title: string; body: string; userId: number }> = await res.json();

        const list: Ticket[] = posts.slice(0, 30).map((p) => ({
          id: p.id,
          title: capitalize(p.title),
          description: p.body,
          status: pickStatus(p.id),
          requesterEmail: `user${p.userId}@example.com`,
          createdAt: new Date(Date.now() - p.id * 3600_000).toISOString(),
        }));

        setTickets(list);
        setSelectedId(list[0]?.id ?? null);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setError(e?.message ?? "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tickets.filter((t) => {
      const matchesStatus = status === "all" ? true : t.status === status;
      const matchesQuery =
        q.length === 0
          ? true
          : `${t.title} ${t.description} ${t.requesterEmail}`.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [tickets, query, status]);

  const selected = useMemo(
    () => filtered.find((t) => t.id === selectedId) ?? null,
    [filtered, selectedId]
  );

  return {
    loading,
    error,
    query,
    setQuery,
    status,
    setStatus,
    filtered,
    selected,
    selectedId,
    setSelectedId,
  };
}

function pickStatus(id: number): TicketStatus {
  const list: TicketStatus[] = ["open", "in_progress", "closed"];
  return list[id % list.length];
}

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
