import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../supabase/AuthContext";
import { Card } from "@radix-ui/themes";

const CompletedMissions: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const auth = useAuth();
  useEffect(() => {
    const fetchCompletedMissions = async () => {
      if (!auth.user) {
        console.warn("User not authenticated, skipping fetch.");
        return;
      }
      const { data, error } = await supabase
        .from("mission")
        .select("*")
        .eq("user_uuid", auth.user?.id);

      if (error) {
        console.error("Error fetching completed missions:", error);
      } else {
        console.log("Completed Missions:", data);
        setData(data);
      }
    };

    fetchCompletedMissions();
  }
  , [auth.user]);
  return <div>
    { data && data.length > 0 && data.map((mission) => (
      <Card key={mission.id}>
        <h3>{mission.title}</h3>
        <p>{mission.description}</p>
      </Card>
    )) }
  </div>};

export default CompletedMissions;