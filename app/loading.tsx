export default function Loading() {
  return (
    <div className="container-custom py-12 space-y-8 animate-pulse">
      {/* Top glowing progress bar indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-background/80 z-[999] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary via-emerald-400 to-secondary animate-[loading-bar_1.5s_ease-in-out_infinite] shadow-[0_0_10px_rgba(78,222,163,0.5)]" />
      </div>

      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="w-48 h-6 bg-primary/10 rounded-full border border-primary/20" />
        <div className="w-96 max-w-full h-10 bg-muted/80 rounded-2xl border border-border" />
        <div className="w-full max-w-lg h-5 bg-muted/60 rounded-xl" />
      </div>

      {/* Cards Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-2xl bg-card border border-border p-6 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-2/3 h-6 bg-muted/80 rounded-xl" />
              <div className="w-full h-4 bg-muted/60 rounded-lg" />
              <div className="w-4/5 h-4 bg-muted/60 rounded-lg" />
            </div>
            <div className="w-1/3 h-5 bg-muted/50 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
