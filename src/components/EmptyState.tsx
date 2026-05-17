import { copy } from '../lib/i18n';
import { ZanshinMark } from './ZanshinMark';

type Props = {
  onCreate: () => void;
};

export function EmptyState({ onCreate }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[21px] border border-[color:var(--color-line)] bg-[color:var(--color-paper)] px-[21px] py-[34px]">
      <ZanshinMark className="pointer-events-none absolute -right-[34px] -top-[34px] h-[144px] w-[144px] text-[color:var(--color-line)] opacity-50" />
      <div className="relative">
        <h2 className="font-heading text-[21px] font-medium leading-[1.3] text-[color:var(--color-sumi)]">
          {copy.emptyTitle}
        </h2>
        <p className="mt-[8px] text-[15px] leading-[1.618] text-[color:var(--color-ink-muted)]">
          {copy.emptySubtitle}
        </p>
        <button
          type="button"
          onClick={onCreate}
          aria-label={copy.newNote}
          className="mt-[21px] inline-flex items-center justify-center rounded-[13px] border border-[color:var(--color-line)] bg-transparent px-[21px] py-[13px] text-[15px] text-[color:var(--color-sumi)] transition-colors duration-300 hover:bg-[color:var(--color-washi)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-indigo)]/20"
        >
          {copy.newNote}
        </button>
      </div>
    </div>
  );
}

