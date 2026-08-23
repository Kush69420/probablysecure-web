export interface ServiceStatus {
  key: string;
  name: string;
  role: string;
  url: string;
  up: boolean;
  state: string;
  since: string | null;
}

export interface Status {
  generated: number;
  uptime_seconds: number;
  kernel: string;
  os: string;
  cpu: {
    percent: number;
    cores: number;
    model: string;
    load: string[];
    temp_c: number | null;
  };
  memory: { used: number; total: number; percent: number };
  storage: { used: number; total: number; free: number; percent: number };
  network: { rx_bps: number; tx_bps: number; rx_total: number; tx_total: number; link: string };
  tunnel: { active: boolean; edge_connections: number; registrations_24h: number };
  services: ServiceStatus[];
}
