import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const telemetry = {
    timestamp: Date.now(),
    battery: {
      level: Math.floor(Math.random() * (100 - 80) + 80),
      voltage: 12 + Math.random(),
      isCharging: Math.random() > 0.5,
    },
    position: {
      lat: 34.0522 + (Math.random() - 0.5) * 0.001,
      lng: -118.2437 + (Math.random() - 0.5) * 0.001,
      alt: 150 + Math.random() * 10,
      heading: Math.floor(Math.random() * 360),
    },
    hardware: {
      cpuTemp: 40 + Math.random() * 20,
      motorStatus: Math.random() > 0.8 ? 'moving' : 'idle',
      activeSensors: ['lidar', 'camera_front', 'imu_main'],
    },
  };

  return NextResponse.json(telemetry);
}
