import React from "react";
import { CRMToolbar } from "@/components/layout/CRMToolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const ActivityFeed = () => {
  return (
    <div className="min-h-screen bg-background">
      <CRMToolbar title="Activity Feed" />
      
      <div className="p-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16 text-muted-foreground">
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No recent activity</h3>
              <p>Activity from your team and customers will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityFeed;