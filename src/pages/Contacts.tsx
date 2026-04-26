import { AppLayout } from "@/components/AppLayout";
import { initialContacts, Status } from "@/lib/mock";
import { Mail, Building2, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusTone: Record<Status, string> = {
  customer: "chip-green",
  active:   "chip-blue",
  lead:     "chip-amber",
  inactive: "chip-slate",
};

const statusLabel: Record<Status, string> = {
  customer: "Customer",
  active:   "Active",
  lead:     "Lead",
  inactive: "Inactive",
};

export default function Contacts() {
  return (
    <AppLayout
      title="Contacts"
      subtitle={`${initialContacts.length} people across your client base`}
      action={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-3.5 w-3.5 mr-1.5" /> Filter
          </Button>
          <Button size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-1" /> Add contact
          </Button>
        </div>
      }
    >
      <div className="p-6 max-w-7xl">
        <div className="surface-card overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/30">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Status</div>
          </div>
          <ul className="divide-y divide-border">
            {initialContacts.map((c) => (
              <li
                key={c.id}
                className="grid grid-cols-12 gap-4 px-5 py-3 items-center hover:bg-muted/40 transition-colors"
              >
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium chip-${c.color}`}>
                    {c.initials}
                  </div>
                  <span className="text-sm font-medium truncate">{c.name}</span>
                </div>
                <div className="col-span-3 flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{c.company}</span>
                </div>
                <div className="col-span-3 flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{c.email}</span>
                </div>
                <div className="col-span-2">
                  <span className={`chip ${statusTone[c.status]}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {statusLabel[c.status]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
