import React, { useState } from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { FormCard } from "@/components/forms/FormCard";
import { FormSection } from "@/components/forms/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Leads = () => {
  const [activeTab, setActiveTab] = useState("form");

  const LeadForm = () => (
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
        <Button variant="outline">Cancel</Button>
        <Button>Save Lead</Button>
      </div>
    </FormCard>
  );

  const LeadDetails = () => (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="team">Sales & Marketing Team</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="surveys">Surveys</TabsTrigger>
              <TabsTrigger value="opportunities">Related Opportunities</TabsTrigger>
              <TabsTrigger value="hubspot">Hubspot</TabsTrigger>
            </TabsList>
            
            {["overview", "feed", "notes", "activities", "team", "conversion", "attachments", "surveys", "opportunities", "hubspot"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <p>No {tab} data available</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Leads" />
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="form">New Lead</TabsTrigger>
            <TabsTrigger value="details">Lead Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <LeadForm />
          </TabsContent>
          
          <TabsContent value="details">
            <LeadDetails />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leads;