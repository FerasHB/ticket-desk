import type { TicketStatus } from "../models/ticket";

type Props = {
  value: TicketStatus | "all";
  onChange: (v: TicketStatus | "all") => void;
};

export default function StatusFilter({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as any)} className="select" aria-label="Filter status">
      <option value="all">Alle</option>
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="closed">Closed</option>
    </select>
  );
}