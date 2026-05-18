import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="washi-bg min-h-screen text-[color:var(--color-sumi)]">
      <div className="safe-y mx-auto min-h-screen max-w-[720px] px-[21px] font-body">
        {children}
      </div>
    </div>
  );
}
