import type { Ticket } from "../models/ticket";

type Props = {
  tickets: Ticket[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function TicketList({ tickets, selectedId, onSelect }: Props) {
  return (
    <div className="list">
      {tickets.map((t) => (
        <button
          key={t.id}
          className={`listItem ${selectedId === t.id ? "active" : ""}`}
          onClick={() => onSelect(t.id)}
        >
          <div className="listItemTop">
            <span className="title">{t.title}</span>
            <span className={`badge ${t.status}`}>
              {formatStatus(t.status)}
            </span>
          </div>
          <div className="sub">{t.requesterEmail}</div>
        </button>
      ))}

      {tickets.length === 0 && (
        <div className="empty">Keine Tickets gefunden.</div>
      )}
    </div>
  );
}

function formatStatus(s: Ticket["status"]) {
  if (s === "in_progress") return "In Progress";
  return s.charAt(0).toUpperCase() + s.slice(1);
}