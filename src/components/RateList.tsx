
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RateList = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">Rate List</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">Our Rate List</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <img 
            src="https://github.com/Majidali1980/lmages/blob/main/TAYABA%20MAJID%20(1).png?raw=true" 
            alt="Rate List"
            className="w-full h-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RateList;
