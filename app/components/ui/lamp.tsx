"use client";
import { cn } from "~/utils/cn";

export function Lamp({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 flex-col items-center justify-center">
        <div className="pointer-events-none absolute inset-0 z-30 bg-slate-950 [mask-image:radial-gradient(circle_at_50%_0%,transparent,black)]" />
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[40rem] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 rounded-full bg-[rgb(var(--primary))] opacity-20 blur-3xl" />
        </div>
        <div className="relative z-40 flex w-full flex-col items-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
}