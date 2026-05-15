export function BlinkingCursor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block w-[0.55em] h-[1.1em] align-text-bottom bg-terminal ml-px cursor-blink ${className}`}
      aria-hidden
    />
  );
}
