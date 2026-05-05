"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/src/lib/supabase/client";

const supabase = createClient();

export interface DepartmentRow {
  service_id: string;
  name: string;
  people_ahead: number;
  avg_service: number;
  estimated_wait: number;
  status: "optimal" | "high-load";
}

export function useDepartmentSummary() {
  const [data, setData] = useState<DepartmentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const mounted = useRef(true);
  const refreshLock = useRef(false);

  // ── FETCH (single source of truth) ─────────────
  const fetchData = useCallback(async () => {
    if (refreshLock.current) return;
    refreshLock.current = true;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("department_summary")
        .select("*")
        .order("name");

      if (!error && data && mounted.current) {
        setData(data);
      }
    } finally {
      setLoading(false);
      refreshLock.current = false;
    }
  }, []);

  // ── INITIAL LOAD ONLY ───────────────────────────
  useEffect(() => {
    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [fetchData]);

  // ── REALTIME (NO STATE UPDATES HERE) ───────────
  useEffect(() => {
    const channel = supabase
      .channel("queue-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "queue" },
        () => {
          // IMPORTANT:
          // Do NOT call setState or chain fetch inside render flow.

          // Schedule safely outside render cycle
          queueMicrotask(() => {
            if (mounted.current) {
              fetchData();
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  const highLoadCount = data.filter(
    (d) => d.status === "high-load"
  ).length;

  return {
    data,
    loading,
    highLoadCount,
    refetch: fetchData,
  };
}