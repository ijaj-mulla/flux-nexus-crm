import React, { useState } from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";

// Sample data for opportunities with all required fields
const sampleOpportunities = [
  {
    id: 1,
    name: "Enterprise Software Deal",
    account: "Fortune 500 Corp",
    opportunityGroup: "Large Enterprise",
    opportunityType: "New Business",
    industry: "Technology",
    subIndustry: "Enterprise Software",
    primaryContact: "Jennifer Martinez",
    source: "Referral",
    expectedValue: 500000,
    startDate: "2024-01-15",
    closeDate: "2024-06-30",
    salesPhase: "Proposal",
    probability: 75,
    forecastCategory: "Commit",
    category: "Enterprise Software",
    owner: "John Smith",
    note: "Large enterprise deal worth $500K+ annually",
    status: "Active"
  },
  {
    id: 2,
    name: "Cloud Infrastructure Upgrade",
    account: "Mid-Size Manufacturing",
    opportunityGroup: "Mid Market",
    opportunityType: "Upsell",
    industry: "Manufacturing",
    subIndustry: "Industrial Equipment",
    primaryContact: "Carlos Rodriguez",
    source: "Website",
    expectedValue: 250000,
    startDate: "2024-02-01",
    closeDate: "2024-08-15",
    salesPhase: "Negotiation",
    probability: 60,
    forecastCategory: "Best Case",
    category: "Cloud Services",
    owner: "Sarah Johnson",
    note: "Multi-year cloud infrastructure deal with expansion potential",
    status: "Active"
  },
  {
    id: 3,
    name: "Digital Transformation Package",
    account: "Regional Bank",
    opportunityGroup: "Enterprise",
    opportunityType: "New Business",
    industry: "Financial Services",
    subIndustry: "Banking",
    primaryContact: "Amanda Foster",
    source: "Trade Show",
    expectedValue: 750000,
    startDate: "2024-01-20",
    closeDate: "2024-09-30",
    salesPhase: "Qualified",
    probability: 85,
    forecastCategory: "Commit",
    category: "Digital Transformation",
    owner: "Mike Wilson",
    note: "Complete digital transformation for banking operations",
    status: "Active"
  },
  {
    id: 4,
    name: "Analytics Platform Implementation",
    account: "Healthcare Network",
    opportunityGroup: "Large Enterprise",
    opportunityType: "New Business",
    industry: "Healthcare",
    subIndustry: "Hospital Systems",
    primaryContact: "Dr. Michael Chang",
    source: "LinkedIn",
    expectedValue: 180000,
    startDate: "2024-03-01",
    closeDate: "2024-10-15",
    salesPhase: "Discovery",
    probability: 40,
    forecastCategory: "Pipeline",
    category: "Healthcare Analytics",
    owner: "Emily Davis",
    note: "Advanced analytics for patient care optimization",
    status: "Active"
  },
  {
    id: 5,
    name: "Security Solutions Upgrade",
    account: "Tech Startup Hub",
    opportunityGroup: "SMB",
    opportunityType: "Renewal",
    industry: "Technology",
    subIndustry: "Cybersecurity",
    primaryContact: "Rachel Kim",
    source: "Partner Referral",
    expectedValue: 95000,
    startDate: "2024-02-15",
    closeDate: "2024-07-30",
    salesPhase: "Proposal",
    probability: 70,
    forecastCategory: "Best Case",
    category: "Cybersecurity",
    owner: "David Brown",
    note: "Comprehensive security solution for growing startup ecosystem",
    status: "Active"
  }
];

const Opportunities = () => {
  const [showForm, setShowForm] = useState(false);
  const [opportunities, setOpportunities] = useState(sampleOpportunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    opportunityGroup: "",
    opportunityType: "",
    industry: "",
    subIndustry: "",
    primaryContact: "",
    source: "",
    expectedValue: "",
    startDate: "",
    closeDate: "",
    salesPhase: "Discovery",
    probability: "",
    forecastCategory: "Pipeline",
    category: "",
    owner: "",
    note: "",
    status: "Active"
  });
  const itemsPerPage = 10;

  const handleToolbarAction = (action) => {
    if (action === 'add-new') {
      setShowForm(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOpportunity = {
      ...formData,
      id: opportunities.length + 1,
      expectedValue: parseFloat(formData.expectedValue) || 0,
      probability: parseInt(formData.probability) || 0
    };
    setOpportunities([...opportunities, newOpportunity]);
    setFormData({
      name: "",
      account: "",
      opportunityGroup: "",
      opportunityType: "",
      industry: "",
      subIndustry: "",
      primaryContact: "",
      source: "",
      expectedValue: "",
      startDate: "",
      closeDate: "",
      salesPhase: "Discovery",
      probability: "",
      forecastCategory: "Pipeline",
      category: "",
      owner: "",
      note: "",
      status: "Active"
    });
    setShowForm(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const getSalesPhaseBadge = (phase) => {
    const phaseColors = {
      "Discovery": "outline",
      "Qualified": "secondary",
      "Proposal": "default",
      "Negotiation": "destructive",
      "Closed Won": "default",
      "Closed Lost": "destructive"
    };
    return <Badge variant={phaseColors[phase] || "outline"}>{phase}</Badge>;
  };

  const getForecastBadge = (category) => {
    const categoryColors = {
      "Pipeline": "outline",
      "Best Case": "secondary",
      "Commit": "default",
      "Closed": "destructive"
    };
    return <Badge variant={categoryColors[category] || "outline"}>{category}</Badge>;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadge = (status) => {
    const variant = status === "Active" ? "default" : "destructive";
    return <Badge variant={variant}>{status}</Badge>;
  };

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
                <Dialog open={showForm} onOpenChange={setShowForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Opportunity
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Opportunity</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter opportunity name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account">Account</Label>
                          <Input
                            id="account"
                            value={formData.account}
                            onChange={(e) => handleInputChange('account', e.target.value)}
                            placeholder="Enter account name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="opportunityGroup">Opportunity Group</Label>
                          <Select value={formData.opportunityGroup} onValueChange={(value) => handleInputChange('opportunityGroup', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select opportunity group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SMB">SMB</SelectItem>
                              <SelectItem value="Mid Market">Mid Market</SelectItem>
                              <SelectItem value="Enterprise">Enterprise</SelectItem>
                              <SelectItem value="Large Enterprise">Large Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="opportunityType">Opportunity Type</Label>
                          <Select value={formData.opportunityType} onValueChange={(value) => handleInputChange('opportunityType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select opportunity type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New Business">New Business</SelectItem>
                              <SelectItem value="Upsell">Upsell</SelectItem>
                              <SelectItem value="Renewal">Renewal</SelectItem>
                              <SelectItem value="Cross-sell">Cross-sell</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Input
                            id="industry"
                            value={formData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            placeholder="Enter industry"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subIndustry">Sub Industry</Label>
                          <Input
                            id="subIndustry"
                            value={formData.subIndustry}
                            onChange={(e) => handleInputChange('subIndustry', e.target.value)}
                            placeholder="Enter sub industry"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="primaryContact">Primary Contact</Label>
                          <Input
                            id="primaryContact"
                            value={formData.primaryContact}
                            onChange={(e) => handleInputChange('primaryContact', e.target.value)}
                            placeholder="Enter primary contact name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="source">Source</Label>
                          <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Website">Website</SelectItem>
                              <SelectItem value="Referral">Referral</SelectItem>
                              <SelectItem value="Trade Show">Trade Show</SelectItem>
                              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                              <SelectItem value="Partner Referral">Partner Referral</SelectItem>
                              <SelectItem value="Cold Call">Cold Call</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expectedValue">Expected Value ($)</Label>
                          <Input
                            id="expectedValue"
                            type="number"
                            value={formData.expectedValue}
                            onChange={(e) => handleInputChange('expectedValue', e.target.value)}
                            placeholder="Enter expected value"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="closeDate">Close Date</Label>
                          <Input
                            id="closeDate"
                            type="date"
                            value={formData.closeDate}
                            onChange={(e) => handleInputChange('closeDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salesPhase">Sales Phase</Label>
                          <Select value={formData.salesPhase} onValueChange={(value) => handleInputChange('salesPhase', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sales phase" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Discovery">Discovery</SelectItem>
                              <SelectItem value="Qualified">Qualified</SelectItem>
                              <SelectItem value="Proposal">Proposal</SelectItem>
                              <SelectItem value="Negotiation">Negotiation</SelectItem>
                              <SelectItem value="Closed Won">Closed Won</SelectItem>
                              <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="probability">Probability (%)</Label>
                          <Input
                            id="probability"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.probability}
                            onChange={(e) => handleInputChange('probability', e.target.value)}
                            placeholder="Enter probability (0-100)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="forecastCategory">Forecast Category</Label>
                          <Select value={formData.forecastCategory} onValueChange={(value) => handleInputChange('forecastCategory', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select forecast category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pipeline">Pipeline</SelectItem>
                              <SelectItem value="Best Case">Best Case</SelectItem>
                              <SelectItem value="Commit">Commit</SelectItem>
                              <SelectItem value="Closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            placeholder="Enter category"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="owner">Owner</Label>
                          <Input
                            id="owner"
                            value={formData.owner}
                            onChange={(e) => handleInputChange('owner', e.target.value)}
                            placeholder="Enter owner name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="note">Note</Label>
                        <Textarea
                          id="note"
                          value={formData.note}
                          onChange={(e) => handleInputChange('note', e.target.value)}
                          placeholder="Enter notes"
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end space-x-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Save Opportunity</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-y-auto max-h-[600px] w-full">
              <Table className="min-w-max">
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="cursor-pointer min-w-[200px]" onClick={() => handleSort('name')}>Name</TableHead>
                    <TableHead className="cursor-pointer min-w-[180px]" onClick={() => handleSort('account')}>Account</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('opportunityGroup')}>Opportunity Group</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('opportunityType')}>Opportunity Type</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('industry')}>Industry</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('subIndustry')}>Sub Industry</TableHead>
                    <TableHead className="cursor-pointer min-w-[160px]" onClick={() => handleSort('primaryContact')}>Primary Contact</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('source')}>Source</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('expectedValue')}>Expected Value</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('startDate')}>Start Date</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('closeDate')}>Close Date</TableHead>
                    <TableHead className="cursor-pointer min-w-[130px]" onClick={() => handleSort('salesPhase')}>Sales Phase</TableHead>
                    <TableHead className="cursor-pointer min-w-[110px]" onClick={() => handleSort('probability')}>Probability</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('forecastCategory')}>Forecast Category</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('category')}>Category</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('owner')}>Owner</TableHead>
                    <TableHead className="cursor-pointer min-w-[100px]" onClick={() => handleSort('status')}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOpportunities.map((opportunity) => (
                    <TableRow key={opportunity.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{opportunity.name}</TableCell>
                      <TableCell>{opportunity.account}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{opportunity.opportunityGroup}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{opportunity.opportunityType}</Badge>
                      </TableCell>
                      <TableCell>{opportunity.industry}</TableCell>
                      <TableCell>{opportunity.subIndustry}</TableCell>
                      <TableCell>{opportunity.primaryContact}</TableCell>
                      <TableCell>{opportunity.source}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(opportunity.expectedValue)}</TableCell>
                      <TableCell>{opportunity.startDate}</TableCell>
                      <TableCell>{opportunity.closeDate}</TableCell>
                      <TableCell>{getSalesPhaseBadge(opportunity.salesPhase)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{opportunity.probability}%</Badge>
                      </TableCell>
                      <TableCell>{getForecastBadge(opportunity.forecastCategory)}</TableCell>
                      <TableCell>{opportunity.category}</TableCell>
                      <TableCell>{opportunity.owner}</TableCell>
                      <TableCell>{getStatusBadge(opportunity.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
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