
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DesignTrackerProps {
  designId: string | null;
  onDesignIdChange: (id: string) => void;
}

const DesignTracker: React.FC<DesignTrackerProps> = ({ designId, onDesignIdChange }) => {
  const [inputDesignId, setInputDesignId] = React.useState(designId || '');
  const [notes, setNotes] = React.useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputDesignId.trim()) {
      onDesignIdChange(inputDesignId.trim());
      toast({
        title: "Design Updated",
        description: `Design #${inputDesignId} has been selected for your order`,
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Design Tracking</CardTitle>
        <CardDescription>
          Enter your design number for tracking or reference
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <Input 
              value={inputDesignId} 
              onChange={(e) => setInputDesignId(e.target.value)} 
              placeholder="Enter design #" 
            />
          </div>
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Track
          </Button>
        </form>
        
        {designId && (
          <div className="mt-4 p-2 bg-brand-gold/10 border border-brand-gold rounded text-center">
            <p className="text-brand-gold font-medium">Design #{designId} is currently selected</p>
            <p className="text-xs text-gray-500 mt-1">This design ID will be included with your order</p>
          </div>
        )}
        
        <div className="mt-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
          <Textarea
            id="notes"
            placeholder="Add any special instructions or notes for your design"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-24"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignTracker;
