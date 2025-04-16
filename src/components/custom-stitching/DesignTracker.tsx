
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface DesignTrackerProps {
  designId: string | null;
  onDesignIdChange: (id: string) => void;
}

const DesignTracker: React.FC<DesignTrackerProps> = ({ designId, onDesignIdChange }) => {
  const [inputDesignId, setInputDesignId] = React.useState(designId || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputDesignId.trim()) {
      onDesignIdChange(inputDesignId.trim());
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DesignTracker;
