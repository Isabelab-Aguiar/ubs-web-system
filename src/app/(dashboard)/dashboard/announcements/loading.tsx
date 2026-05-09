export default function AnnouncementsLoading() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-neutral-100 rounded animate-pulse" />
        <div className="h-8 w-28 bg-neutral-100 rounded animate-pulse" />
      </div>
      <div className="flex gap-3">
        <div className="h-9 flex-1 bg-neutral-100 rounded-lg animate-pulse" />
        <div className="h-9 w-48 bg-neutral-100 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-px">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 bg-neutral-100 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
