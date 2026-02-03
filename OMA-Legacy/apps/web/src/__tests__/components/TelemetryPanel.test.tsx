import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TelemetryPanel } from '@/components/console/TelemetryPanel';

// Mock fetch globally
global.fetch = vi.fn();

describe('TelemetryPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with initial state', () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
    });

    render(<TelemetryPanel />);

    expect(screen.getByText('TELEMETRY')).toBeInTheDocument();
    expect(screen.getByText('Power System')).toBeInTheDocument();
    expect(screen.getByText('Position')).toBeInTheDocument();
    expect(screen.getByText('Hardware')).toBeInTheDocument();
  });

  it('should display fetched telemetry data', async () => {
    const mockTelemetryData = {
      battery: { level: 95, voltage: 12.5 },
      position: { lat: 34.0522, lng: -118.2437, alt: 150 },
      hardware: { cpuTemp: 55, motorStatus: 'idle' },
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTelemetryData),
    });

    render(<TelemetryPanel />);

    await waitFor(() => {
      expect(screen.getByText('95%')).toBeInTheDocument();
    });

    expect(screen.getByText('12.5V')).toBeInTheDocument();
    expect(screen.getByText('55°C')).toBeInTheDocument();
  });

  it('should handle fetch errors gracefully', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

    render(<TelemetryPanel />);

    // Component should still render with default values
    await waitFor(() => {
      expect(screen.getByText('TELEMETRY')).toBeInTheDocument();
    });

    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
