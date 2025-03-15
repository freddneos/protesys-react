import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const DashboardMetrics = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card bg-primary text-white p-6">
        <h3 className="text-xl font-bold">Total Processes</h3>
        <p className="text-3xl">{totalProcesses}</p>
      </div>

      <div className="card bg-secondary text-white p-6">
        <h3 className="text-xl font-bold">Total Clients</h3>
        <p className="text-3xl">{totalClients}</p>
      </div>

      <div className="card bg-blue-500 text-white p-6">
        <h3 className="text-xl font-bold">Total Prosthetists</h3>
        <p className="text-3xl">{totalProsthetists}</p>
      </div>

      <div className="card bg-red-500 text-white p-6 col-span-1 md:col-span-2">
        <h3 className="text-xl font-bold">Delayed Processes</h3>
        <p className="text-3xl">{delayedProcesses}</p>
      </div>
    </div>
  );
};