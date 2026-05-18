import { copy } from '../lib/i18n';

type Props = {
  value: string;
  onChange: (next: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <label className="block">
      <span className="sr-only">{copy.searchPlaceholder}</span>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-[13px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[color:var(--color-ink-muted)] opacity-70"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm8.4 1.1-4.3-4.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={copy.searchPlaceholder}
          inputMode="search"
          enterKeyHint="search"
          aria-label={copy.searchPlaceholder}
          className="w-full rounded-[13px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] py-[13px] pl-[44px] pr-[44px] text-[15px] text-[color:var(--color-sumi)] shadow-[0_12px_24px_-16px_var(--color-shadow)] placeholder:text-[color:var(--color-ink-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
        />

        {value.trim() ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="検索をクリア / Clear"
            className="absolute right-[8px] top-1/2 inline-flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-[13px] text-[15px] text-[color:var(--color-ink-muted)] transition-colors duration-300 hover:bg-[color:var(--color-washi)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>
    </label>
  );
}
