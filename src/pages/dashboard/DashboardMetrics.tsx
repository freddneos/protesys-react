import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useTexts } from "../../hooks/useTexts";
import {
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export const DashboardMetrics = () => {
  const { texts } = useTexts();
  const [totalProcesses, setTotalProcesses] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalProsthetists, setTotalProsthetists] = useState(0);
  const [delayedProcesses, setDelayedProcesses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: processes } = await supabase
        .from("processes")
        .select("*");
      
      const { data: clients } = await supabase
        .from("clients")
        .select("*");
      
      const { data: prosthetists } = await supabase
        .from("prosthetists")
        .select("*");

      setTotalProcesses(processes?.length || 0);
      setTotalClients(clients?.length || 0);
      setTotalProsthetists(prosthetists?.length || 0);

      const { data: delayed } = await supabase
        .from("process_stages")
        .select("*")
        .eq("status", "In Progress")
        .lte("end_date", new Date().toISOString());

      setDelayedProcesses(delayed?.length || 0);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">{texts.dashboard.metrics.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl rounded-2xl p-6 border border-primary/20 transition-all hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <UserGroupIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="stat-title text-base-content/70">{texts.dashboard.metrics.cards.patients.title}</div>
              <div className="stat-value text-primary">{totalClients}</div>
              <div className="stat-desc text-success">↗︎ 21% {texts.dashboard.metrics.cards.patients.description}</div>
            </div>
          </div>
        </div>

        <div className="stat bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-xl rounded-2xl p-6 border border-secondary/20 transition-all hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/20 rounded-xl">
              <ClipboardDocumentCheckIcon className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <div className="stat-title text-base-content/70">{texts.dashboard.metrics.cards.activeCases.title}</div>
              <div className="stat-value text-secondary">{totalProcesses}</div>
              <div className="stat-desc">{texts.dashboard.metrics.cards.activeCases.description}</div>
            </div>
          </div>
        </div>

        <div className="stat bg-gradient-to-br from-accent/10 to-accent/5 shadow-xl rounded-2xl p-6 border border-accent/20 transition-all hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/20 rounded-xl">
              <UserIcon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <div className="stat-title text-base-content/70">{texts.dashboard.metrics.cards.prosthetists.title}</div>
              <div className="stat-value text-accent">{totalProsthetists}</div>
              <div className="stat-desc">{texts.dashboard.metrics.cards.prosthetists.description}</div>
            </div>
          </div>
        </div>

        <div className="stat bg-gradient-to-br from-error/10 to-error/5 shadow-xl rounded-2xl p-6 border border-error/20 transition-all hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-error/20 rounded-xl">
              <ExclamationCircleIcon className="w-8 h-8 text-error" />
            </div>
            <div>
              <div className="stat-title text-base-content/70">{texts.dashboard.metrics.cards.delayedCases.title}</div>
              <div className="stat-value text-error">{delayedProcesses}</div>
              <div className="stat-desc">{texts.dashboard.metrics.cards.delayedCases.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};