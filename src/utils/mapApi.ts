import type { Ticket, TicketStatus } from "../models/ticket";

const statuses: TicketStatus[] = ["open", "in_progress", "closed"];

function pickStatus(id: number): TicketStatus {
  return statuses[id % statuses.length];
}

// Feste deutsche Demo-Titel
const germanTitles = [
  "Passwort zurücksetzen funktioniert nicht",
  "Rechnung für Februar fehlt",
  "App stürzt beim Login ab",
  "Zugriff auf Admin-Bereich gesperrt",
  "E-Mail-Benachrichtigungen kommen nicht an",
  "Datenexport als CSV nicht möglich",
  "Fehler beim Speichern der Einstellungen",
  "Benutzerkonto versehentlich gelöscht",
  "Performance der Anwendung sehr langsam",
  "Zwei-Faktor-Authentifizierung aktivieren"
];

// Feste deutsche Demo-Beschreibungen
const germanDescriptions = [
  "Der Kunde meldet, dass das Zurücksetzen des Passworts nicht funktioniert. Der Link läuft ab oder führt zu einer Fehlermeldung.",
  "Die Rechnung für den letzten Monat wurde nicht im Kundenportal angezeigt. Bitte prüfen und erneut bereitstellen.",
  "Beim Versuch sich anzumelden, stürzt die App sofort ab. Problem tritt seit dem letzten Update auf.",
  "Der Benutzer erhält die Meldung 'Zugriff verweigert', obwohl er Administrator-Rechte besitzen sollte.",
  "Es werden keine E-Mail-Benachrichtigungen mehr versendet, obwohl die Einstellungen korrekt gesetzt sind.",
  "Der Export der Daten als CSV-Datei bricht ohne Fehlermeldung ab.",
  "Beim Speichern neuer Einstellungen erscheint ein unbekannter Fehler.",
  "Ein Benutzerkonto wurde versehentlich gelöscht und soll wiederhergestellt werden.",
  "Die Anwendung reagiert sehr langsam, insbesondere im Dashboard-Bereich.",
  "Der Kunde möchte die Zwei-Faktor-Authentifizierung aktivieren, findet jedoch keine entsprechende Option."
];

export function mapPostsToTickets(
  posts: Array<{ id: number; title: string; body: string; userId: number }>
): Ticket[] {
  const now = Date.now();

  return posts.slice(0, 30).map((p, index) => ({
    id: p.id,
    title: germanTitles[index % germanTitles.length],
    description: germanDescriptions[index % germanDescriptions.length],
    status: pickStatus(p.id),
    requesterEmail: `kunde${p.userId}@firma.de`,
    createdAt: new Date(now - index * 1000 * 60 * 45).toISOString(),
  }));
}