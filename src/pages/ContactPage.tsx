
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible!",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] py-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg">
              Have questions or need assistance? We're here to help!
            </p>
          </div>
        </div>
        
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full filter blur-3xl"></div>
        </div>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-semibold heading-fancy mb-6">Get in Touch</h2>
              <div className="w-24 h-1 bg-brand-gold mb-6"></div>
              
              <p className="text-gray-600 mb-8">
                Whether you have a question about our products, custom stitching services, 
                or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Our Location</h3>
                    <p className="text-gray-600 mt-1">Mahmoodabad No 04 Karachi, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-brand-pink" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Phone Number</h3>
                    <p className="text-gray-600 mt-1">+92 307 0125273</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email Address</h3>
                    <p className="text-gray-600 mt-1">info@matailor.com</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-medium mb-3">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name">
                        Your Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="message">
                      Your Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-brand-gold hover:bg-brand-gold/90 w-full sm:w-auto"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="py-10">
        <div className="container">
          <div className="aspect-[21/9] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14473.362775752683!2d67.0591335!3d24.8826142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e70a31f45d5%3A0x2e16efc984569caa!2sMahmoodabad%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1650182345678!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MA Tailor Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
