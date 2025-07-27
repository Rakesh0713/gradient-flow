import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit, Save, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
}

const mockProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com", 
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Product designer passionate about creating intuitive user experiences. Love working with teams to solve complex problems.",
  joinDate: "2024-01-15"
};

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Simulate logout
    navigate("/");
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="group"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-card shadow-card">
          <CardHeader className="pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/avatars/01.png" alt="Profile" />
                  <AvatarFallback className="gradient-primary text-primary-foreground text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon" 
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={editedProfile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                    <p className="text-muted-foreground mt-1">{profile.bio}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Member since {new Date(profile.joinDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="gradient" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{profile.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{profile.phone}</p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{profile.location}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <Card className="bg-card shadow-card text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">24</div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">12</div>
            <div className="text-sm text-muted-foreground">Notes Created</div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}