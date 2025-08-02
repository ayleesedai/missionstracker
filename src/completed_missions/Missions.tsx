import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../supabase/AuthContext";
import { Badge, Card, Flex, Heading, IconButton, Strong, Text } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

const Missions: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const auth = useAuth();
  useEffect(() => {
    const fetchMissions = async () => {
      if (!auth.user) {
        console.warn("User not authenticated, skipping fetch.");
        return;
      }
      const { data, error } = await supabase
        .from("mission")
        .select("*")
        .eq("user_uuid", auth.user?.id);

      if (error) {
        console.error("Error fetching missions:", error);
      } else {
        console.log("Missions:", data);
        setData(data);
      }
    };

    fetchMissions();
  }
  , [auth.user]);

  const handleMissionDelete = async (missionId: string) => {
    const { error } = await supabase
      .from("mission")
      .delete()
      .eq("id", missionId);
    if (error) {
      console.error("Error deleting mission:", error);
    } else {
      setData((prev) => prev.filter((m) => m.id !== missionId));
    }
  };

  return <Flex gap="2" wrap="wrap" align="start">
    { data && data.length > 0 && data.map((mission) => (
      <Card key={mission.id} style={{ width: "350px", height: "220px", display:"flex" }}>
        <Flex direction={"column"} gap="2" justify="between" flexBasis="1" flexGrow="1">
          <Flex direction={"column"} gap="2">
            <Heading>{mission.title}</Heading>
            <Text><Strong>Start:</Strong> {mission.start_time}</Text>
            <Text><Strong>End:</Strong> {mission.end_time}</Text>
            <Text color="gray">{mission.description}</Text>
          </Flex>
          <Flex justify="between" align="center">
            <IconButton
              color="red"
              variant="soft"
              size="2"
              onClick={() => handleMissionDelete(mission.id)}
              aria-label="Delete mission"
            >
              <TrashIcon />
            </IconButton>
            {mission.end_time
            ? <Badge color="green" size="2">COMPLETED</Badge>
            : <Badge color="ruby" size="2">CURRENT</Badge>
            }
          </Flex>
        </Flex>
      </Card>
    )) }
  </Flex>};

export default Missions;