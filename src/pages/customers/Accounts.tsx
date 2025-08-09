import React from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { FormCard } from "@/components/forms/FormCard";
import { FormSection } from "@/components/forms/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Accounts = () => {
  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Accounts" />
      
      <div className="p-6">
        <FormCard title="Account Information">
          <FormSection title="Account Information">
            <div className="space-y-2">
              <Label htmlFor="accountId">Account ID</Label>
              <Input id="accountId" placeholder="Enter account ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input id="accountName" placeholder="Enter account name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalName">Additional Name</Label>
              <Input id="additionalName" placeholder="Enter additional name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prospectRole">Prospect Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select prospect role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decision-maker">Decision Maker</SelectItem>
                  <SelectItem value="influencer">Influencer</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="Enter website URL" />
            </div>
          </FormSection>

          <FormSection title="Sales & Business Details">
            <div className="space-y-2">
              <Label htmlFor="salesOrg">Sales Organization</Label>
              <Input id="salesOrg" placeholder="Enter sales organization" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buAssignment">BU Assignment</Label>
              <Input id="buAssignment" placeholder="Enter BU assignment" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industryHorizontal">Industry Categories (Horizontal)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select horizontal category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industryVertical">Vertical</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select vertical category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subVertical">Sub Vertical</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select sub vertical" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="smb">SMB</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormSection>

          <FormSection title="Location Details">
            <div className="space-y-2">
              <Label htmlFor="country">Country/Region</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country/region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" placeholder="Enter postal code" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Enter state" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="Enter district" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input id="street" placeholder="Enter street address" />
            </div>
          </FormSection>

          <FormSection title="Territory Management">
            <div className="space-y-2">
              <Label htmlFor="overrideTerritory">Override Territory</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select override territory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="territory">Territory</Label>
              <Input id="territory" placeholder="Enter territory" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input id="owner" placeholder="Enter owner" />
            </div>
          </FormSection>

          <FormSection title="Tax Information">
            <div className="space-y-2">
              <Label htmlFor="taxCountry">Tax Country/Region</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax country/region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxNumberType">Tax Number Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax number type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ein">EIN</SelectItem>
                  <SelectItem value="vat">VAT</SelectItem>
                  <SelectItem value="gstin">GSTIN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxNumber">Tax Number</Label>
              <Input id="taxNumber" placeholder="Enter tax number" />
            </div>
          </FormSection>

          <div className="flex justify-end space-x-4 pt-6 border-t border-border">
            <Button variant="outline">Cancel</Button>
            <Button>Save Account</Button>
          </div>
        </FormCard>
      </div>
    </div>
  );
};

export default Accounts;