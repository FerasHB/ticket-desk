import SearchBar from "./components/SearchBar";
import StatusFilter from "./components/StatusFilter";
import TicketDetail from "./components/TicketDetail";
import TicketList from "./components/TicketList";
import { useTickets } from "./hooks/useTickets";

export default function App() {
  const {
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
  } = useTickets();

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Ticket Desk</h1>
          <div className="muted">React + TypeScript • API • Filter • Search</div>
        </div>

        <div className="actions">
          <SearchBar value={query} onChange={setQuery} />
          <StatusFilter value={status} onChange={setStatus} />
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <div className="panelTitle">
            Tickets <span className="muted">({filtered.length})</span>
          </div>

          {loading && <div className="state">Lade Tickets…</div>}
          {error && <div className="state error">Fehler: {error}</div>}

          {!loading && !error && (
            <TicketList tickets={filtered} selectedId={selectedId} onSelect={setSelectedId} />
          )}
        </section>

        <section className="panel">
          <div className="panelTitle">Details</div>
          <TicketDetail ticket={selected} />
        </section>
      </main>

      <footer className="footer muted">
        Tipp: Screenshot machen + GitHub Link in Bewerbungen einfügen.
      </footer>
    </div>
  );
}