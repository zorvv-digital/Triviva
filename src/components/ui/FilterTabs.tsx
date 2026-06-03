interface TabOption<T extends string = string> {
  value: T;
  label: string;
}

interface FilterTabsProps<T extends string = string> {
  options: TabOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
}

export function FilterTabs<T extends string = string>({
  options,
  selectedValue,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div className="flex items-center gap-1.5 bg-black/[0.03] p-1.5 rounded-full self-start">
      {options.map((option) => {
        const isActive = selectedValue === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-950"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
