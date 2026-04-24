# Controller Test

A React Native mobile application built with Expo that transforms your device into a fully customizable, virtual game controller. Connect to your gaming rig or server over WebSockets to transmit controller inputs over your local network.

## Features

- **Virtual Gamepad:** Emulates a standard controller with Joysticks (LS, RS), D-pads, and Action buttons (A, B, X, Y).
- **Customizable Layouts:** Use the built-in layout editor to drag and drop buttons exactly where you want them.
- **Local Storage:** Save multiple custom layouts directly on your device using SQLite (via Drizzle ORM).
- **Low-Latency WebSockets:** Sends real-time controller inputs to a configured IP and Port.
- **Orientation Lock:** Automatically switches to landscape mode for gameplay and layout editing.

## Prerequisites

- Node.js (v18+)
- npm, yarn, or pnpm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app on your mobile device (or configured iOS/Android emulators)

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   # or npm install / yarn install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on your device:**
   - Scan the QR code from the terminal output using the **Expo Go** app on your phone.
   - Alternatively, press `a` in the terminal to run on an Android emulator, or `i` for an iOS simulator.

## Configuration

Navigate to the **Settings** tab in the app to configure the target IP address and Port of your server. The app will open WebSocket connections (`ws://<ip>:<port>`) to transmit your joystick and button inputs.

## Project Structure

- `app/` - The main application code including screens and file-based routing.
  - `components/` - Reusable UI components (Buttons, Joysticks, Draggables).
  - `Editing_layout.tsx` - Screen for creating custom button layouts.
  - `HomePage.tsx` - Main screen to select saved layouts.
- `db/` - Database schema definitions using Drizzle ORM.
- `drizzle/` - Database migrations.

## Technologies Used

- **Framework:** React Native / Expo
- **Navigation:** React Navigation (Native Stack, Bottom Tabs)
- **Database:** Expo SQLite + Drizzle ORM
- **Network:** WebSockets
- **UI/Interactions:** React Native Gesture Handler, Reanimated, Lucide React Native

## Status

This project is complete and ready to use!
g and development purposes.
