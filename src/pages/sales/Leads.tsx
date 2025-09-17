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
    status: "In Process",
    priority: "High",
    qualificationLevel: "Hot",
    source: "Website",
    owner: "John Smith"
  },
  {
    id: 2,
    name: "Cloud Migration Project",
    company: "Legacy Systems Corp",
    contactFirstName: "Maria",
    contactLastName: "Garcia",
    email: "maria.garcia@legacy.com",
    phone: "+1 (555) 333-4444",
    status: "Qualified",
    priority: "Medium",
    qualificationLevel: "Warm",
    source: "Referral",
    owner: "Sarah Johnson"
  },
  {
    id: 3,
    name: "Digital Transformation Initiative",
    company: "Traditional Business Ltd",
    contactFirstName: "Robert",
    contactLastName: "Chen",
    email: "robert.chen@traditional.com",
    phone: "+1 (555) 555-6666",
    status: "In Process",
    priority: "High",
    qualificationLevel: "Hot",
    source: "Trade Show",
    owner: "Mike Wilson"
  },
  {
    id: 4,
    name: "CRM Implementation",
    company: "Growing Startup",
    contactFirstName: "Lisa",
    contactLastName: "Thompson",
    email: "lisa.thompson@growing.com",
    phone: "+1 (555) 777-8888",
    status: "In Process",
    priority: "Low",
    qualificationLevel: "Cold",
    source: "Cold Call",
    owner: "Emily Davis"
  },
  {
    id: 5,
    name: "Data Analytics Platform",
    company: "Analytics Pro",
    contactFirstName: "James",
    contactLastName: "Wilson",
    email: "james.wilson@analyticspro.com",
    phone: "+1 (555) 999-0000",
    status: "Qualified",
    priority: "Medium",
    qualificationLevel: "Warm",
    source: "LinkedIn",
    owner: "David Brown"
  }
];

const Leads = () => {
  const [showForm, setShowForm] = useState(false);
  const [leads, setLeads] = useState(sampleLeads);

  const handleToolbarAction = (action: string) => {
    if (action === 'add-new') {
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setShowForm(false);
  };

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

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <CRMToolbar title="Leads - New Lead" onAction={handleToolbarAction} />
        
        <div className="p-6">
          <FormCard title="Lead Information">
            <FormSection title="General Details">
              <div className="space-y-2">
                <Label htmlFor="leadName">Name</Label>
                <Input id="leadName" placeholder="Enter lead name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactFirstName">Contact First Name</Label>
                <Input id="contactFirstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactLastName">Contact Last Name</Label>
                <Input id="contactLastName" placeholder="Enter last name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-process">In Process</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualificationLevel">Qualification Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select qualification level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input id="source" placeholder="Enter lead source" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Enter category" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign">Campaign</Label>
                <Input id="campaign" placeholder="Enter campaign" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" placeholder="Enter owner" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followUpActivity">Follow-up Activity</Label>
                <Input id="followUpActivity" placeholder="Enter follow-up activity" />
              </div>
            </FormSection>

            <FormSection title="Account Information">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country/Region</Label>
                <Input id="country" placeholder="Enter country/region" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Enter state" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="Enter postal code" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormSection>

            <FormSection title="Contact Information">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" placeholder="Enter mobile number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
            </FormSection>

            <FormSection title="Notes">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter notes" rows={4} />
              </div>
            </FormSection>

            <div className="flex justify-end space-x-4 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Save Lead</Button>
            </div>
          </FormCard>
        </div>
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
  <TableHead>Note</TableHead>
</TableRow>

              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>{lead.contactFirstName} {lead.contactLastName}</TableCell>
                    <TableCell>
                      <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                        {lead.email}
                      </a>
                    </TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell>{getPriorityBadge(lead.priority)}</TableCell>
                    <TableCell>{getQualificationBadge(lead.qualificationLevel)}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>{lead.owner}</TableCell>
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