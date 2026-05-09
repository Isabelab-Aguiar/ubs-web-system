export default function CampaignsLoading() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-36 bg-neutral-100 rounded animate-pulse" />
        <div className="h-8 w-32 bg-neutral-100 rounded animate-pulse" />
      </div>
      <div className="h-9 bg-neutral-100 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-neutral-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
