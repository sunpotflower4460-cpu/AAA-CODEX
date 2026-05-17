import { copy } from '../lib/i18n';

type Props = {
  value: string;
  onChange: (next: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <label className="block">
      <span className="sr-only">{copy.searchPlaceholder}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={copy.searchPlaceholder}
        inputMode="search"
        enterKeyHint="search"
        aria-label={copy.searchPlaceholder}
        className="w-full rounded-[13px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-[21px] py-[13px] text-[15px] text-[color:var(--color-sumi)] placeholder:text-[color:var(--color-ink-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
      />
    </label>
  );
}
