export interface Lead {
  email: string;
  source: "contact" | "signup" | "waitlist" | "api";
  timestamp: string;
  utm?: string;
}

const leads: Lead[] = [];

export function trackLead(email: string, source: Lead["source"]) {
  const lead: Lead = {
    email,
    source,
    timestamp: new Date().toISOString(),
  };
  leads.push(lead);
  console.log("New lead tracked:", lead);
  return lead;
}

export function getLeads() {
  return leads;
}

export function getLeadCount() {
  return leads.length;
}
