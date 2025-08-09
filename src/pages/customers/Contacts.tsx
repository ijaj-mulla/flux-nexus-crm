import React from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { FormCard } from "@/components/forms/FormCard";
import { FormSection } from "@/components/forms/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Contacts" />
      
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
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter complete address" />
            </div>
          </FormSection>

          <div className="flex justify-end space-x-4 pt-6 border-t border-border">
            <Button variant="outline">Cancel</Button>
            <Button>Save Contact</Button>
          </div>
        </FormCard>
      </div>
    </div>
  );
};

export default Contacts;