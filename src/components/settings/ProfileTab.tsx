
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileFormData {
  name: string;
  email: string;
  position: string;
  bio: string;
}

interface ProfileTabProps {
  initialData: ProfileFormData;
}

const ProfileTab = ({ initialData }: ProfileTabProps) => {
  const [profileForm, setProfileForm] = useState<ProfileFormData>(initialData);
  const [saving, setSaving] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your profile settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
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
          onClick={handleSave} 
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
  );
};

export default ProfileTab;
