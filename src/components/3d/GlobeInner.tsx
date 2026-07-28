"use client";

import React, { useEffect, useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

// Sample Hub Cities
const HUBS = [
  { name: "New York", lat: 40.7128, lng: -74.006, color: "#D6FF3D", size: 0.8 },
  { name: "London", lat: 51.5074, lng: -0.1278, color: "#4338FF", size: 0.9 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821, color: "#D6FF3D", size: 0.7 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#4338FF", size: 0.9 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, color: "#D6FF3D", size: 0.8 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, color: "#4338FF", size: 0.7 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, color: "#D6FF3D", size: 0.8 },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333, color: "#4338FF", size: 0.7 },
];

// Live Shipments Arcs between Hubs
const ARCS_DATA = [
  { startLat: 40.7128, startLng: -74.006, endLat: 51.5074, endLng: -0.1278, color: ["#4338FF", "#D6FF3D"] },
  { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503, color: ["#D6FF3D", "#4338FF"] },
  { startLat: 35.6762, startLng: 139.6503, endLat: 1.3521, endLng: 103.8198, color: ["#4338FF", "#D6FF3D"] },
  { startLat: 50.1109, startLng: 8.6821, endLat: 25.2048, endLng: 55.2708, color: ["#D6FF3D", "#4338FF"] },
  { startLat: 25.2048, startLng: 55.2708, endLat: -33.8688, endLng: 151.2093, color: ["#4338FF", "#D6FF3D"] },
  { startLat: 40.7128, startLng: -74.006, endLat: -23.5505, endLng: -46.6333, color: ["#D6FF3D", "#4338FF"] },
];

export default function GlobeInner() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    if (globeRef.current) {
      // Configure initial point of view and auto-rotate controls
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        controls.enableZoom = false;
      }
      globeRef.current.pointOfView({ lat: 25, lng: 15, altitude: 2.2 }, 1000);
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-auto">
      <Globe
        ref={globeRef}
        width={720}
        height={720}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#4338FF"
        atmosphereAltitude={0.2}
        // Points / Hubs
        pointsData={HUBS}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.02}
        // Arcs
        arcsData={ARCS_DATA}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcStroke={1.2}
        arcAltitude={0.22}
      />
    </div>
  );
}
