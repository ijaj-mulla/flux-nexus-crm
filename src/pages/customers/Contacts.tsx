import React, { useState } from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { FormCard } from "@/components/forms/FormCard";
import { FormSection } from "@/components/forms/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for contacts
const sampleContacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 987-6543",
    company: "TechCorp Solutions",
    role: "CEO",
    address: "123 Tech Street, San Francisco, CA 94105"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@globalmfg.com",
    phone: "+1 (555) 234-5678",
    mobile: "+1 (555) 876-5432",
    company: "Global Manufacturing Ltd",
    role: "CTO",
    address: "456 Industrial Ave, Detroit, MI 48201"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@digitalagency.com",
    phone: "+1 (555) 345-6789",
    mobile: "+1 (555) 765-4321",
    company: "Digital Marketing Agency",
    role: "VP Sales",
    address: "789 Marketing Blvd, New York, NY 10001"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@healthsystems.com",
    phone: "+1 (555) 456-7890",
    mobile: "+1 (555) 654-3210",
    company: "Healthcare Systems Inc",
    role: "Director",
    address: "321 Health Way, Boston, MA 02101"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@finservices.com",
    phone: "+1 (555) 567-8901",
    mobile: "+1 (555) 543-2109",
    company: "Financial Services Group",
    role: "Manager",
    address: "654 Finance St, Chicago, IL 60601"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@retailcorp.com",
    phone: "+1 (555) 678-9012",
    mobile: "+1 (555) 432-1098",
    company: "Retail Corporation",
    role: "VP Marketing",
    address: "987 Retail Plaza, Los Angeles, CA 90001"
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@consulting.com",
    phone: "+1 (555) 789-0123",
    mobile: "+1 (555) 321-0987",
    company: "Strategic Consulting",
    role: "Senior Partner",
    address: "147 Consulting Ave, Washington, DC 20001"
  }
];

const Contacts = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState(sampleContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleToolbarAction = (action: string) => {
    if (action === 'add-new') {
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
  };

  const handleSort = (field: string) => {
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
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    const direction = sortDirection === "asc" ? 1 : -1;
    return aValue > bValue ? direction : -direction;
  });

  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = sortedContacts.slice(startIndex, startIndex + itemsPerPage);

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <CRMToolbar title="Contacts - New Contact" onAction={handleToolbarAction} />
        
        <div className="p-6">
          <FormCard title="Contact Information">
            <FormSection title="Contact Details">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" placeholder="Enter mobile number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Enter role/position" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter complete address" />
              </div>
            </FormSection>

            <div className="flex justify-end space-x-4 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Save Contact</Button>
            </div>
          </FormCard>
        </div>
      </div>
    );
  }

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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-[600px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>Name</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>Email</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('phone')}>Phone</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('mobile')}>Mobile</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('company')}>Company</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('role')}>Role</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('address')}>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContacts.map((contact) => (
                    <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                          {contact.email}
                        </a>
                      </TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.mobile}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{contact.role}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={contact.address}>
                        {contact.address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
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