
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Check, Save, User, BellRing, Globe, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  // State for form inputs
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@proplogic.ai",
    position: "Proposal Manager",
    bio: "Experienced proposal writer with 10+ years in the industry."
  });

  const [saving, setSaving] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (formName: string) => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: `Your ${formName} settings have been saved successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellRing size={16} />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Globe size={16} />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and how you appear in the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={profileForm.name} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profileForm.email} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input 
                      id="position" 
                      name="position" 
                      value={profileForm.position} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={profileForm.bio} 
                    onChange={handleProfileChange} 
                    rows={4} 
                  />
                </div>

                <Button 
                  onClick={() => handleSave("profile")} 
                  disabled={saving} 
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
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
                  onClick={() => handleSave("notification")} 
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
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
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
                  onClick={() => handleSave("appearance")} 
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
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and access permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSave("security")} 
                  disabled={saving} 
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save size={16} />
                      Update Security Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
