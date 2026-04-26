export type Status = "active" | "lead" | "customer" | "inactive";

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  status: Status;
  initials: string;
  color: "blue" | "violet" | "amber" | "green" | "rose" | "slate";
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  owner: string;
  stage: StageId;
}

export type StageId = "lead" | "proposal" | "negotiating" | "won" | "lost";

export const STAGES: { id: StageId; label: string; tone: Contact["color"] }[] = [
  { id: "lead",        label: "New Lead",      tone: "blue" },
  { id: "proposal",    label: "Proposal Sent", tone: "violet" },
  { id: "negotiating", label: "Negotiating",   tone: "amber" },
  { id: "won",         label: "Won",           tone: "green" },
  { id: "lost",        label: "Lost",          tone: "rose" },
];

export const initialContacts: Contact[] = [
  { id: "c1", name: "Avery Chen",     company: "Northwind Studio", email: "avery@northwind.co",  status: "customer", initials: "AC", color: "blue" },
  { id: "c2", name: "Marcus Patel",   company: "Lumen Labs",       email: "marcus@lumen.io",     status: "active",   initials: "MP", color: "violet" },
  { id: "c3", name: "Sofia Romero",   company: "Basepoint",        email: "sofia@basepoint.com", status: "lead",     initials: "SR", color: "amber" },
  { id: "c4", name: "Daniel Okafor",  company: "Helio Type",       email: "dan@heliotype.com",   status: "customer", initials: "DO", color: "green" },
  { id: "c5", name: "Priya Shah",     company: "Vertex Co",        email: "priya@vertex.co",     status: "lead",     initials: "PS", color: "rose" },
  { id: "c6", name: "Jonas Berg",     company: "Foldwork",         email: "jonas@foldwork.se",   status: "inactive", initials: "JB", color: "slate" },
  { id: "c7", name: "Lina Müller",    company: "Atlas Mobility",   email: "lina@atlas.app",      status: "active",   initials: "LM", color: "blue" },
  { id: "c8", name: "Ravi Kapoor",    company: "Quill & Co",       email: "ravi@quill.co",       status: "customer", initials: "RK", color: "violet" },
];

export const initialDeals: Deal[] = [
  { id: "d1", title: "Brand redesign",        company: "Northwind Studio", value: 8400,  owner: "AC", stage: "lead" },
  { id: "d2", title: "Marketing site",        company: "Lumen Labs",       value: 12500, owner: "MP", stage: "lead" },
  { id: "d3", title: "Design system",         company: "Basepoint",        value: 22000, owner: "SR", stage: "proposal" },
  { id: "d4", title: "Mobile MVP",            company: "Helio Type",       value: 34500, owner: "DO", stage: "proposal" },
  { id: "d5", title: "Webflow migration",     company: "Vertex Co",        value: 6800,  owner: "PS", stage: "negotiating" },
  { id: "d6", title: "Quarterly retainer",    company: "Atlas Mobility",   value: 18000, owner: "LM", stage: "negotiating" },
  { id: "d7", title: "Landing page revamp",   company: "Quill & Co",       value: 9400,  owner: "RK", stage: "won" },
  { id: "d8", title: "Annual contract",       company: "Northwind Studio", value: 42000, owner: "AC", stage: "won" },
  { id: "d9", title: "Pitch deck",            company: "Foldwork",         value: 3200,  owner: "JB", stage: "lost" },
];
