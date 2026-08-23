export const bytes = (n: number, digits = 1): string => {
  if (!n) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), units.length - 1);
  return `${(n / 1024 ** i).toFixed(i === 0 ? 0 : digits)} ${units[i]}`;
};

export const bitrate = (bytesPerSec: number): string => {
  const bits = bytesPerSec * 8;
  if (bits < 1000) return `${Math.round(bits)} bps`;
  if (bits < 1e6) return `${(bits / 1e3).toFixed(1)} Kbps`;
  return `${(bits / 1e6).toFixed(2)} Mbps`;
};

export const duration = (seconds: number): string => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${String(h).padStart(2, '0')}h`;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  return `${m}m`;
};

export const sinceNow = (iso: string | null): string => {
  if (!iso) return '—';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return '—';
  return duration((Date.now() - t) / 1000);
};
