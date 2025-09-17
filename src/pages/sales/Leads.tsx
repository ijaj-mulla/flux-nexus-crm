import React, { useState } from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { FormCard } from "@/components/forms/FormCard";
import { FormSection } from "@/components/forms/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for leads
const sampleLeads = [
  {
    id: 1,
    name: "Enterprise Software Solution",
    company: "TechStart Inc",
    contactFirstName: "Alex",
    contactLastName: "Johnson",
    email: "alex.johnson@techstart.com",
    phone: "+1 (555) 111-2222",
    mobile: "+1 (555) 121-3434",
    status: "In Process",
    priority: "High",
    qualificationLevel: "Hot",
    source: "Website",
    category: "Software",
    campaign: "Spring 2025 Campaign",
    owner: "John Smith",
    followUpActivity: "Schedule demo",
    city: "San Francisco",
    country: "United States",
    state: "California",
    postalCode: "94105",
    language: "English",
    notes: "Very interested in early adoption."
  },
  {
    id: 2,
    name: "Cloud Migration Project",
    company: "Legacy Systems Corp",
    contactFirstName: "Maria",
    contactLastName: "Garcia",
    email: "maria.garcia@legacy.com",
    phone: "+1 (555) 333-4444",
    mobile: "+1 (555) 232-4545",
    status: "Qualified",
    priority: "Medium",
    qualificationLevel: "Warm",
    source: "Referral",
    category: "Cloud",
    campaign: "Q2 Cloud Push",
    owner: "Sarah Johnson",
    followUpActivity: "Send proposal",
    city: "Detroit",
    country: "United States",
    state: "Michigan",
    postalCode: "48201",
    language: "English",
    notes: "Strong interest, needs detailed cost analysis."
  },
  {
    id: 3,
    name: "Digital Transformation Initiative",
    company: "Traditional Business Ltd",
    contactFirstName: "Robert",
    contactLastName: "Chen",
    email: "robert.chen@traditional.com",
    phone: "+1 (555) 555-6666",
    mobile: "+1 (555) 656-7878",
    status: "In Process",
    priority: "High",
    qualificationLevel: "Hot",
    source: "Trade Show",
    category: "Transformation",
    campaign: "Tech Expo 2025",
    owner: "Mike Wilson",
    followUpActivity: "Book workshop",
    city: "New York",
    country: "United States",
    state: "New York",
    postalCode: "10001",
    language: "English",
    notes: "Large deal, requires multiple follow-ups."
  },
  {
    id: 4,
    name: "CRM Implementation",
    company: "Growing Startup",
    contactFirstName: "Lisa",
    contactLastName: "Thompson",
    email: "lisa.thompson@growing.com",
    phone: "+1 (555) 777-8888",
    mobile: "+1 (555) 787-9090",
    status: "In Process",
    priority: "Low",
    qualificationLevel: "Cold",
    source: "Cold Call",
    category: "CRM",
    campaign: "Startup Outreach",
    owner: "Emily Davis",
    followUpActivity: "Follow-up in 2 weeks",
    city: "Boston",
    country: "United States",
    state: "Massachusetts",
    postalCode: "02108",
    language: "English",
    notes: "Budget constraints, low priority."
  },
  {
    id: 5,
    name: "Data Analytics Platform",
    company: "Analytics Pro",
    contactFirstName: "James",
    contactLastName: "Wilson",
    email: "james.wilson@analyticspro.com",
    phone: "+1 (555) 999-0000",
    mobile: "+1 (555) 909-1111",
    status: "Qualified",
    priority: "Medium",
    qualificationLevel: "Warm",
    source: "LinkedIn",
    category: "Analytics",
    campaign: "Data Summit 2025",
    owner: "David Brown",
    followUpActivity: "Arrange reference call",
    city: "Chicago",
    country: "United States",
    state: "Illinois",
    postalCode: "60601",
    language: "English",
    notes: "Interested, waiting for CIO approval."
  }
];

const Leads = () => {
  const [showForm, setShowForm] = useState(false);
  const [leads, setLeads] = useState(sampleLeads);

  const handleToolbarAction = (action: string) => {
    if (action === "add-new") {
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "Qualified" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variant =
      priority === "High" ? "destructive" : priority === "Medium" ? "default" : "outline";
    return <Badge variant={variant}>{priority}</Badge>;
  };

  const getQualificationBadge = (level: string) => {
    const variant =
      level === "Hot" ? "destructive" : level === "Warm" ? "default" : "outline";
    return <Badge variant={variant}>{level}</Badge>;
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <CRMToolbar title="Leads - New Lead" onAction={handleToolbarAction} />
        {/* --- Form remains same as your code --- */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Leads" onAction={handleToolbarAction} />
      <div className="p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Qualification Level</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Follow-up Activity</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Country/Region</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Postal Code</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>{lead.contactFirstName} {lead.contactLastName}</TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell>{getQualificationBadge(lead.qualificationLevel)}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>{lead.category}</TableCell>
                    <TableCell>{getPriorityBadge(lead.priority)}</TableCell>
                    <TableCell>{lead.campaign}</TableCell>
                    <TableCell>{lead.owner}</TableCell>
                    <TableCell>{lead.followUpActivity}</TableCell>
                    <TableCell>{lead.city}</TableCell>
                    <TableCell>{lead.country}</TableCell>
                    <TableCell>{lead.state}</TableCell>
                    <TableCell>{lead.postalCode}</TableCell>
                    <TableCell>{lead.language}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.mobile}</TableCell>
                    <TableCell>
                      <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                        {lead.email}
                      </a>
                    </TableCell>
                    <TableCell>{lead.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leads;
