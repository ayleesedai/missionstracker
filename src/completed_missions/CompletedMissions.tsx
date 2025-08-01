import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CompletedMissions: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchCompletedMissions = async () => {
      const { data, error } = await supabase
        .from("mission")
        .select("*")
        .eq("user_id", 1000);

      if (error) {
        console.error("Error fetching completed missions:", error);
      } else {
        console.log("Completed Missions:", data);
        setData(data);
      }
    };

    fetchCompletedMissions();
  }
  , []);
  return <div>
    { data && data.length > 0 && data.map((mission) => (
      <div key={mission.id}>
        <h3>{mission.title}</h3>
        <p>{mission.description}</p>
      </div>
    )) }
  </div>};

export default CompletedMissions;