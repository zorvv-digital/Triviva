const destinations = [
  "SANTORINI", "BALI", "KYOTO", "SWISS ALPS", "AMALFI COAST", "DUBAI",
  "MARRAKECH", "MACHU PICCHU", "MALDIVES", "ICELAND"
];

const SlidingText = () => {
  return (
    <div className="w-full overflow-hidden bg-brand-primary/5 py-4 sm:py-6 border-y border-brand-primary/10 flex items-center">
      <div
        className="flex whitespace-nowrap items-center"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center">
            {destinations.map((dest, index) => (
              <div key={`${i}-${index}`} className="flex items-center mx-4 sm:mx-8">
                <span className="text-sm sm:text-base md:text-lg tracking-[0.2em] text-brand-secondary font-medium whitespace-nowrap">
                  {dest}
                </span>
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-orange-500 ml-8 sm:ml-16 inline-block" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingText;
