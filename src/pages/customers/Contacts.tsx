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
  }
];

const Contacts = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState(sampleContacts);

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
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
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

export default Contacts;