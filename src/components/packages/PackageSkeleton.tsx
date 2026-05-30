const PackageSkeleton = () => {
  return (
    <div className="bg-white rounded-[2rem] p-4 shadow-[0_2px_5px_rgba(0,0,0,0.06)] border border-slate-100/50 flex flex-col h-full animate-pulse select-none">
      {/* Image wrapper skeleton */}
      <div className="relative aspect-[16/10] rounded-2xl bg-slate-200/80 flex-shrink-0" />

      {/* Content area skeleton */}
      <div className="pt-5 pb-1 px-1 flex flex-col flex-grow">
        {/* Title skeleton */}
        <div className="flex items-start justify-between gap-4 mb-3 min-h-[3.25rem]">
          <div className="h-6 bg-slate-200/80 rounded-md w-3/4" />
          <div className="h-4 bg-slate-200/80 rounded-full w-16 mt-1" />
        </div>

        {/* Subtitle skeleton */}
        <div className="h-3 bg-slate-100 rounded-md w-1/2 mb-4" />

        {/* Description lines skeleton */}
        <div className="space-y-2 mb-6 min-h-[2.5rem]">
          <div className="h-3.5 bg-slate-100 rounded-md w-full" />
          <div className="h-3.5 bg-slate-100 rounded-md w-5/6" />
        </div>

        {/* Footer actions skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="h-6 bg-slate-200/80 rounded-md w-1/3" />
          <div className="h-8 bg-slate-200/80 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
};

export default PackageSkeleton;
