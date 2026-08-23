import { useCallback, useEffect, useRef, useState } from 'react';
import type { Status } from '../types/status';

const POLL_MS = 20_000;
/** Keep enough samples to fill the sparkline at one point per poll. */
const HISTORY = 40;

export interface NetSample { rx: number; tx: number }

export const useStatus = () => {
  const [data, setData] = useState<Status | null>(null);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<NetSample[]>([]);
  const lastGenerated = useRef(0);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/status.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      const json: Status = await res.json();
      setData(json);
      setError(false);
      // The collector runs on its own timer, so skip duplicate reads of the
      // same file -- otherwise the graph flatlines with repeated samples.
      if (json.generated !== lastGenerated.current) {
        lastGenerated.current = json.generated;
        setHistory((h) => [...h, { rx: json.network.rx_bps, tx: json.network.tx_bps }].slice(-HISTORY));
      }
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    const onVisible = () => document.visibilityState === 'visible' && load();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);

  return { data, error, history };
};
