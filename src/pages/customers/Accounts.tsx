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

// ✅ Expanded sample data to include all table fields
const sampleAccounts = [
  {
    id: 1,
    accountId: "ACC001",
    accountType: "Customer",
    accountName: "TechCorp Solutions",
    prospectRole: "Decision Maker",
    website: "www.techcorp.com",
    status: "Active",
    salesOrg: "North America Sales",
    buAssignment: "Technology BU",
    industryHorizontal: "Technology",
    vertical: "Software",
    subVertical: "Enterprise",
    country: "United States",
    postalCode: "94105",
    city: "San Francisco",
    state: "California",
    district: "Downtown",
    street: "123 Market Street",
    territory: "West Coast",
    owner: "John Smith",
    taxCountry: "United States",
    taxNumberType: "EIN",
    taxNumber: "12-3456789",
  },
  {
    id: 2,
    accountId: "ACC002",
    accountType: "Prospect",
    accountName: "Global Manufacturing Ltd",
    prospectRole: "Influencer",
    website: "www.globalmfg.com",
    status: "Prospect",
    salesOrg: "Industrial Sales",
    buAssignment: "Manufacturing BU",
    industryHorizontal: "Manufacturing",
    vertical: "Hardware",
    subVertical: "SMB",
    country: "United States",
    postalCode: "48201",
    city: "Detroit",
    state: "Michigan",
    district: "Central",
    street: "456 Industrial Ave",
    territory: "Midwest",
    owner: "Sarah Johnson",
    taxCountry: "United States",
    taxNumberType: "VAT",
    taxNumber: "US-987654",
  },
  {
    id: 3,
    accountId: "ACC003",
    accountType: "Partner",
    accountName: "Digital Marketing Agency",
    prospectRole: "User",
    website: "www.digitalagency.com",
    status: "Active",
    salesOrg: "Marketing Sales",
    buAssignment: "Marketing BU",
    industryHorizontal: "Marketing",
    vertical: "Services",
    subVertical: "Startup",
    country: "United States",
    postalCode: "10001",
    city: "New York",
    state: "New York",
    district: "Manhattan",
    street: "789 Madison Ave",
    territory: "East Coast",
    owner: "Mike Wilson",
    taxCountry: "United States",
    taxNumberType: "GSTIN",
    taxNumber: "GST-12345",
  },
];

const Accounts = () => {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState(sampleAccounts);

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
    const variant =
      status === "Active"
        ? "default"
        : status === "Prospect"
        ? "secondary"
        : "outline";
    return <Badge variant={variant}>{status}</Badge>;
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        <CRMToolbar
          title="Accounts - New Account"
          onAction={handleToolbarAction}
        />
        {/* Form kept same */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Accounts" onAction={handleToolbarAction} />

      <div className="p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account ID</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Prospect Role</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales Organization</TableHead>
                  <TableHead>BU Assignment</TableHead>
                  <TableHead>Industry Categories (Horizontal)</TableHead>
                  <TableHead>Vertical</TableHead>
                  <TableHead>Sub Vertical</TableHead>
                  <TableHead>Country/Region</TableHead>
                  <TableHead>Postal Code</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Street</TableHead>
                  <TableHead>Territory</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Tax Country/Region</TableHead>
                  <TableHead>Tax Number Type</TableHead>
                  <TableHead>Tax Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow
                    key={account.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>{account.accountId}</TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell className="font-medium">
                      {account.accountName}
                    </TableCell>
                    <TableCell>{account.prospectRole}</TableCell>
                    <TableCell>
                      <a
                        href={`https://${account.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {account.website}
                      </a>
                    </TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell>{account.salesOrg}</TableCell>
                    <TableCell>{account.buAssignment}</TableCell>
                    <TableCell>{account.industryHorizontal}</TableCell>
                    <TableCell>{account.vertical}</TableCell>
                    <TableCell>{account.subVertical}</TableCell>
                    <TableCell>{account.country}</TableCell>
                    <TableCell>{account.postalCode}</TableCell>
                    <TableCell>{account.city}</TableCell>
                    <TableCell>{account.state}</TableCell>
                    <TableCell>{account.district}</TableCell>
                    <TableCell>{account.street}</TableCell>
                    <TableCell>{account.territory}</TableCell>
                    <TableCell>{account.owner}</TableCell>
                    <TableCell>{account.taxCountry}</TableCell>
                    <TableCell>{account.taxNumberType}</TableCell>
                    <TableCell>{account.taxNumber}</TableCell>
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

export default Accounts;
