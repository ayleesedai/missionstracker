import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CompletedMissions: React.FC = () => {
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
      }
    };

    fetchCompletedMissions();
  }
  , []);
  return null;
};

export default CompletedMissions;