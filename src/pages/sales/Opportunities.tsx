import React from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Opportunities = () => {
  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Opportunities" />
      
      <div className="p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Opportunity Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="activities">Sales Activities</TabsTrigger>
                <TabsTrigger value="competitors">Competitors</TabsTrigger>
                <TabsTrigger value="team">Sales Team</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="parties">Involved Parties</TabsTrigger>
                <TabsTrigger value="related">Related Opportunities</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              {["overview", "feed", "products", "activities", "competitors", "team", "contacts", "parties", "related", "timeline"].map((tab) => (
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
    </div>
  );
};

export default Opportunities;