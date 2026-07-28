"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  Truck,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Radio,
  Cpu,
  CheckCircle2,
  Navigation,
  Thermometer
} from "lucide-react";
import { PackageMotif } from "@/components/common/PackageMotif";

const ANALYTICS_DATA = [
  { time: "06:00 AM", volume: 4200, onTime: 99.2 },
  { time: "09:00 AM", volume: 11400, onTime: 99.5 },
  { time: "12:00 PM", volume: 22800, onTime: 99.8 },
  { time: "03:00 PM", volume: 34200, onTime: 99.4 },
  { time: "06:00 PM", volume: 41500, onTime: 99.7 },
  { time: "09:00 PM", volume: 48920, onTime: 99.9 },
];

// India GPS Fleet Vehicles
const GPS_FLEET_VEHICLES = [
  {
    id: "IND-GPS-01",
    name: "BharatBenz 14-Wheeler Truck",
    regNo: "MH-04-JK-9912",
    gpsDevice: "AIS-140 Hardwired GPS + Dual CAN-Bus",
    route: "Mumbai (JNPT) ➔ Delhi NCR (NH-48)",
    speed: "64 km/h",
    status: "On Interstate Highway",
    statusColor: "bg-emerald-500",
    icon: Truck,
    details: "AIS-140 Certified 4G GPS • 18 Satellites • Fuel & Axle Sensor Active",
  },
  {
    id: "IND-GPS-02",
    name: "Tata Ace Gold Mini Truck",
    regNo: "KA-03-HA-4820",
    gpsDevice: "AIS-140 OBD-II Plug & Play GPS Tracker",
    route: "Electronic City ➔ Indiranagar (Bengaluru)",
    speed: "32 km/h",
    status: "Out for Delivery",
    statusColor: "bg-[#D6FF3D] text-[#101010]",
    icon: Truck,
    details: "Plug-and-Play OBD GPS • Real-time Speed & Idle Time Monitor",
  },
  {
    id: "IND-GPS-03",
    name: "Mahindra Treo EV Auto Courier",
    regNo: "DL-11-CA-1029",
    gpsDevice: "AIS-140 Compact EV Telematics Tracker",
    route: "Connaught Place ➔ Noida Hub (Delhi NCR)",
    speed: "24 km/h",
    status: "Eco EV Active (88% Bat)",
    statusColor: "bg-emerald-500",
    icon: Zap,
    details: "EV Battery Telematics + GPS • Zero Emission Last-Mile Delivery",
  },
  {
    id: "IND-GPS-04",
    name: "Ashok Leyland Cold-Chain Reefer",
    regNo: "TS-09-EX-7721",
    gpsDevice: "AIS-140 GPS + Wireless IoT Temp Sensor",
    route: "Hyderabad Bio-Hub ➔ Chennai Central",
    speed: "58 km/h",
    status: "Temp: 3.6°C Nominal",
    statusColor: "bg-cyan-400 text-[#101010]",
    icon: Thermometer,
    details: "IoT Thermal & Humidity Probe • Continuous Cold-Chain Alert",
  },
];

export function LiveShowcase() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardParallax1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const cardParallax2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const [selectedDeviceFilter, setSelectedDeviceFilter] = useState("All AIS-140 GPS Devices");

  return (
    <section
      id="live-showcase"
      ref={containerRef}
      className="py-24 bg-[#FAF9F5] relative overflow-hidden border-t border-[#E8E5DC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101010] text-[#D6FF3D] text-xs font-mono font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> India Telemetry Command Center
          </span>
          <h2 className="section-title text-[#101010]">
            Track your Indian fleet live with AIS-140 GPS devices.
          </h2>
          <p className="text-lg text-[#666] leading-relaxed">
            Real-time GPS tracking across 500+ Indian cities. Monitor commercial trucks, EV autos, and cold-chain reefers with certified AIS-140 GPS telemetry hardware.
          </p>
        </div>

        {/* Dashboard Frame Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Parallax Floating Badge Left */}
          <motion.div
            style={{ y: cardParallax1 }}
            className="absolute -top-8 -left-4 lg:-left-12 z-20 hidden md:block"
            data-cursor="India SLA"
          >
            <div className="glass-card rounded-[20px] p-4 shadow-[0_20px_40px_rgba(67,56,255,0.15)] border border-[#4338FF]/20 max-w-[230px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4338FF] text-white flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#666]">Avg SLA Speed</span>
                  <p className="text-sm font-bold text-[#101010]">2.1 Days Pan-India</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">NH-48 Express Corridor</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Parallax Floating Badge Right */}
          <motion.div
            style={{ y: cardParallax2 }}
            className="absolute -bottom-8 -right-4 lg:-right-10 z-20 hidden md:block"
            data-cursor="AIS-140 GPS"
          >
            <div className="glass-card rounded-[20px] p-4 shadow-[0_24px_48px_rgba(16,16,16,0.12)] border border-white/80 max-w-[250px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#4338FF] bg-[#4338FF]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> AIS-140 GPS Reroute
                </span>
                <span className="text-[10px] text-[#666]">Just now</span>
              </div>
              <p className="text-xs font-bold text-[#101010]">Truck #MH-04-JK-9912 redirected</p>
              <p className="text-[11px] text-[#666] mt-1">Bypassed Mumbai-Pune toll traffic (Saved 24 min)</p>
            </div>
          </motion.div>

          {/* Main Command Center Device Frame */}
          <div className="bg-[#101010] rounded-[32px] p-4 sm:p-6 lg:p-8 shadow-[0_32px_64px_rgba(16,16,16,0.22)] border border-white/10 relative z-10 text-white">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-sm font-mono text-white/60 font-semibold border-l border-white/15 pl-3">
                  India Telemetry Console • AIS-140 GPS Network v4.2
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="flex items-center gap-2 text-xs font-mono bg-white/10 px-3 py-1.5 rounded-full text-[#D6FF3D]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  AIS-140 Live Stream
                </span>
                <button
                  onClick={() => setSelectedDeviceFilter(selectedDeviceFilter.includes("All") ? "AIS-140 OBD Devices" : "All AIS-140 GPS Devices")}
                  className="text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-white/80 transition-colors flex items-center gap-1.5 ml-auto sm:ml-0 cursor-pointer"
                >
                  <Cpu className="w-3 h-3 text-[#D6FF3D]" />
                  {selectedDeviceFilter}
                </button>
              </div>
            </div>

            {/* Metric KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <span className="text-xs font-mono text-white/60">Pan-India Shipments</span>
                <p className="text-2xl font-bold text-white mt-1">48,920</p>
                <span className="text-[11px] text-[#D6FF3D] font-mono mt-1 inline-block">↑ 18% in Mumbai/NCR</span>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <span className="text-xs font-mono text-white/60">On-Time SLA Delivery</span>
                <p className="text-2xl font-bold text-white mt-1">99.4%</p>
                <span className="text-[11px] text-[#D6FF3D] font-mono mt-1 inline-block">Top Indian Fleet SLA</span>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <span className="text-xs font-mono text-white/60">AIS-140 GPS Vehicles</span>
                <p className="text-2xl font-bold text-white mt-1">3,850</p>
                <span className="text-[11px] text-emerald-400 font-mono mt-1 inline-block">All GPS devices connected</span>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <span className="text-xs font-mono text-white/60">Avg Interstate Delay</span>
                <p className="text-2xl font-bold text-[#D6FF3D] mt-1">&lt; 1.8 min</p>
                <span className="text-[11px] text-white/60 font-mono mt-1 inline-block">Highway GPS rerouting</span>
              </div>
            </div>

            {/* GPS Device Fleet Telemetry Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#4338FF]" />
                  Live Vehicles Categorized by GPS Device Hardware
                </h3>
                <span className="text-xs font-mono text-white/50">Updated Every 1 Sec</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GPS_FLEET_VEHICLES.map((vehicle) => {
                  const VIcon = vehicle.icon;
                  return (
                    <div
                      key={vehicle.id}
                      className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-[#4338FF]/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#4338FF]/20 text-[#D6FF3D] flex items-center justify-center font-bold">
                            <VIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">{vehicle.name}</h4>
                            <span className="text-xs font-mono text-emerald-400 font-semibold">{vehicle.regNo}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${vehicle.statusColor}`}>
                          {vehicle.status}
                        </span>
                      </div>

                      {/* GPS Hardware Tag */}
                      <div className="mt-3 bg-black/40 p-2.5 rounded-xl border border-white/10 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between text-white/90">
                          <span className="text-white/60 flex items-center gap-1">
                            <Radio className="w-3 h-3 text-emerald-400" /> GPS Device:
                          </span>
                          <span className="font-bold text-[#D6FF3D]">{vehicle.gpsDevice}</span>
                        </div>
                        <div className="flex items-center justify-between text-white/70">
                          <span className="text-white/50">Active Route:</span>
                          <span>{vehicle.route}</span>
                        </div>
                        <div className="flex items-center justify-between text-white/60 text-[11px] pt-1">
                          <span>Live Speed: {vehicle.speed}</span>
                          <span className="text-emerald-400">{vehicle.details}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recharts Delivery Volume Graph */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#4338FF]" />
                  Hourly Delivery Volume across Indian Express Corridors
                </h4>
                <span className="text-xs font-mono text-white/40">Updated 10s ago</span>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_DATA}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4338FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4338FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#101010",
                        borderColor: "rgba(255,255,255,0.2)",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="#4338FF"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorVolume)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
