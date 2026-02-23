import type { Ticket } from "../models/ticket";

type Props = {
  ticket: Ticket | null;
};

export default function TicketDetail({ ticket }: Props) {
  if (!ticket) {
    return (
      <div className="panel">
        <div className="empty">Wähle ein Ticket aus.</div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="detailHeader">
        <div>
          <div className="detailTitle">{ticket.title}</div>
          <div className="sub">{ticket.requesterEmail}</div>
        </div>

        <span className={`badge ${ticket.status}`}>{formatStatus(ticket.status)}</span>
      </div>

      <div className="detail">
        <div className="label">Beschreibung</div>
        <div className="box">{ticket.description}</div>

        <div className="label" style={{ marginTop: 12 }}>
          Erstellt am
        </div>
       <div className="box">
  {new Date(ticket.createdAt).toLocaleString("de-DE")}
</div>
      </div>
    </div>
  );
}

function formatStatus(s: Ticket["status"]) {
  if (s === "in_progress") return "In Progress";
  return s.charAt(0).toUpperCase() + s.slice(1);
}