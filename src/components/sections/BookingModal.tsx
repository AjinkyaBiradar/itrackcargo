"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Truck,
  Package,
  Plane,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  UserPlus,
  Navigation,
  Sparkles,
  Barcode,
  Clock,
  DollarSign,
  Key,
  Globe,
  Radio,
  FileText,
  Star,
  Download,
  Send,
  RefreshCw,
  SlidersHorizontal,
  Activity,
  Thermometer
} from "lucide-react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: any;
  accent: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepData: StepItem | null;
  onTrackDispatched: (trackingNo: string) => void;
}

export function BookingModal({
  isOpen,
  onClose,
  stepData,
  onTrackDispatched,
}: BookingModalProps) {
  // Step 01 State
  const [apiKey, setApiKey] = useState("pk_live_delhivery_8849201");
  const [connectedCarriers, setConnectedCarriers] = useState<string[]>(["Delhivery", "BlueDart", "Safexpress"]);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiConnectedStatus, setApiConnectedStatus] = useState<string | null>(null);

  // Step 02 State (India Version)
  const [pickup, setPickup] = useState("Bhiwandi Logistics Hub, Mumbai");
  const [destination, setDestination] = useState("Okhla Industrial Area, New Delhi");
  const [selectedVehicle, setSelectedVehicle] = useState<"auto" | "van" | "truck" | "reefer">("truck");
  const [parcelWeight, setParcelWeight] = useState("450");
  const [packageType, setPackageType] = useState("Standard Boxes & Parcels");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);
  const [generatedTrackingNo, setGeneratedTrackingNo] = useState("");

  // Step 03 State
  const [isRerouting, setIsRerouting] = useState(false);
  const [rerouteMsg, setRerouteMsg] = useState("");

  // Step 04 State
  const [rating, setRating] = useState(5);
  const [podDownloaded, setPodDownloaded] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  if (!stepData) return null;

  // Indian Carriers list for Step 01
  const carrierOptions = [
    { name: "Delhivery Express", code: "Delhivery", logo: "📦" },
    { name: "Blue Dart Air", code: "BlueDart", logo: "🔵" },
    { name: "Safexpress Cargo", code: "Safexpress", logo: "🚛" },
    { name: "Mahindra Logistics", code: "Mahindra", logo: "⚡" },
    { name: "VRL Logistics", code: "VRL", logo: "🔴" },
  ];

  const toggleCarrier = (code: string) => {
    if (connectedCarriers.includes(code)) {
      setConnectedCarriers(connectedCarriers.filter((c) => c !== code));
    } else {
      setConnectedCarriers([...connectedCarriers, code]);
    }
  };

  const handleTestApi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingApi(true);
    setApiConnectedStatus(null);
    setTimeout(() => {
      setIsTestingApi(false);
      setApiConnectedStatus("Connected — 14ms Latency (Synced 3,850 Indian AIS-140 GPS Nodes)");
    }, 900);
  };

  // Vehicles for Step 02 Categorized by GPS Device Type (India)
  const vehicleOptions = [
    {
      id: "auto",
      name: "Mahindra Treo EV Auto",
      gpsDevice: "AIS-140 Mini OBD GPS",
      capacity: "Local city parcels < 300 kg",
      eta: "Express Same-Day",
      icon: Zap,
      cost: "₹499",
      co2: "Zero Emission EV",
    },
    {
      id: "van",
      name: "Tata Ace Gold Mini Truck",
      gpsDevice: "AIS-140 GPS + Fuel Sensor",
      capacity: "Intra-city goods < 1,200 kg",
      eta: "Next-Day Ground",
      icon: Truck,
      cost: "₹1,499",
      co2: "Commercial LCV",
    },
    {
      id: "truck",
      name: "BharatBenz 14-Wheeler Truck",
      gpsDevice: "Dual CAN-Bus Telematics GPS",
      capacity: "Interstate heavy < 18,000 kg",
      eta: "2-3 Days Highway (NH-48)",
      icon: Truck,
      cost: "₹8,500",
      co2: "Heavy Freight",
    },
    {
      id: "reefer",
      name: "Cold-Chain Reefer Van",
      gpsDevice: "AIS-140 GPS + IoT Temp Sensor",
      capacity: "Pharma & perishables < 3,000 kg",
      eta: "Express Sub-24 Hours",
      icon: Thermometer,
      cost: "₹4,200",
      co2: "Temp Controlled 3°C",
    },
  ];

  const handleBookVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const stateCodes = ["MH", "DL", "KA", "TS", "GJ"];
      const randState = stateCodes[Math.floor(Math.random() * stateCodes.length)];
      const newTrk = `TRK-${randState}-${Math.floor(10000 + Math.random() * 90000)}-IN`;
      setGeneratedTrackingNo(newTrk);
      setIsSubmitting(false);
      setDispatchedSuccess(true);
    }, 1200);
  };

  const handleRecalculateRoute = () => {
    setIsRerouting(true);
    setTimeout(() => {
      setIsRerouting(false);
      setRerouteMsg("Mumbai-Pune Expressway AIS-140 Detour Applied: Avoided Vashi toll traffic. Saved 22 mins & 3.1L diesel!");
    }, 800);
  };

  const handleReset = () => {
    setDispatchedSuccess(false);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#101010]/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-3xl bg-[#FAF9F5] rounded-[32px] p-6 sm:p-8 shadow-[0_32px_64px_rgba(0,0,0,0.3)] border border-white/80 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                handleReset();
                onClose();
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white border border-[#E8E5DC] text-[#101010] flex items-center justify-center hover:bg-[#101010] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-[#101010] text-[#D6FF3D] rounded-full uppercase tracking-wider">
                Step {stepData.step} Interactive Workflow
              </span>
            </div>

            {/* ========================================================================= */}
            {/* STEP 01: CREATE ACCOUNT & CONNECT CARRIER APIS */}
            {/* ========================================================================= */}
            {stepData.step === "01" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101010] flex items-center gap-2">
                    Connect Carrier APIs & Integration Hub
                    <UserPlus className="w-6 h-6 text-[#4338FF]" />
                  </h2>
                  <p className="text-sm text-[#666] mt-1">
                    Connect FedEx, DHL, UPS, and custom fleet credentials in under 2 minutes.
                  </p>
                </div>

                {/* Carrier Grid */}
                <div>
                  <label className="block text-xs font-bold text-[#101010] uppercase mb-2">
                    Toggle Active Carrier Connectors
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {carrierOptions.map((c) => {
                      const isConnected = connectedCarriers.includes(c.code);
                      return (
                        <div
                          key={c.code}
                          onClick={() => toggleCarrier(c.code)}
                          className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                            isConnected
                              ? "bg-[#101010] text-white border-[#101010] shadow-sm"
                              : "bg-white text-[#101010] border-[#E8E5DC] hover:border-[#4338FF]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{c.logo}</span>
                            <span className="text-xs font-bold">{c.name}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isConnected ? "bg-[#D6FF3D] text-[#101010]" : "bg-[#FAF9F5] text-[#666]"}`}>
                            {isConnected ? "Active" : "Off"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* API Key Form */}
                <form onSubmit={handleTestApi} className="bg-white p-5 rounded-2xl border border-[#E8E5DC] space-y-4 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold text-[#101010] uppercase mb-1 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-[#4338FF]" /> Primary Fleet API Secret Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        required
                        className="flex-1 px-4 py-2.5 bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl text-xs font-mono font-bold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                      />
                      <button
                        type="submit"
                        disabled={isTestingApi}
                        className="px-5 py-2.5 bg-[#4338FF] hover:bg-[#3429d4] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm disabled:opacity-75 cursor-pointer"
                      >
                        {isTestingApi ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Zap className="w-3.5 h-3.5 text-[#D6FF3D]" />
                        )}
                        <span>Test & Sync API</span>
                      </button>
                    </div>
                  </div>

                  {apiConnectedStatus && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{apiConnectedStatus}</span>
                    </div>
                  )}
                </form>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white rounded-2xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Save Configuration & Complete Step 1</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 02: BOOK & MANIFEST SHIPMENTS */}
            {/* ========================================================================= */}
            {stepData.step === "02" && (
              <div>
                {!dispatchedSuccess ? (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101010] flex items-center gap-2">
                        Book Your Delivery Vehicle
                        <Sparkles className="w-6 h-6 text-[#4338FF]" />
                      </h2>
                      <p className="text-sm text-[#666] mt-1">
                        Fill in pickup & delivery locations, select a vehicle, and send your package.
                      </p>
                    </div>

                    <form onSubmit={handleBookVehicle} className="space-y-6">
                      {/* Addresses */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#101010] uppercase mb-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#4338FF]" /> Pickup Address
                          </label>
                          <input
                            type="text"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            required
                            placeholder="e.g. Bhiwandi Hub, Mumbai"
                            className="w-full px-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF] shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#101010] uppercase mb-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D6FF3D]" /> Delivery Address
                          </label>
                          <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                            placeholder="e.g. Okhla Depot, New Delhi"
                            className="w-full px-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF] shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Vehicle Fleet Selection Cards with GPS Devices */}
                      <div>
                        <label className="block text-xs font-bold text-[#101010] uppercase mb-2">
                          Choose Delivery Vehicle (AIS-140 GPS Device Fitted)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {vehicleOptions.map((v) => {
                            const VIcon = v.icon;
                            const isSelected = selectedVehicle === v.id;
                            return (
                              <div
                                key={v.id}
                                onClick={() => setSelectedVehicle(v.id as any)}
                                className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                                  isSelected
                                    ? "bg-[#101010] text-white border-[#101010] shadow-lg scale-[1.02]"
                                    : "bg-white text-[#101010] border-[#E8E5DC] hover:border-[#4338FF]"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <VIcon className={`w-5 h-5 ${isSelected ? "text-[#D6FF3D]" : "text-[#4338FF]"}`} />
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-[#FAF9F5] text-[#666]"}`}>
                                    {v.cost}
                                  </span>
                                </div>
                                <h4 className="font-bold text-xs">{v.name}</h4>
                                <span className={`text-[9px] font-mono font-semibold block mt-1 ${isSelected ? "text-[#D6FF3D]" : "text-[#4338FF]"}`}>
                                  📟 {v.gpsDevice}
                                </span>
                                <p className={`text-[11px] mt-1 ${isSelected ? "text-gray-300" : "text-[#666]"}`}>
                                  {v.capacity}
                                </p>
                                <div className="mt-2 flex items-center justify-between text-[10px] font-semibold">
                                  <span className={isSelected ? "text-[#D6FF3D]" : "text-[#4338FF]"}>{v.eta}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Weight & Parcel Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#101010] uppercase mb-1">
                            Package Weight (kg)
                          </label>
                          <input
                            type="number"
                            value={parcelWeight}
                            onChange={(e) => setParcelWeight(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm font-mono font-bold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#101010] uppercase mb-1">
                            What are you shipping?
                          </label>
                          <select
                            value={packageType}
                            onChange={(e) => setPackageType(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF]"
                          >
                            <option value="Standard Boxes & Parcels">Standard Boxes & Parcels</option>
                            <option value="Heavy Goods & Pallets">Heavy Goods & Pallets</option>
                            <option value="Food & Cold Storage">Food & Cold Storage</option>
                            <option value="Electronics & Valuables">Electronics & Valuables</option>
                          </select>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#4338FF] hover:bg-[#3429d4] text-white font-bold rounded-2xl text-base shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-75 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Finding Nearby Driver & Sending Package...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-[#D6FF3D]" />
                            <span>Send Package Now</span>
                            <ArrowRight className="w-5 h-5 ml-1" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Success Screen after Dispatch */
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 bg-[#D6FF3D] text-[#101010] rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-[#101010]">
                        Your Package is Booked & On Its Way! 🎉
                      </h3>
                      <p className="text-sm text-[#666] max-w-md mx-auto mt-2">
                        A driver has been assigned to pick up your package from <b>{pickup}</b> and deliver it to <b>{destination}</b>.
                      </p>
                    </div>

                    {/* Tracking ID Badge */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E8E5DC] max-w-md mx-auto shadow-sm">
                      <span className="text-xs font-mono font-bold text-[#666] uppercase block mb-1">
                        Your Tracking Number
                      </span>
                      <div className="text-2xl font-mono font-extrabold text-[#4338FF] tracking-wider mb-3">
                        {generatedTrackingNo}
                      </div>

                      <div className="flex items-center justify-center gap-2 text-xs text-[#666] bg-[#FAF9F5] py-2 px-3 rounded-xl border border-[#E8E5DC]">
                        <Barcode className="w-4 h-4 text-[#101010]" />
                        <span>Driver & Vehicle Assigned Successfully</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onTrackDispatched(generatedTrackingNo);
                          handleReset();
                        }}
                        className="px-6 py-3.5 bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Track My Package Live</span>
                      </button>

                      <button
                        onClick={handleReset}
                        className="px-6 py-3.5 bg-white text-[#101010] border border-[#E8E5DC] hover:bg-gray-100 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>Send Another Package</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 03: TRACK LIVE TELEMETRY */}
            {/* ========================================================================= */}
            {stepData.step === "03" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101010] flex items-center gap-2">
                    Live Telemetry & GPS Control
                    <Navigation className="w-6 h-6 text-[#4338FF]" />
                  </h2>
                  <p className="text-sm text-[#666] mt-1">
                    Watch real-time GPS coordinates, sub-second route recalculations, and thermal sensors.
                  </p>
                </div>

                {/* Telemetry Sensor Dashboard Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-[#E8E5DC]">
                    <div className="flex items-center gap-1.5 text-xs text-[#666] font-semibold mb-1">
                      <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> GPS Lock
                    </div>
                    <div className="text-lg font-bold text-[#101010]">99.9% Strong</div>
                    <div className="text-[10px] text-emerald-600 font-mono">14 Satellites</div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-[#E8E5DC]">
                    <div className="flex items-center gap-1.5 text-xs text-[#666] font-semibold mb-1">
                      <Activity className="w-3.5 h-3.5 text-[#4338FF]" /> Fleet Speed
                    </div>
                    <div className="text-lg font-bold text-[#101010]">62.4 MPH</div>
                    <div className="text-[10px] text-[#666]">Cruising on I-90</div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-[#E8E5DC]">
                    <div className="flex items-center gap-1.5 text-xs text-[#666] font-semibold mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" /> Webhook Ping
                    </div>
                    <div className="text-lg font-bold text-[#101010]">16 ms</div>
                    <div className="text-[10px] text-amber-600 font-mono">Sub-second Sync</div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-[#E8E5DC]">
                    <div className="flex items-center gap-1.5 text-xs text-[#666] font-semibold mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4338FF]" /> Cargo Temp
                    </div>
                    <div className="text-lg font-bold text-[#101010]">3.8 °C</div>
                    <div className="text-[10px] text-emerald-600 font-mono">Cold-Chain Nominal</div>
                  </div>
                </div>

                {/* Interactive Dynamic Route Recalculator */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DC] space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#101010]">Sub-Second Dynamic AI Rerouting</h4>
                      <p className="text-xs text-[#666]">Recalculate route to bypass real-time traffic or weather delays.</p>
                    </div>
                    <button
                      onClick={handleRecalculateRoute}
                      disabled={isRerouting}
                      className="px-4 py-2.5 bg-[#4338FF] hover:bg-[#3429d4] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm disabled:opacity-75 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-[#D6FF3D] ${isRerouting ? "animate-spin" : ""}`} />
                      <span>Recalculate Route</span>
                    </button>
                  </div>

                  {rerouteMsg && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200">
                      {rerouteMsg}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onTrackDispatched("TRK-89240-US");
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open Live GPS Telemetry Map</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-[#101010] border border-[#E8E5DC] hover:bg-gray-100 rounded-2xl text-sm font-bold transition-colors cursor-pointer"
                  >
                    <span>Close Window</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 04: DELIVERED & CUSTOMER DELIGHTED */}
            {/* ========================================================================= */}
            {stepData.step === "04" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101010] flex items-center gap-2">
                    Proof of Delivery & Customer Delight
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </h2>
                  <p className="text-sm text-[#666] mt-1">
                    Instant proof of delivery, photo signatures, and automated customer feedback ratings.
                  </p>
                </div>

                {/* Proof of Delivery Card */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DC] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#E8E5DC] pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#666] uppercase block">Shipment ID</span>
                      <span className="font-mono font-bold text-sm text-[#4338FF]">TRK-89240-US</span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Delivered Today at 02:14 PM
                    </span>
                  </div>

                  {/* Digital Signature Preview */}
                  <div>
                    <label className="block text-xs font-bold text-[#101010] uppercase mb-1">
                      Verified Recipient Signature (Sarah Jenkins)
                    </label>
                    <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E8E5DC] flex items-center justify-between">
                      <div className="font-serif italic text-2xl text-[#101010] tracking-wide">
                        Sarah Jenkins
                      </div>
                      <div className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        GPS Geofence: Verified (Lat 47.6062)
                      </div>
                    </div>
                  </div>

                  {/* Interactive Star Rating */}
                  <div>
                    <label className="block text-xs font-bold text-[#101010] uppercase mb-1">
                      Customer Satisfaction Score
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => setRating(star)}
                          className={`w-6 h-6 cursor-pointer transition-colors ${
                            star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-[#101010] ml-2">{rating}.0 / 5.0 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      setPodDownloaded(true);
                      setTimeout(() => setPodDownloaded(false), 2500);
                    }}
                    className="px-5 py-3 bg-[#4338FF] hover:bg-[#3429d4] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#D6FF3D]" />
                    <span>{podDownloaded ? "POD_Manifest_TRK-89240.pdf Downloaded!" : "Download Signed POD PDF"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSmsSent(true);
                      setTimeout(() => setSmsSent(false), 2500);
                    }}
                    className="px-5 py-3 bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{smsSent ? "SMS Receipt Sent to +1 (555) 234-5678" : "Send SMS Receipt to Customer"}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
