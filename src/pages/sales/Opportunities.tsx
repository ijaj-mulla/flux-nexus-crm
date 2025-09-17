import React, { useState } from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample Opportunities Data
const sampleOpportunities = [
  {
    id: 1,
    name: "Enterprise Software Expansion",
    company: "TechStart Inc",
    contactFirstName: "Alex",
    contactLastName: "Johnson",
    email: "alex.johnson@techstart.com",
    phone: "+1 (555) 111-2222",
    mobile: "+1 (555) 123-4567",
    status: "Qualified",
    priority: "High",
    qualificationLevel: "Hot",
    source: "Website",
    owner: "John Smith",
    category: "Software",
    campaign: "Q4 Growth",
    followUpActivity: "Schedule demo",
    city: "San Francisco",
    country: "USA",
    state: "CA",
    postalCode: "94105",
    language: "English",
    note: "Client interested in enterprise package",
  },
  {
    id: 2,
    name: "Cloud Infrastructure Upgrade",
    company: "Legacy Systems Corp",
    contactFirstName: "Maria",
    contactLastName: "Garcia",
    email: "maria.garcia@legacy.com",
    phone: "+1 (555) 333-4444",
    mobile: "+1 (555) 444-5555",
    status: "In Process",
    priority: "Medium",
    qualificationLevel: "Warm",
    source: "Referral",
    owner: "Sarah Johnson",
    category: "Cloud",
    campaign: "Migration Initiative",
    followUpActivity: "Send proposal",
    city: "New York",
    country: "USA",
    state: "NY",
    postalCode: "10001",
    language: "Spanish",
    note: "Budget approval pending",
  },
  {
    id: 3,
    name: "AI Data Analytics Deal",
    company: "Analytics Pro",
    contactFirstName: "James",
    contactLastName: "Wilson",
    email: "james.wilson@analyticspro.com",
    phone: "+1 (555) 999-0000",
    mobile: "+1 (555) 111-0000",
    status: "Qualified",
    priority: "Medium",
    qualificationLevel: "Warm",
    source: "LinkedIn",
    owner: "David Brown",
    category: "AI/Analytics",
    campaign: "AI Growth Plan",
    followUpActivity: "Finalize contract",
    city: "Chicago",
    country: "USA",
    state: "IL",
    postalCode: "60601",
    language: "French",
    note: "Very promising lead",
  },
];

// Badge helpers
const getStatusBadge = (status: string) => {
  const variant = status === "Qualified" ? "default" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
};

const getPriorityBadge = (priority: string) => {
  const variant = priority === "High" ? "destructive" : priority === "Medium" ? "default" : "outline";
  return <Badge variant={variant}>{priority}</Badge>;
};

const getQualificationBadge = (level: string) => {
  const variant = level === "Hot" ? "destructive" : level === "Warm" ? "default" : "outline";
  return <Badge variant={variant}>{level}</Badge>;
};

const Opportunities = () => {
  const [opportunities] = useState(
    sampleOpportunities.filter((opp) => opp.status === "Qualified")
  );

  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Opportunities" />

      <div className="p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
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
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((opp) => (
                  <TableRow key={opp.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{opp.name}</TableCell>
                    <TableCell>{opp.company}</TableCell>
                    <TableCell>{opp.contactFirstName} {opp.contactLastName}</TableCell>
                    <TableCell>{getStatusBadge(opp.status)}</TableCell>
                    <TableCell>{getQualificationBadge(opp.qualificationLevel)}</TableCell>
                    <TableCell>{opp.source}</TableCell>
                    <TableCell>{opp.category}</TableCell>
                    <TableCell>{getPriorityBadge(opp.priority)}</TableCell>
                    <TableCell>{opp.campaign}</TableCell>
                    <TableCell>{opp.owner}</TableCell>
                    <TableCell>{opp.followUpActivity}</TableCell>
                    <TableCell>{opp.city}</TableCell>
                    <TableCell>{opp.country}</TableCell>
                    <TableCell>{opp.state}</TableCell>
                    <TableCell>{opp.postalCode}</TableCell>
                    <TableCell>{opp.language}</TableCell>
                    <TableCell>{opp.phone}</TableCell>
                    <TableCell>{opp.mobile}</TableCell>
                    <TableCell>
                      <a href={`mailto:${opp.email}`} className="text-primary hover:underline">
                        {opp.email}
                      </a>
                    </TableCell>
                    <TableCell>{opp.note}</TableCell>
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

export default Opportunities;
