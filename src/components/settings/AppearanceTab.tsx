
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AppearanceTab = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your appearance settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>
          Customize how PropLogic AI looks for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="border p-4 rounded-md cursor-pointer bg-background relative flex items-center justify-center aspect-square">
                <div className="absolute top-2 right-2">
                  <Check size={16} className="text-primary" />
                </div>
                <span>Light</span>
              </div>
              <div className="border p-4 rounded-md cursor-pointer bg-slate-900 text-white flex items-center justify-center aspect-square">
                <span>Dark</span>
              </div>
              <div className="border p-4 rounded-md cursor-pointer bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center aspect-square">
                <span>Neon</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations">UI Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable UI animations
                </p>
              </div>
              <Switch id="animations" defaultChecked />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact">Compact View</Label>
              <p className="text-sm text-muted-foreground">
                Use a more compact layout for tables and lists
              </p>
            </div>
            <Switch id="compact" />
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
              Save Appearance
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppearanceTab;
