import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Deal, STAGES, StageId, initialDeals } from "@/lib/mock";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  useDraggable,
} from "@dnd-kit/core";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function DealCard({ deal, dragging = false }: { deal: Deal; dragging?: boolean }) {
  return (
    <div
      className={`surface-card p-3 cursor-grab active:cursor-grabbing select-none ${
        dragging ? "shadow-lg rotate-1" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-medium leading-snug">{deal.title}</div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{deal.company}</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">{fmtMoney(deal.value)}</span>
        <div className="h-6 w-6 rounded-full chip-slate flex items-center justify-center text-[10px] font-medium">
          {deal.owner}
        </div>
      </div>
    </div>
  );
}

function DraggableDeal({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: deal.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <DealCard deal={deal} />
    </div>
  );
}

function StageColumn({
  stage,
  deals,
}: {
  stage: typeof STAGES[number];
  deals: Deal[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  const total = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col min-w-[280px] w-[280px]">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`chip chip-${stage.tone}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {stage.label}
          </span>
          <span className="text-xs text-muted-foreground">{deals.length}</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="text-[11px] text-muted-foreground px-1 mb-2">{fmtMoney(total)}</div>
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-xl p-2 space-y-2 min-h-[120px] border border-dashed transition-colors ${
          isOver ? "border-primary/40 bg-muted/60" : "border-transparent bg-muted/30"
        }`}
      >
        {deals.map((d) => (
          <DraggableDeal key={d.id} deal={d} />
        ))}
      </div>
    </div>
  );
}

export default function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const grouped = useMemo(() => {
    const map: Record<StageId, Deal[]> = { lead: [], proposal: [], negotiating: [], won: [], lost: [] };
    deals.forEach((d) => map[d.stage].push(d));
    return map;
  }, [deals]);

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) : null;
  const totalPipeline = deals
    .filter((d) => d.stage !== "lost")
    .reduce((s, d) => s + d.value, 0);

  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }
  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;
    const newStage = over.id as StageId;
    setDeals((prev) =>
      prev.map((d) => (d.id === active.id ? { ...d, stage: newStage } : d))
    );
  }

  return (
    <AppLayout
      title="Pipeline"
      subtitle={`${deals.length} deals · ${fmtMoney(totalPipeline)} active`}
      action={
        <Button size="sm" className="h-8">
          <Plus className="h-4 w-4 mr-1" /> New deal
        </Button>
      }
    >
      <div className="p-6">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STAGES.map((s) => (
              <StageColumn key={s.id} stage={s} deals={grouped[s.id]} />
            ))}
          </div>
          <DragOverlay>{activeDeal ? <DealCard deal={activeDeal} dragging /> : null}</DragOverlay>
        </DndContext>
      </div>
    </AppLayout>
  );
}
