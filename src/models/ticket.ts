export type TicketStatus = "open" | "in_progress" | "closed";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  requesterEmail: string;
  createdAt: string;
};