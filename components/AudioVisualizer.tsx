"use client";

export function AudioVisualizer({ active }: { active: boolean }) {
  const bars = Array.from({ length: 24 });
  return (
    <div className="flex h-8 items-center gap-0.75" aria-hidden="true">
      {bars.map((_, i) => (
        <span
          key={i}
          className="bar w-0.75 rounded-full bg-listening origin-center"
          style={{
            height: "100%",
            animation: active
              ? `bar-bounce ${0.6 + (i % 5) * 0.09}s ease-in-out infinite`
              : "none",
            animationDelay: `${(i % 7) * 0.05}s`,
            transform: active ? undefined : "scaleY(0.15)",
            opacity: active ? 0.9 : 0.3,
            transition: "opacity 300ms ease, transform 300ms ease",
          }}
        />
      ))}
    </div>
  );
}
