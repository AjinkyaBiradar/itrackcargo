"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Package,
  Truck,
  TrendingUp,
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Plus,
  ShieldCheck,
  Zap,
  Filter,
  ArrowUpRight,
  Globe,
  SlidersHorizontal,
  X,
  Send,
  AlertTriangle,
  Plane,
  Radio,
  Cpu,
  Thermometer
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { PackageMotif } from "@/components/common/PackageMotif";

interface UserSession {
  name: string;
  email: string;
  company?: string;
}

interface ManifestItem {
  id: string;
  trackingCode: string;
  carrier: string;
  route: string;
  status: "Delivered" | "Out for Delivery" | "In Transit" | "Rerouted" | "Exception";
  eta: string;
  temp: string;
  gpsCode: string;
  vehicleType?: string;
}

const INITIAL_MANIFESTS: ManifestItem[] = [
  {
    id: "1",
    trackingCode: "TRK-MH-89240-IN",
    carrier: "Delhivery Express Air",
    route: "Mumbai (JNPT) → Delhi NCR (NH-48)",
    status: "Out for Delivery",
    eta: "14 mins",
    temp: "+4.2°C",
    gpsCode: "AIS140-MH-8849",
    vehicleType: "BharatBenz 14-Wheeler",
  },
  {
    id: "2",
    trackingCode: "DL-99201-IN",
    carrier: "Blue Dart Air Cargo",
    route: "Bengaluru → Chennai (NH-44)",
    status: "In Transit",
    eta: "04h 20m",
    temp: "+2.8°C",
    gpsCode: "AIS140-DL-9921",
    vehicleType: "Tata Ace Gold Mini Truck",
  },
  {
    id: "3",
    trackingCode: "FLEET-MH-804",
    carrier: "Safexpress Fleet #804",
    route: "Pune → Mumbai Expressway",
    status: "Rerouted",
    eta: "Saved 28m",
    temp: "+5.0°C",
    gpsCode: "OBD-IND-4820",
    vehicleType: "Eicher LCV Truck",
  },
  {
    id: "4",
    trackingCode: "UPS-KA-44102",
    carrier: "Mahindra Logistics",
    route: "Hyderabad → Bengaluru Hub",
    status: "Delivered",
    eta: "Just now",
    temp: "+3.9°C",
    gpsCode: "AIS140-KA-1092",
    vehicleType: "Mahindra Treo EV Auto",
  },
  {
    id: "5",
    trackingCode: "EXP-TS-99042",
    carrier: "VRL Logistics Express",
    route: "Kolkata → Ahmedabad Hub",
    status: "Exception",
    eta: "Toll Hold",
    temp: "+4.1°C",
    gpsCode: "AIS140-TS-7741",
    vehicleType: "Cold-Chain Reefer Van",
  },
];

const ANALYTICS_DATA = [
  { time: "00:00", volume: 4200, sla: 99.4 },
  { time: "04:00", volume: 11300, sla: 99.6 },
  { time: "08:00", volume: 24800, sla: 99.8 },
  { time: "12:00", volume: 38200, sla: 99.7 },
  { time: "16:00", volume: 48490, sla: 99.9 },
  { time: "20:00", volume: 41100, sla: 99.8 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"manifest" | "map" | "analytics" | "new" | "addGps">("manifest");

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Manifest Data State
  const [manifests, setManifests] = useState<ManifestItem[]>(INITIAL_MANIFESTS);

  // New Manifest Form State
  const [newCarrier, setNewCarrier] = useState("Delhivery Express Air");
  const [newOrigin, setNewOrigin] = useState("Mumbai JNPT Port Hub");
  const [newDestination, setNewDestination] = useState("Delhi NCR Okhla Depot");

  // Add Vehicle by GPS Code Form State
  const [gpsCodeInput, setGpsCodeInput] = useState("AIS140-MH-99201");
  const [vehicleRegNo, setVehicleRegNo] = useState("MH-02-DN-4820");
  const [gpsVehicleType, setGpsVehicleType] = useState("BharatBenz 14-Wheeler Heavy Truck");
  const [gpsCarrier, setGpsCarrier] = useState("Delhivery Express Air");
  const [gpsRouteOrigin, setGpsRouteOrigin] = useState("Bhiwandi Hub, Mumbai");
  const [gpsRouteDest, setGpsRouteDest] = useState("Okhla Sorting Center, Delhi");

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Read exact user details submitted in login or signup form
      const localUserData = localStorage.getItem("ilogitrack_user");
      if (localUserData) {
        try {
          const parsed = JSON.parse(localUserData);
          if (parsed && (parsed.name || parsed.email)) {
            setUser({
              name: parsed.name || (parsed.email ? parsed.email.split("@")[0] : "Ajinkya Biradar"),
              email: parsed.email || "ajinkya@apexlogistics.in",
              company: parsed.company || "Apex Logistics India Fleet",
            });
            setLoading(false);
            return;
          }
        } catch (e) {}
      }

      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setUser(data.user);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // Fallback
      }

      const token = localStorage.getItem("ilogitrack_jwt");
      if (token) {
        setUser({
          name: "Ajinkya Biradar",
          email: "ajinkya@apexlogistics.in",
          company: "Apex Logistics India Fleet",
        });
      } else {
        router.push("/login");
        toast.error("Please sign in to access the dashboard.");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ilogitrack_jwt");
    localStorage.removeItem("ilogitrack_user");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    toast.success("Logged out successfully.");
    router.push("/");
  };

  // Add Vehicle by GPS Code Handler
  const handleAddVehicleByGpsCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gpsCodeInput.trim() || !vehicleRegNo.trim()) {
      toast.error("Please provide valid GPS Device Code and Vehicle Reg Number.");
      return;
    }

    const newCode = `TRK-${vehicleRegNo.toUpperCase().replace(/\s+/g, "")}`;
    const newItem: ManifestItem = {
      id: Date.now().toString(),
      trackingCode: newCode,
      carrier: gpsCarrier,
      route: `${gpsRouteOrigin} → ${gpsRouteDest}`,
      status: "In Transit",
      eta: "AIS-140 Live Ping",
      temp: "+3.8°C",
      gpsCode: gpsCodeInput.toUpperCase(),
      vehicleType: gpsVehicleType,
    };

    setManifests([newItem, ...manifests]);
    toast.success(`Vehicle ${vehicleRegNo} linked to GPS Device ${gpsCodeInput.toUpperCase()} successfully!`);
    setActiveTab("manifest");
  };

  const handleCreateManifest = (e: React.FormEvent) => {
    e.preventDefault();
    const stateCodes = ["MH", "DL", "KA", "TS", "GJ"];
    const randState = stateCodes[Math.floor(Math.random() * stateCodes.length)];
    const newCode = `TRK-${randState}-${Math.floor(10000 + Math.random() * 90000)}-IN`;
    const newItem: ManifestItem = {
      id: Date.now().toString(),
      trackingCode: newCode,
      carrier: newCarrier,
      route: `${newOrigin} → ${newDestination}`,
      status: "In Transit",
      eta: "18h 45m",
      temp: "+4.0°C",
      gpsCode: `AIS140-${randState}-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleType: "Commercial LCV Fleet",
    };

    setManifests([newItem, ...manifests]);
    toast.success(`Indian Manifest ${newCode} created successfully!`);
    setActiveTab("manifest");
  };

  const filteredManifests = manifests.filter((m) => {
    const matchesSearch =
      m.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.gpsCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#101010] text-[#D6FF3D] flex items-center justify-center animate-bounce shadow-md">
            <Package className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-[#666] font-semibold animate-pulse">
            Loading India Telemetry Command Center...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#101010] flex flex-col selection:bg-[#D6FF3D]">
      {/* Minimalist Top Header */}
      <header className="bg-white border-b border-[#E8E5DC] sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-[#101010] text-[#D6FF3D] flex items-center justify-center shadow-sm group-hover:bg-[#4338FF] group-hover:text-white transition-colors">
            <Package className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#101010] flex items-center gap-1.5 group-hover:text-[#4338FF] transition-colors">
              iLogiTrack India
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-[#666]">
              {user?.company || "Apex Logistics India Fleet"}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6FF3D] text-[#101010] text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            AIS-140 Live Sync: 60Hz
          </span>

          <div className="flex items-center gap-2 pl-3 border-l border-[#E8E5DC]">
            <div className="hidden sm:flex flex-col text-right text-xs">
              <span className="font-bold text-[#101010]">{user?.name}</span>
              <span className="text-[10px] text-[#666] font-mono">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-red-500/10 text-[#666] hover:text-red-600 border border-[#E8E5DC] transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Minimalist Top Metric Cards (India Version) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E8E5DC] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-mono font-semibold text-[#666]">Active GPS Streams</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#101010]">18,490</span>
              <span className="text-xs font-mono text-[#4338FF] font-bold">↑ 14%</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E8E5DC] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-mono font-semibold text-[#666]">On-Time SLA (Pan-India)</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#101010]">99.8%</span>
              <span className="text-[10px] font-mono font-bold bg-[#D6FF3D] text-[#101010] px-2 py-0.5 rounded-full">
                Optimal
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E8E5DC] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-mono font-semibold text-[#666]">AI Route Savings</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#101010]">₹4.2 Cr</span>
              <span className="text-xs font-mono text-[#4338FF]">Saved 34k L fuel</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E8E5DC] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-mono font-semibold text-[#666]">Toll / Exception Holds</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-red-600">12</span>
              <span className="text-xs font-mono text-red-600 font-bold">Requires Action</span>
            </div>
          </div>
        </div>

        {/* Manageable Minimalist Tab Controls & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#E8E5DC] pb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("manifest")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "manifest"
                  ? "bg-[#101010] text-[#D6FF3D] shadow-sm"
                  : "bg-white text-[#666] border border-[#E8E5DC] hover:text-[#101010]"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Live Manifest ({manifests.length})
            </button>

            <button
              onClick={() => setActiveTab("map")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "map"
                  ? "bg-[#101010] text-[#D6FF3D] shadow-sm"
                  : "bg-white text-[#666] border border-[#E8E5DC] hover:text-[#101010]"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Fleet Map Telemetry
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "analytics"
                  ? "bg-[#101010] text-[#D6FF3D] shadow-sm"
                  : "bg-white text-[#666] border border-[#E8E5DC] hover:text-[#101010]"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Carrier SLAs & Analytics
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Primary Action Button: Add Vehicle by GPS Code */}
            <button
              onClick={() => setActiveTab("addGps")}
              className="px-4 py-2.5 rounded-xl bg-[#101010] hover:bg-[#4338FF] text-[#D6FF3D] hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
            >
              <Radio className="w-4 h-4 text-[#D6FF3D]" />
              + Add Vehicle by GPS Code
            </button>

            <button
              onClick={() => setActiveTab("new")}
              className="px-4 py-2.5 rounded-xl bg-[#4338FF] hover:bg-[#3228D9] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              New Manifest
            </button>
          </div>
        </div>

        {/* TAB 1: Live Telemetry Manifest Table */}
        {activeTab === "manifest" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-[#E8E5DC] shadow-xs space-y-4"
          >
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by code, GPS serial, carrier, or city route..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-medium text-[#101010] focus:outline-none focus:border-[#4338FF]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-[#666] shrink-0" />
                {["All", "Out for Delivery", "In Transit", "Rerouted", "Exception"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === st
                        ? "bg-[#4338FF] text-white"
                        : "bg-[#FAF9F5] text-[#666] hover:text-[#101010]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Manifest Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E5DC] text-[10px] font-mono font-bold text-[#666] uppercase">
                    <th className="py-3 px-4">Tracking Code</th>
                    <th className="py-3 px-4">GPS Device Serial</th>
                    <th className="py-3 px-4">Carrier Integration</th>
                    <th className="py-3 px-4">Route Manifest</th>
                    <th className="py-3 px-4">Sensor Temp</th>
                    <th className="py-3 px-4">Live Status</th>
                    <th className="py-3 px-4 text-right">ETA</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-[#101010] divide-y divide-[#E8E5DC]/60">
                  {filteredManifests.map((m) => (
                    <tr key={m.id} className="hover:bg-[#FAF9F5]/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#4338FF]">
                        {m.trackingCode}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-[#101010]">
                        <span className="inline-flex items-center gap-1 bg-[#FAF9F5] px-2 py-0.5 rounded-md border border-[#E8E5DC]">
                          <Cpu className="w-3 h-3 text-[#4338FF]" />
                          {m.gpsCode}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#101010]">
                        {m.carrier}
                      </td>
                      <td className="py-3.5 px-4 text-[#666]">{m.route}</td>
                      <td className="py-3.5 px-4 font-mono text-xs">{m.temp}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            m.status === "Delivered"
                              ? "bg-green-500/10 text-green-700 border border-green-500/20"
                              : m.status === "Out for Delivery"
                              ? "bg-[#D6FF3D] text-[#101010]"
                              : m.status === "Rerouted"
                              ? "bg-[#101010] text-[#D6FF3D]"
                              : m.status === "Exception"
                              ? "bg-red-500/10 text-red-600 border border-red-500/20"
                              : "bg-[#4338FF]/10 text-[#4338FF]"
                          }`}
                        >
                          {m.status === "Delivered" && <CheckCircle2 className="w-3 h-3" />}
                          {m.status === "Exception" && <AlertTriangle className="w-3 h-3 text-red-600" />}
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold">{m.eta}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => toast.info(`Viewing live AIS-140 GPS ping for ${m.gpsCode} (${m.trackingCode})`)}
                          className="text-[11px] font-bold text-[#4338FF] hover:underline"
                        >
                          View Live GPS →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB: Add Vehicle by GPS Code */}
        {activeTab === "addGps" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-[#E8E5DC] shadow-xs max-w-xl mx-auto space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#101010] flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-600" />
                Add Vehicle by GPS Device Code
              </h3>
              <p className="text-xs text-[#666]">
                Link an AIS-140 or OBD-II GPS Tracker code directly to a vehicle in your fleet dashboard.
              </p>
            </div>

            <form onSubmit={handleAddVehicleByGpsCode} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase text-[#101010]">
                  GPS Device Serial / IMEI Code *
                </label>
                <div className="relative">
                  <Cpu className="w-4 h-4 text-[#4338FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={gpsCodeInput}
                    onChange={(e) => setGpsCodeInput(e.target.value)}
                    placeholder="e.g. AIS140-MH-99201"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-mono font-bold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase text-[#101010]">
                  Vehicle Registration Number (India RTO) *
                </label>
                <input
                  type="text"
                  value={vehicleRegNo}
                  onChange={(e) => setVehicleRegNo(e.target.value)}
                  placeholder="e.g. MH-02-DN-4820"
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-mono font-bold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase text-[#101010]">
                  Vehicle Type / Category
                </label>
                <select
                  value={gpsVehicleType}
                  onChange={(e) => setGpsVehicleType(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                >
                  <option value="BharatBenz 14-Wheeler Heavy Truck">BharatBenz 14-Wheeler Heavy Truck</option>
                  <option value="Tata Ace Gold Mini Truck">Tata Ace Gold Mini Truck</option>
                  <option value="Mahindra Treo EV Auto Courier">Mahindra Treo EV Auto Courier</option>
                  <option value="Cold-Chain Refrigerated Van">Cold-Chain Refrigerated Van</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase text-[#101010]">
                  Carrier / Fleet Company
                </label>
                <select
                  value={gpsCarrier}
                  onChange={(e) => setGpsCarrier(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                >
                  <option value="Delhivery Express Air">Delhivery Express Air</option>
                  <option value="Blue Dart Air Cargo">Blue Dart Air Cargo</option>
                  <option value="Safexpress Freight">Safexpress Freight</option>
                  <option value="Mahindra Logistics">Mahindra Logistics</option>
                  <option value="VRL Logistics">VRL Logistics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase text-[#101010]">Origin City</label>
                  <input
                    type="text"
                    value={gpsRouteOrigin}
                    onChange={(e) => setGpsRouteOrigin(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold uppercase text-[#101010]">Destination City</label>
                  <input
                    type="text"
                    value={gpsRouteDest}
                    onChange={(e) => setGpsRouteDest(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("manifest")}
                  className="flex-1 py-3 bg-[#FAF9F5] text-[#666] border border-[#E8E5DC] font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4" />
                  <span>Link & Track Vehicle</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 2: Fleet Map Telemetry */}
        {activeTab === "map" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#101010] text-white rounded-2xl p-6 border border-white/10 shadow-lg space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D6FF3D]" />
                  India Fleet AIS-140 GPS Telemetry Map
                </h3>
                <p className="text-xs text-white/60">Live vehicle coordinates and airport hub streams</p>
              </div>
              <span className="text-xs font-mono bg-white/10 text-[#D6FF3D] px-3 py-1 rounded-full">
                5 Indian Hubs Active
              </span>
            </div>

            {/* Signature Package Route Motif */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <PackageMotif width={800} height={100} variant="curved" />
            </div>

            {/* Hub Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-[#D6FF3D] uppercase">HUB 01 — BOM</span>
                <p className="text-sm font-bold text-white">JNPT Port Logistics Hub (Mumbai)</p>
                <p className="text-xs text-white/60">4,280 parcels processed / hr</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-[#D6FF3D] uppercase">HUB 02 — DEL</span>
                <p className="text-sm font-bold text-white">IGI Airport Cargo Hub (New Delhi)</p>
                <p className="text-xs text-white/60">6,120 parcels processed / hr</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-[#D6FF3D] uppercase">HUB 03 — BLR</span>
                <p className="text-sm font-bold text-white">Electronic City Logistics Belt (Bengaluru)</p>
                <p className="text-xs text-white/60">3,940 parcels processed / hr</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: Carrier SLAs & Analytics */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-[#E8E5DC] shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#101010]">Hourly Pan-India Parcel Throughput & SLA Accuracy</h3>
                <p className="text-xs text-[#666]">24-Hour window Indian carrier performance breakdown</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#4338FF] bg-[#4338FF]/10 px-3 py-1 rounded-full">
                SLA Guarantee: 99.8%
              </span>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ANALYTICS_DATA}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4338FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4338FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E5DC" />
                  <XAxis dataKey="time" stroke="#666" fontSize={11} />
                  <YAxis stroke="#666" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#101010",
                      borderColor: "rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#4338FF"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorVol)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* TAB 4: New Manifest Form */}
        {activeTab === "new" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-[#E8E5DC] shadow-xs max-w-xl mx-auto space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#101010]">Manifest New Indian Parcel</h3>
              <p className="text-xs text-[#666]">Create a live tracking telemetry stream and assign carrier</p>
            </div>

            <form onSubmit={handleCreateManifest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase text-[#101010]">
                  Select Carrier Integration
                </label>
                <select
                  value={newCarrier}
                  onChange={(e) => setNewCarrier(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                >
                  <option>Delhivery Express Air</option>
                  <option>Blue Dart Air Cargo</option>
                  <option>Safexpress Freight</option>
                  <option>Mahindra Logistics</option>
                  <option>VRL Logistics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase text-[#101010]">
                  Origin Hub / Warehouse
                </label>
                <input
                  type="text"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold uppercase text-[#101010]">
                  Destination Address / Hub
                </label>
                <input
                  type="text"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("manifest")}
                  className="flex-1 py-3 bg-[#FAF9F5] text-[#666] border border-[#E8E5DC] font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#4338FF] text-white font-bold rounded-xl text-xs shadow-md hover:bg-[#3228D9] transition-colors cursor-pointer"
                >
                  Create Indian Manifest
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
}
