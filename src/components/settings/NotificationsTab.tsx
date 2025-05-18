
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NotificationsTab = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your notification settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-rfp">New RFP Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when new RFPs are added to the system
              </p>
            </div>
            <Switch id="new-rfp" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="deadline">Deadline Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming proposal deadlines
              </p>
            </div>
            <Switch id="deadline" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="approval">Approval Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Be notified when your proposals are approved or require changes
              </p>
            </div>
            <Switch id="approval" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="win-loss">Win/Loss Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get updates when proposal status changes to won or lost
              </p>
            </div>
            <Switch id="win-loss" />
          </div>
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={saving} 
          className="flex items-center gap-2"
        >
          {saving ? (
            <>Saving...</>
          ) : (
            <>
              <Save size={16} />
              Save Preferences
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
