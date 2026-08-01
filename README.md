# 🚚 iTrackCargo (iLogiTrack India)
> **Next-Generation Pan-India Supply Chain Telemetry & AIS-140 GPS Vehicle Dispatch Platform**

## 📖 Overview

**iTrackCargo (iLogiTrack India)** is an enterprise-grade, real-time logistics telemetry platform built for Indian fleet operators, freight carriers, and e-commerce supply chains. 

It provides sub-second GPS vehicle tracking, automated AIS-140 device pairing, dynamic highway route optimization, cold-chain thermal monitoring, and frictionless parcel booking.

---

## ✨ Key Features

### 1. 🌐 Interactive Hero Section with 3D Globe
- **Interactive 3D Globe**: Real-time rendering of global and Pan-India logistics routes built with Three.js and React Three Fiber.
- **Particle Vector Background Canvas**: Lightweight 2D canvas particle grid background for seamless visual aesthetics.
- **Instant Parcel Tracking Bar**: Search any Indian tracking code (e.g. `#TRK-MH-4002-IN`) to launch the telemetry drawer.

### 2. 🚛 AIS-140 GPS Device Vehicle Management
- **GPS-Categorized Fleet Vehicles**:
  - 🛺 **Mahindra Treo EV Auto Courier** (*AIS-140 Mini OBD GPS Tracker*) — Zero-emission last-mile delivery.
  - 🚚 **Tata Ace Gold Mini Truck** (*AIS-140 OBD GPS + Fuel Sensor*) — Intra-city goods transport.
  - 🚛 **BharatBenz 14-Wheeler Heavy Truck** (*Dual CAN-Bus Telematics GPS*) — Interstate highway logistics (NH-48 Corridor).
  - ❄️ **Cold-Chain Refrigerated Van** (*AIS-140 GPS + Wireless IoT Temperature Sensor*) — Pharma & perishable items.

### 3. ⚙️ Interactive 4-Step Workflow ("How It Works")
- **Step 01: Connect Carrier APIs**: Connect Indian logistics providers (Delhivery, Blue Dart, Safexpress, Mahindra Logistics, VRL) with live latency ping tests.
- **Step 02: Book & Send Packages**: Simplified, friendly customer booking form to select pickup/delivery addresses, choose fleet vehicles, and dispatch parcels in seconds.
- **Step 03: Track Live Telemetry**: Live AIS-140 GPS radar, temperature telemetry, and AI dynamic route recalculation (bypassing traffic delays).
- **Step 04: Delivered & Customer Delighted**: Digital photo signature verification, GPS geofence checks, 5-star customer ratings, signed POD PDF downloads, and SMS receipts.

### 4. 📊 Pan-India Telemetry Command Center (`/dashboard`)
- **Live Manifest Table**: Filter by status (*Out for Delivery*, *In Transit*, *Rerouted*, *Exception*) and search by code or GPS serial.
- **`+ Add Vehicle by GPS Code` Feature**: Directly link any AIS-140 or OBD-II GPS device code (e.g., `AIS140-MH-99201`) and RTO registration number (`MH-02-DN-4820`) to the live dashboard.
- **Pan-India Hub Telemetry**: Track freight flow across Indian hubs (*JNPT Port Mumbai*, *IGI Airport Delhi*, *Electronic City Bengaluru*).
- **Indian Rupee (₹ / INR) Financial Metrics**: Live AI route fuel savings displayed in Rupees (₹4.2 Cr saved).

### 5. 🔐 Authentication System (`/login` & `/signup`)
- **Secure Authentication**: JWT-based authentication backed by HTTP-Only cookies and rate-limiting middleware.
- **Dynamic Header Synchronization**: Displays the logged-in user's exact name (*Ajinkya Biradar*) and email (*ajinkya@apexlogistics.in*) in the dashboard header.
- **Seamless Exit Workflow**: Clicking Log Out or the top header logo cleanly clears the session and returns straight to the homepage (`/`).

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Server Side Rendering, API Routes & Layout Routing |
| **Language** | **TypeScript 5.0** | Strict Type Safety across components and APIs |
| **Styling** | **Tailwind CSS & CSS Modules** | Fluid Typography, Responsive Grids & Dark Mode |
| **3D Graphics** | **Three.js & React Three Fiber** | Interactive 3D Earth Globe (`GlobeScene.tsx`) |
| **Animations** | **Motion / Framer Motion 12** | Entrance transitions, modal spring physics & micro-interactions |
| **Analytics** | **Recharts** | Interactive delivery volume & SLA reliability area charts |
| **Smooth Scroll** | **Lenis Scroll (`lenis/react`)** | Inertial momentum smooth scrolling |
| **Icons** | **Lucide React** | Modern vector icon set |
| **Notifications** | **Sonner** | Toast notifications for dispatches & API actions |
| **Authentication** | **jsonwebtoken & cookies** | JWT token signing & session storage |

---

