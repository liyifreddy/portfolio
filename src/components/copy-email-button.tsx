"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Copy } from "lucide-react";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "your.email@example.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      onClick={copyToClipboard} 
      size="icon" 
      variant="outline" 
      className="rounded-full bg-black text-white hover:bg-gray-800 relative"
    >
      {copied ? <Copy className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
      {copied && (
        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </Button>
  );
}