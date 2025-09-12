import { useState, useEffect } from "react";
import { AlertTriangle, Phone, MapPin, Clock, Heart, Shield, Hospital } from "lucide-react";
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

interface HeartHospital {
  id: string;
  name: string;
  phone: string;
  address: string;
  lat: number;
  lng: number;
  distance?: number;
}

// Comprehensive database of cardiologist hospitals (in a real app, this would come from an API)
const heartHospitals: HeartHospital[] = [
  // Major Cardiology Centers
  {
    id: "1",
    name: "Mayo Clinic Cardiology Department",
    phone: "+1-507-284-2111",
    address: "200 First St SW, Rochester, MN 55905",
    lat: 44.0225,
    lng: -92.4699
  },
  {
    id: "2", 
    name: "Cleveland Clinic Heart Center",
    phone: "+1-216-444-2200",
    address: "9500 Euclid Ave, Cleveland, OH 44195",
    lat: 41.5033,
    lng: -81.6208
  },
  {
    id: "3",
    name: "Johns Hopkins Heart Center",
    phone: "+1-410-955-5000", 
    address: "1800 Orleans St, Baltimore, MD 21287",
    lat: 39.2969,
    lng: -76.5934
  },
  
  // Regional Hospitals - New York Area
  {
    id: "4",
    name: "NewYork-Presbyterian Heart Hospital",
    phone: "+1-212-305-2500",
    address: "622 W 168th St, New York, NY 10032",
    lat: 40.8424,
    lng: -73.9441
  },
  {
    id: "5",
    name: "Mount Sinai Heart Center",
    phone: "+1-212-241-6500",
    address: "1 Gustave L. Levy Pl, New York, NY 10029",
    lat: 40.7904,
    lng: -73.9534
  },
  {
    id: "6",
    name: "NYU Langone Heart Center", 
    phone: "+1-212-263-5656",
    address: "550 1st Ave, New York, NY 10016",
    lat: 40.7424,
    lng: -73.9759
  },
  
  // California Hospitals
  {
    id: "7",
    name: "Cedars-Sinai Heart Institute",
    phone: "+1-310-423-3277",
    address: "8700 Beverly Blvd, Los Angeles, CA 90048", 
    lat: 34.0759,
    lng: -118.3772
  },
  {
    id: "8",
    name: "Stanford Heart Center",
    phone: "+1-650-723-4000",
    address: "300 Pasteur Dr, Stanford, CA 94305",
    lat: 37.4316,
    lng: -122.1716
  },
  {
    id: "9",
    name: "UCSF Heart Center",
    phone: "+1-415-476-1000",
    address: "505 Parnassus Ave, San Francisco, CA 94143",
    lat: 37.7627,
    lng: -122.4581
  },
  
  // Texas Hospitals
  {
    id: "10",
    name: "Houston Methodist Heart Center", 
    phone: "+1-713-790-3311",
    address: "6565 Fannin St, Houston, TX 77030",
    lat: 29.7097,
    lng: -95.3968
  },
  {
    id: "11",
    name: "Baylor Scott & White Heart Center",
    phone: "+1-214-820-0111",
    address: "3500 Gaston Ave, Dallas, TX 75246",
    lat: 32.7933,
    lng: -96.7734
  },
  
  // Massachusetts Hospitals
  {
    id: "12",
    name: "Massachusetts General Heart Center",
    phone: "+1-617-726-2000", 
    address: "55 Fruit St, Boston, MA 02114",
    lat: 42.3631,
    lng: -71.0686
  },
  {
    id: "13",
    name: "Brigham and Women's Heart Center",
    phone: "+1-617-732-5500",
    address: "75 Francis St, Boston, MA 02115", 
    lat: 42.3358,
    lng: -71.1063
  },
  
  // Florida Hospitals
  {
    id: "14",
    name: "Miami Heart Institute",
    phone: "+1-305-674-2121",
    address: "4300 Alton Rd, Miami Beach, FL 33140",
    lat: 25.8067,
    lng: -80.1419
  },
  {
    id: "15",
    name: "Tampa General Heart Institute",
    phone: "+1-813-844-7000",
    address: "1 Tampa General Cir, Tampa, FL 33606",
    lat: 27.9443,
    lng: -82.4663
  },
  
  // Illinois Hospitals
  {
    id: "16",
    name: "Northwestern Memorial Heart Center",
    phone: "+1-312-926-2000",
    address: "251 E Huron St, Chicago, IL 60611",
    lat: 41.8955,
    lng: -87.6214
  },
  {
    id: "17",
    name: "University of Chicago Heart Center",
    phone: "+1-773-702-1000", 
    address: "5841 S Maryland Ave, Chicago, IL 60637",
    lat: 41.7886,
    lng: -87.6017
  },
  
  // Georgia Hospitals
  {
    id: "18",
    name: "Emory Heart Center",
    phone: "+1-404-778-5000",
    address: "1364 Clifton Rd NE, Atlanta, GA 30322",
    lat: 33.7892,
    lng: -84.3225
  },
  
  // Washington Hospitals  
  {
    id: "19",
    name: "University of Washington Heart Center",
    phone: "+1-206-598-3300",
    address: "1959 NE Pacific St, Seattle, WA 98195",
    lat: 47.6506,
    lng: -122.3053
  },
  
  // Pennsylvania Hospitals
  {
    id: "20",
    name: "Hospital of University of Pennsylvania Heart Center",
    phone: "+1-215-662-4000",
    address: "3400 Spruce St, Philadelphia, PA 19104",
    lat: 39.9496,
    lng: -75.1914
  }
];

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
  const [nearestHospitals, setNearestHospitals] = useState<HeartHospital[]>([]);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  
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

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const findNearestHospitals = (userLat: number, userLng: number) => {
    setIsLoadingHospitals(true);
    
    // Calculate distances and filter hospitals within 100km
    const hospitalsWithDistance = heartHospitals.map(hospital => ({
      ...hospital,
      distance: calculateDistance(userLat, userLng, hospital.lat, hospital.lng)
    })).filter(hospital => hospital.distance <= 100) // Only show hospitals within 100km
      .sort((a, b) => a.distance - b.distance);
    
    // Get top 3 nearest hospitals within 100km
    const nearestThree = hospitalsWithDistance.slice(0, 3);
    setNearestHospitals(nearestThree);
    setIsLoadingHospitals(false);
    
    if (nearestThree.length > 0) {
      toast({
        title: "Nearest Cardiologists Found",
        description: `Found ${nearestThree.length} cardiologist hospitals within 100km`,
      });
    } else {
      toast({
        title: "No Nearby Cardiologists",
        description: "No cardiologist hospitals found within 100km. Call 911 for emergency care.",
        variant: "destructive",
      });
    }
  };

  const getLocationAndHospitals = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(userLocation);
          findNearestHospitals(userLocation.lat, userLocation.lng);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
    }
  };

  const initiateEmergency = () => {
    setIsEmergency(true);
    setCountdown(10);
    getLocationAndHospitals();
    
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

        {/* Nearest Cardiologist Hospitals Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Hospital className="h-4 w-4 text-heart-red" />
              Nearest Cardiologist Hospitals
            </h4>
            <Button 
              onClick={getLocationAndHospitals}
              disabled={isLoadingHospitals}
              variant="outline" 
              size="sm"
            >
              {isLoadingHospitals ? "Finding..." : "Find Cardiologists"}
            </Button>
          </div>
          
          {isLoadingHospitals && (
            <div className="text-center py-4">
              <p className="text-sm text-medical-gray-dark">Searching for nearby cardiologist hospitals...</p>
            </div>
          )}
          
          {nearestHospitals.length > 0 && (
            <div className="space-y-3">
              {nearestHospitals.map((hospital) => (
                <div key={hospital.id} className="p-3 bg-heart-red/5 rounded-lg border border-heart-red/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-heart-red">{hospital.name}</p>
                      <p className="text-xs text-medical-gray-dark mb-2">{hospital.address}</p>
                      {hospital.distance && (
                        <p className="text-xs text-medical-green font-medium">
                          📍 {hospital.distance.toFixed(1)} km away
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <a 
                        href={`tel:${hospital.phone}`}
                        className="inline-flex items-center gap-1 text-sm font-mono text-heart-red hover:text-heart-red/80 transition-colors"
                      >
                        <Phone className="h-3 w-3" />
                        {hospital.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {nearestHospitals.length === 0 && !isLoadingHospitals && (
            <div className="text-center py-6">
              <Hospital className="h-8 w-8 text-medical-gray mx-auto mb-2" />
              <p className="text-sm text-medical-gray-dark">
                Click "Find Cardiologists" to locate nearby cardiologist hospitals with emergency contact numbers.
              </p>
            </div>
          )}
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