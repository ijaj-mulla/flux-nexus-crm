import React, { useState } from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";

// Sample data for contacts with all required fields
const sampleContacts = [
  {
    id: 1,
    title: "Mr.",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 987-6543",
    account: "TechCorp Solutions",
    department: "Executive",
    technicalFunction: "Leadership",
    function: "Chief Executive Officer",
    contactId: "CONT-001",
    externalId: "EXT-TC-001",
    language: "English",
    accountId: "ACC-001",
    email: "john.smith@techcorp.com",
    status: "Active",
    jobTitle: "CEO",
    state: "California",
    country: "United States",
    createdBy: "Admin User"
  },
  {
    id: 2,
    title: "Ms.",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    mobile: "+1 (555) 876-5432",
    account: "Global Manufacturing Ltd",
    department: "Technology",
    technicalFunction: "Engineering",
    function: "Chief Technology Officer",
    contactId: "CONT-002",
    externalId: "EXT-GM-002",
    language: "English",
    accountId: "ACC-002",
    email: "sarah.johnson@globalmfg.com",
    status: "Active",
    jobTitle: "CTO",
    state: "Michigan",
    country: "United States",
    createdBy: "Sales Rep"
  },
  {
    id: 3,
    title: "Mr.",
    name: "Mike Wilson",
    phone: "+1 (555) 345-6789",
    mobile: "+1 (555) 765-4321",
    account: "Digital Marketing Agency",
    department: "Sales",
    technicalFunction: "Business Development",
    function: "Vice President Sales",
    contactId: "CONT-003",
    externalId: "EXT-DMA-003",
    language: "English",
    accountId: "ACC-003",
    email: "mike.wilson@digitalagency.com",
    status: "Active",
    jobTitle: "VP Sales",
    state: "New York",
    country: "United States",
    createdBy: "Marketing Team"
  },
  {
    id: 4,
    title: "Dr.",
    name: "Emily Davis",
    phone: "+1 (555) 456-7890",
    mobile: "+1 (555) 654-3210",
    account: "Healthcare Systems Inc",
    department: "Operations",
    technicalFunction: "Healthcare Management",
    function: "Operations Director",
    contactId: "CONT-004",
    externalId: "EXT-HS-004",
    language: "English",
    accountId: "ACC-004",
    email: "emily.davis@healthsystems.com",
    status: "Active",
    jobTitle: "Director",
    state: "Massachusetts",
    country: "United States",
    createdBy: "Admin User"
  },
  {
    id: 5,
    title: "Mr.",
    name: "David Brown",
    phone: "+1 (555) 567-8901",
    mobile: "+1 (555) 543-2109",
    account: "Financial Services Group",
    department: "Finance",
    technicalFunction: "Financial Analysis",
    function: "Finance Manager",
    contactId: "CONT-005",
    externalId: "EXT-FSG-005",
    language: "English",
    accountId: "ACC-005",
    email: "david.brown@finservices.com",
    status: "Inactive",
    jobTitle: "Manager",
    state: "Illinois",
    country: "United States",
    createdBy: "Finance Team"
  }
];

const Contacts = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState(sampleContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    phone: "",
    mobile: "",
    account: "",
    department: "",
    technicalFunction: "",
    function: "",
    contactId: "",
    externalId: "",
    language: "",
    accountId: "",
    email: "",
    status: "Active",
    jobTitle: "",
    state: "",
    country: "",
    createdBy: "Current User"
  });
  const itemsPerPage = 10;

  const handleToolbarAction = (action) => {
    if (action === 'add-new') {
      setShowForm(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      ...formData,
      id: contacts.length + 1,
      contactId: `CONT-${String(contacts.length + 1).padStart(3, '0')}`
    };
    setContacts([...contacts, newContact]);
    setFormData({
      title: "",
      name: "",
      phone: "",
      mobile: "",
      account: "",
      department: "",
      technicalFunction: "",
      function: "",
      contactId: "",
      externalId: "",
      language: "",
      accountId: "",
      email: "",
      status: "Active",
      jobTitle: "",
      state: "",
      country: "",
      createdBy: "Current User"
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

  const filteredContacts = contacts.filter(contact =>
    Object.values(contact).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;
    return aValue > bValue ? direction : -direction;
  });

  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = sortedContacts.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const variant = status === "Active" ? "default" : status === "Inactive" ? "destructive" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Contacts" onAction={handleToolbarAction} />
      
      <div className="p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contacts ({sortedContacts.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Dialog open={showForm} onOpenChange={setShowForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Contact</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Select value={formData.title} onValueChange={(value) => handleInputChange('title', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select title" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mr.">Mr.</SelectItem>
                              <SelectItem value="Ms.">Ms.</SelectItem>
                              <SelectItem value="Dr.">Dr.</SelectItem>
                              <SelectItem value="Prof.">Prof.</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile</Label>
                          <Input
                            id="mobile"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                            placeholder="Enter mobile number"
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
                          <Label htmlFor="accountId">Account ID</Label>
                          <Input
                            id="accountId"
                            value={formData.accountId}
                            onChange={(e) => handleInputChange('accountId', e.target.value)}
                            placeholder="Enter account ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            placeholder="Enter department"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="technicalFunction">Technical Function</Label>
                          <Input
                            id="technicalFunction"
                            value={formData.technicalFunction}
                            onChange={(e) => handleInputChange('technicalFunction', e.target.value)}
                            placeholder="Enter technical function"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="function">Function</Label>
                          <Input
                            id="function"
                            value={formData.function}
                            onChange={(e) => handleInputChange('function', e.target.value)}
                            placeholder="Enter function"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                            placeholder="Enter job title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="externalId">External ID</Label>
                          <Input
                            id="externalId"
                            value={formData.externalId}
                            onChange={(e) => handleInputChange('externalId', e.target.value)}
                            placeholder="Enter external ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                              <SelectItem value="German">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter email address"
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
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="Enter state"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            placeholder="Enter country"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Save Contact</Button>
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
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('title')}>Title</TableHead>
                    <TableHead className="cursor-pointer min-w-[150px]" onClick={() => handleSort('name')}>Name</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('phone')}>Phone</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('mobile')}>Mobile</TableHead>
                    <TableHead className="cursor-pointer min-w-[180px]" onClick={() => handleSort('account')}>Account</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('department')}>Department</TableHead>
                    <TableHead className="cursor-pointer min-w-[160px]" onClick={() => handleSort('technicalFunction')}>Technical Function</TableHead>
                    <TableHead className="cursor-pointer min-w-[150px]" onClick={() => handleSort('function')}>Function</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('contactId')}>Contact ID</TableHead>
                    <TableHead className="cursor-pointer min-w-[130px]" onClick={() => handleSort('externalId')}>External ID</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('language')}>Language</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('accountId')}>Account ID</TableHead>
                    <TableHead className="cursor-pointer min-w-[200px]" onClick={() => handleSort('email')}>Email</TableHead>
                    <TableHead className="cursor-pointer min-w-[100px]" onClick={() => handleSort('status')}>Status</TableHead>
                    <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort('jobTitle')}>Job Title</TableHead>
                    <TableHead className="cursor-pointer min-w-[100px]" onClick={() => handleSort('state')}>State</TableHead>
                    <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort('country')}>Country</TableHead>
                    <TableHead className="cursor-pointer min-w-[130px]" onClick={() => handleSort('createdBy')}>Created By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContacts.map((contact) => (
                    <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>{contact.title}</TableCell>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.mobile}</TableCell>
                      <TableCell>{contact.account}</TableCell>
                      <TableCell>{contact.department}</TableCell>
                      <TableCell>{contact.technicalFunction}</TableCell>
                      <TableCell>{contact.function}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{contact.contactId}</Badge>
                      </TableCell>
                      <TableCell>{contact.externalId}</TableCell>
                      <TableCell>{contact.language}</TableCell>
                      <TableCell>{contact.accountId}</TableCell>
                      <TableCell>
                        <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                          {contact.email}
                        </a>
                      </TableCell>
                      <TableCell>{getStatusBadge(contact.status)}</TableCell>
                      <TableCell>{contact.jobTitle}</TableCell>
                      <TableCell>{contact.state}</TableCell>
                      <TableCell>{contact.country}</TableCell>
                      <TableCell>{contact.createdBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedContacts.length)} of {sortedContacts.length} entries
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

export default Contacts;