"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, Users } from "lucide-react";

interface VisitorData {
  total: number;
  unique: number;
  success: boolean;
}

// Generate a unique visitor ID and store it in localStorage
const getVisitorId = (): string => {
  if (typeof window === "undefined") return "";

  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
};

// Track visitor visit
const trackVisit = async (visitorId: string): Promise<VisitorData> => {
  const response = await fetch("/api/visitors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId }),
  });

  if (!response.ok) {
    throw new Error("Failed to track visit");
  }

  return response.json();
};

// Fetch visitor count
const fetchVisitorCount = async (): Promise<VisitorData> => {
  const response = await fetch("/api/visitors");

  if (!response.ok) {
    throw new Error("Failed to fetch visitor count");
  }

  return response.json();
};

export function TotalVisitors() {
  const [hasTracked, setHasTracked] = useState(false);

  // Track the visit once on mount
  useEffect(() => {
    if (!hasTracked) {
      const visitorId = getVisitorId();
      if (visitorId) {
        trackVisit(visitorId)
          .then(() => setHasTracked(true))
          .catch(console.error);
      }
    }
  }, [hasTracked]);

  // Fetch visitor count with live updates (every 5 seconds)
  const { data, isLoading, error } = useQuery<VisitorData>({
    queryKey: ["visitorCount"],
    queryFn: fetchVisitorCount,
    refetchInterval: 5000, // Refetch every 5 seconds for live count
    enabled: hasTracked, // Only start polling after tracking the visit
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 animate-pulse" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 group">
        <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span className="font-medium">
          <span className="text-foreground tabular-nums">
            {data?.total.toLocaleString() || 0}
          </span>{" "}
          Total Visits
        </span>
      </div>
      <div className="flex items-center gap-2 group">
        <div className="relative">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
        <Users className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span className="font-medium">
          <span className="text-foreground tabular-nums">
            {data?.unique.toLocaleString() || 0}
          </span>{" "}
          Unique Visitors
        </span>
      </div>
    </div>
  );
}
