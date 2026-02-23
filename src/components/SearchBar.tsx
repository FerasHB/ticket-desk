type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Suchen (Titel, Text, E-Mail)…"
      className="input"
      aria-label="Search tickets"
    />
  );
}