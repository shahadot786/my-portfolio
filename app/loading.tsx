export default function Loading() {
  return (
    <div className="container-custom py-12 space-y-8 animate-pulse">
      {/* Top glowing progress bar indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#0e1511] z-[999] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#10b981] via-[#4edea3] to-[#6ffbbe] animate-[loading-bar_1.5s_ease-in-out_infinite] shadow-[0_0_10px_#4edea3]" />
      </div>

      <div className="space-y-4">
        <div className="w-48 h-6 bg-[#1a211d] rounded-full border border-[#3c4a42]/50" />
        <div className="w-96 max-w-full h-10 bg-[#1a211d] rounded-xl border border-[#3c4a42]/50" />
        <div className="w-full max-w-lg h-5 bg-[#1a211d] rounded-lg border border-[#3c4a42]/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-2xl bg-[#0B0E14] border border-[#3c4a42]/50 p-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-2/3 h-6 bg-[#1a211d] rounded-lg" />
              <div className="w-full h-4 bg-[#1a211d] rounded" />
              <div className="w-4/5 h-4 bg-[#1a211d] rounded" />
            </div>
            <div className="w-1/3 h-5 bg-[#1a211d] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
