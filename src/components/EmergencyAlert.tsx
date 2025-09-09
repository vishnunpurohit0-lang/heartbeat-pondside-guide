import { useState, useEffect } from "react";
import { AlertTriangle, Phone, MapPin, Clock, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export const EmergencyAlert = () => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: "Dr. Smith", phone: "+1-555-0123", relation: "Primary Doctor" },
    { name: "Emergency Services", phone: "911", relation: "Emergency" }
  ]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [newContact, setNewContact] = useState<EmergencyContact>({ name: "", phone: "", relation: "" });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isEmergency) {
      triggerEmergencyAlert();
      setIsEmergency(false);
    }
    return () => clearInterval(interval);
  }, [countdown, isEmergency]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const initiateEmergency = () => {
    setIsEmergency(true);
    setCountdown(10);
    getLocation();
    
    toast({
      title: "Emergency Alert Initiated",
      description: "Alert will be sent in 10 seconds. Tap Cancel to stop.",
      variant: "destructive",
    });
  };

  const cancelEmergency = () => {
    setIsEmergency(false);
    setCountdown(0);
    
    toast({
      title: "Emergency Alert Cancelled",
      description: "Alert has been cancelled successfully.",
    });
  };

  const triggerEmergencyAlert = () => {
    // Simulate sending emergency alerts
    emergencyContacts.forEach(contact => {
      // In a real app, this would send SMS/call
      console.log(`Sending emergency alert to ${contact.name}: ${contact.phone}`);
    });

    toast({
      title: "Emergency Alert Sent!",
      description: `Alert sent to ${emergencyContacts.length} emergency contacts`,
      variant: "destructive",
    });

    // Simulate calling emergency services
    if (location) {
      console.log(`Emergency location: ${location.lat}, ${location.lng}`);
    }
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts(prev => [...prev, newContact]);
      setNewContact({ name: "", phone: "", relation: "" });
      setIsSettingsOpen(false);
      
      toast({
        title: "Contact Added",
        description: `${newContact.name} has been added to emergency contacts`,
      });
    }
  };

  const removeContact = (index: number) => {
    setEmergencyContacts(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been removed",
    });
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-heart-red/30 shadow-elegant">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-heart-red" />
            <h3 className="text-xl font-bold text-heart-red">Emergency Alert System</h3>
          </div>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Manage Contacts
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Emergency Contacts</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Current Contacts</h4>
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-medical-gray/10 rounded">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-medical-gray-dark">{contact.phone} • {contact.relation}</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeContact(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Add New Contact</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        value={newContact.name}
                        onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Phone</Label>
                      <Input
                        id="contact-phone"
                        value={newContact.phone}
                        onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1-555-0123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-relation">Relation</Label>
                      <Input
                        id="contact-relation"
                        value={newContact.relation}
                        onChange={(e) => setNewContact(prev => ({ ...prev, relation: e.target.value }))}
                        placeholder="Doctor, Family, etc."
                      />
                    </div>
                    <Button onClick={addEmergencyContact} className="w-full">
                      Add Contact
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-heart-red/10 backdrop-blur-sm rounded-xl p-4 border border-heart-red/20">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-heart-red" />
            <p className="font-semibold text-heart-red">Heart Health Emergency</p>
          </div>
          <p className="text-sm text-medical-gray-dark mb-4">
            Press and hold the emergency button if you're experiencing chest pain, difficulty breathing, 
            or other heart-related symptoms. This will alert your emergency contacts and share your location.
          </p>
          
          {isEmergency && (
            <div className="bg-heart-red/20 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-heart-red animate-pulse-heart" />
                <p className="text-lg font-bold text-heart-red">
                  Sending alert in {countdown} seconds...
                </p>
              </div>
              <Button 
                onClick={cancelEmergency}
                className="w-full bg-medical-gray hover:bg-medical-gray-dark text-white"
              >
                CANCEL ALERT
              </Button>
            </div>
          )}
          
          {!isEmergency && (
            <Button 
              onClick={initiateEmergency}
              className="w-full bg-heart-red hover:bg-heart-red/90 text-white py-4 text-lg font-bold rounded-full shadow-heart transition-smooth"
            >
              <AlertTriangle className="h-6 w-6 mr-2" />
              EMERGENCY ALERT
            </Button>
          )}
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4 text-medical-blue" />
            Emergency Contacts ({emergencyContacts.length})
          </h4>
          <div className="space-y-2">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-medical-blue/10 rounded-full">
                    <Phone className="h-3 w-3 text-medical-blue" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-medical-gray-dark">{contact.relation}</p>
                  </div>
                </div>
                <p className="text-sm font-mono text-medical-blue">{contact.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {location && (
          <div className="bg-medical-green/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-medical-green" />
              <p className="font-semibold text-medical-green">Location Tracking Active</p>
            </div>
            <p className="text-sm text-medical-gray-dark">
              Your location will be shared with emergency contacts when an alert is sent.
            </p>
          </div>
        )}

        <div className="text-xs text-medical-gray-dark text-center">
          <p>⚠️ This is a demonstration. In a real emergency, call 911 immediately.</p>
        </div>
      </div>
    </Card>
  );
};