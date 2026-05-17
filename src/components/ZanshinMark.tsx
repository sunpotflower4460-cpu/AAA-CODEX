type Props = {
  className?: string;
  title?: string;
};

export function ZanshinMark({ className, title = 'Zanshin' }: Props) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label={title}>
      <path
        d="M52 32c0 11-9 20-20 20S12 43 12 32 21 12 32 12c7 0 13 4 17 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <path
        d="M49 22c2 3 3 6 3 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

