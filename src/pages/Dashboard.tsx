import { AppLayout } from "@/components/AppLayout";
import { initialDeals, initialContacts, STAGES } from "@/lib/mock";
import { ArrowUpRight, DollarSign, Target, Briefcase, TrendingUp } from "lucide-react";

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function Dashboard() {
  const total = initialDeals.length;
  const won = initialDeals.filter((d) => d.stage === "won");
  const lost = initialDeals.filter((d) => d.stage === "lost").length;
  const closed = won.length + lost;
  const conversion = closed ? Math.round((won.length / closed) * 100) : 0;
  const revenue = won.reduce((s, d) => s + d.value, 0);
  const pipeline = initialDeals
    .filter((d) => !["won", "lost"].includes(d.stage))
    .reduce((s, d) => s + d.value, 0);

  const stats = [
    { label: "Total deals",    value: total.toString(),       hint: "+3 this week",   icon: Briefcase, tone: "chip-blue" },
    { label: "Conversion",     value: `${conversion}%`,        hint: "Win / closed",   icon: Target,    tone: "chip-violet" },
    { label: "Revenue (won)",  value: fmtMoney(revenue),       hint: "All time",       icon: DollarSign,tone: "chip-green" },
    { label: "Open pipeline",  value: fmtMoney(pipeline),      hint: "Active deals",   icon: TrendingUp,tone: "chip-amber" },
  ];

  const byStage = STAGES.map((s) => ({
    ...s,
    count: initialDeals.filter((d) => d.stage === s.id).length,
    value: initialDeals.filter((d) => d.stage === s.id).reduce((sum, d) => sum + d.value, 0),
  }));
  const maxStageValue = Math.max(...byStage.map((s) => s.value), 1);

  return (
    <AppLayout title="Dashboard" subtitle="An overview of your client business">
      <div className="p-6 space-y-6 max-w-7xl">
        {/* KPI grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="surface-card p-5">
              <div className="flex items-center justify-between">
                <span className={`chip ${s.tone}`}>
                  <s.icon className="h-3 w-3" />
                  {s.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.hint}</div>
            </div>
          ))}
        </section>

        {/* Pipeline breakdown + recent contacts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="surface-card p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold">Pipeline by stage</h2>
                <p className="text-xs text-muted-foreground">Distribution of deal value</p>
              </div>
            </div>
            <div className="space-y-4">
              {byStage.map((s) => (
                <div key={s.id}>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className={`chip chip-${s.tone}`}>{s.label}</span>
                    <span className="text-muted-foreground">
                      {s.count} deals · <span className="text-foreground font-medium">{fmtMoney(s.value)}</span>
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full chip-${s.tone}`}
                      style={{ width: `${(s.value / maxStageValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-5">
            <h2 className="text-sm font-semibold mb-4">Recent contacts</h2>
            <ul className="space-y-3">
              {initialContacts.slice(0, 5).map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium chip-${c.color}`}>
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.company}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
