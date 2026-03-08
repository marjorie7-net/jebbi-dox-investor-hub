const sales = [
  { name: "Steven Summer", time: "02 Minutes Ago", amount: "+KES 52.00" },
  { name: "Jordan Maizee", time: "03 Minutes Ago", amount: "+KES 83.00" },
  { name: "Jessica Alba", time: "05 Minutes Ago", amount: "+KES 61.60" },
  { name: "Anna Armas", time: "05 Minutes Ago", amount: "+KES 2,351.00" },
  { name: "Angelina Boo", time: "10 Minutes Ago", amount: "+KES 152.00" },
  { name: "Anastasia Koss", time: "12 Minutes Ago", amount: "+KES 542.00" },
];

const RecentSales = () => {
  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-foreground">Recent Contributions</h3>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">See All</button>
      </div>

      <div className="space-y-4">
        {sales.map((sale, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-foreground">
              {sale.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{sale.name}</p>
              <p className="text-xs text-muted-foreground">{sale.time}</p>
            </div>
            <span className="text-sm font-semibold text-primary">{sale.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSales;
