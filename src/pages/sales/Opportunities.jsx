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
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for opportunities with same fields as leads
const sampleOpportunities = [
  {
    id: 1,
    name: "Enterprise Software Deal",
    company: "Fortune 500 Corp",
    contactName: "Jennifer Martinez",
    status: "Proposal",
    qualificationLevel: "Hot",
    source: "Referral",
    category: "Enterprise Software",
    priority: "High",
    campaign: "Enterprise Q1 2024",
    owner: "John Smith",
    followUpActivity: "Contract Review",
    city: "New York",
    country: "United States",
    state: "New York",
    postalCode: "10001",
    language: "English",
    phone: "+1 (555) 100-2000",
    mobile: "+1 (555) 100-2001",
    email: "jennifer.martinez@fortune500.com",
    note: "Large enterprise deal worth $500K+ annually"
  },
  {
    id: 2,
    name: "Cloud Infrastructure Upgrade",
    company: "Mid-Size Manufacturing",
    contactName: "Carlos Rodriguez",
    status: "Negotiation",
    qualificationLevel: "Warm",
    source: "Website",
    category: "Cloud Services",
    priority: "Medium",
    campaign: "Cloud Migration 2024",
    owner: "Sarah Johnson",
    followUpActivity: "Final Pricing",
    city: "Chicago",
    country: "United States",
    state: "Illinois",
    postalCode: "60601",
    language: "English",
    phone: "+1 (555) 200-3000",
    mobile: "+1 (555) 200-3001",
    email: "carlos.rodriguez@midsize.com",
    note: "Multi-year cloud infrastructure deal with expansion potential"
  },
  {
    id: 3,
    name: "Digital Transformation Package",
    company: "Regional Bank",
    contactName: "Amanda Foster",
    status: "Qualified",
    qualificationLevel: "Hot",
    source: "Trade Show",
    category: "Digital Transformation",
    priority: "High",
    campaign: "Banking Solutions 2024",
    owner: "Mike Wilson",
    followUpActivity: "Executive Presentation",
    city: "Atlanta",
    country: "United States",
    state: "Georgia",
    postalCode: "30301",
    language: "English",
    phone: "+1 (555) 300-4000",
    mobile: "+1 (555) 300-4001",
    email: "amanda.foster@regionalbank.com",
    note: "Complete digital transformation for banking operations"
  },
  {
    id: 4,
    name: "Analytics Platform Implementation",
    company: "Healthcare Network",
    contactName: "Dr. Michael Chang",
    status: "Discovery",
    qualificationLevel: "Warm",
    source: "LinkedIn",
    category: "Healthcare Analytics",
    priority: "Medium",
    campaign: "Healthcare 2024",
    owner: "Emily Davis",
    followUpActivity: "Technical Demo",
    city: "Los Angeles",
    country: "United States",
    state: "California",
    postalCode: "90001",
    language: "English",
    phone: "+1 (555) 400-5000",
    mobile: "+1 (555) 400-5001",
    email: "michael.chang@healthnet.com",
    note: "Advanced analytics for patient care optimization"
  },
  {
    id: 5,
    name: "Security Solutions Upgrade",
    company: "Tech Startup Hub",
    contactName: "Rachel Kim",
    status: "Proposal",
    qualificationLevel: "Hot",
    source: "Partner Referral",
    category: "Cybersecurity",
    priority: "High",
    campaign: "Security First 2024",
    owner: "David Brown",
    followUpActivity: "Security Assessment",
    city: "San Francisco",
    country: "United States",
    state: "California",
    postalCode: "94105",
    language: "English",
    phone: "+1 (555) 500-6000",
    mobile: "+1 (555) 500-6001",
    email: "rachel.kim@techstartup.com",
    note: "Comprehensive security solution for growing startup ecosystem"
  }
];

const Opportunities = () => {
  const [showForm, setShowForm] = useState(false);
  const [opportunities, setOpportunities] = useState(sampleOpportunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleToolbarAction = (action) => {
    if (action === 'add-new') {
      setShowForm(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity =>
    Object.values(opportunity).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;
    return aValue > bValue ? direction : -direction;
  });

  const totalPages = Math.ceil(sortedOpportunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOpportunities = sortedOpportunities.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const statusColors = {
      "Discovery": "outline",
      "Qualified": "secondary",
      "Proposal": "default",
      "Negotiation": "destructive"
    };
    return <Badge variant={statusColors[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variant = priority === "High" ? "destructive" : priority === "Medium" ? "default" : "outline";
    return <Badge variant={variant}>{priority}</Badge>;
  };

  const getQualificationBadge = (level) => {
    const variant = level === "Hot" ? "destructive" : level === "Warm" ? "default" : "outline";
    return <Badge variant={variant}>{level}</Badge>;
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <CRMToolbar title="Opportunities - New Opportunity" onAction={handleToolbarAction} />
        
        <div className="p-6">
          <FormCard title="Opportunity Information">
            <FormSection title="General Details">
              <div className="space-y-2">
                <Label htmlFor="opportunityName">Name</Label>
                <Input id="opportunityName" placeholder="Enter opportunity name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input id="contactName" placeholder="Enter contact name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discovery">Discovery</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
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
                <Input id="source" placeholder="Enter opportunity source" />
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

            <FormSection title="Location Information">
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
                <Label htmlFor="note">Note</Label>
                <Textarea id="note" placeholder="Enter notes" rows={4} />
              </div>
            </FormSection>

            <div className="flex justify-end space-x-4 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Save Opportunity</Button>
            </div>
          </FormCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Opportunities" onAction={handleToolbarAction} />
      
      <div className="p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Opportunities ({sortedOpportunities.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-[600px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>Name</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('company')}>Company</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('contactName')}>Contact Name</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>Status</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('qualificationLevel')}>Qualification</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('source')}>Source</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>Category</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('priority')}>Priority</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('campaign')}>Campaign</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('owner')}>Owner</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('followUpActivity')}>Follow-up</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('city')}>City</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('state')}>State</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('phone')}>Phone</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOpportunities.map((opportunity) => (
                    <TableRow key={opportunity.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{opportunity.name}</TableCell>
                      <TableCell>{opportunity.company}</TableCell>
                      <TableCell>{opportunity.contactName}</TableCell>
                      <TableCell>{getStatusBadge(opportunity.status)}</TableCell>
                      <TableCell>{getQualificationBadge(opportunity.qualificationLevel)}</TableCell>
                      <TableCell>{opportunity.source}</TableCell>
                      <TableCell>{opportunity.category}</TableCell>
                      <TableCell>{getPriorityBadge(opportunity.priority)}</TableCell>
                      <TableCell>{opportunity.campaign}</TableCell>
                      <TableCell>{opportunity.owner}</TableCell>
                      <TableCell>{opportunity.followUpActivity}</TableCell>
                      <TableCell>{opportunity.city}</TableCell>
                      <TableCell>{opportunity.state}</TableCell>
                      <TableCell>{opportunity.phone}</TableCell>
                      <TableCell>
                        <a href={`mailto:${opportunity.email}`} className="text-primary hover:underline">
                          {opportunity.email}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedOpportunities.length)} of {sortedOpportunities.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Opportunities;