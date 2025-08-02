import { useEffect, useState } from "react";
import { useCurrentMission } from "./useCurrentMission";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../supabase/AuthContext";
import { Badge, Button, Flex } from "@radix-ui/themes";
import MissionField from "./MissionField";

export default function CurrentMission() {
  const { user } = useAuth();
  const { currentMission, loading } = useCurrentMission();

  const [form, setForm] = useState({
    start: "",
    end: "",
    title: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);

  // Prefill the form when editing an existing mission
  useEffect(() => {
    if (currentMission) {
      setForm({
        start: currentMission.start_time,
        end: currentMission.end_time || "",
        title: currentMission.title,
        description: currentMission.description,
      });
    }
  }, [currentMission]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (currentMission) {
      const { error } = await supabase
        .from("mission")
        .update({
          title: form.title,
          description: form.description,
          start_time: form.start || null,
          end_time: form.end || null,
        })
        .eq("id", currentMission.id);

      if (error) {
        setError(error.message);
      } else {
        window.location.reload();
      }
    } else {
      const { error } = await supabase.from("mission").insert({
        title: form.title,
        description: form.description,
        start_time: form.start || null,
        end_time: form.end || null,
        user_uuid: user?.id,
      });

      if (error) {
        setError(error.message);
      } else {
        window.location.reload();
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in.</p>;

  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: "2rem" }}>
      <Flex direction="column" gap="6">
        <MissionField
          label="Start"
          type="datetime-local"
          value={form.start}
          onChange={handleChange}
        />
        <MissionField
          label="End"
          type="datetime-local"
          value={form.end}
          onChange={handleChange}
        />
        <MissionField
          label="Title"
          type="text"
          value={form.title}
          onChange={handleChange}
        />
        <MissionField
          label="Description"
          type="text"
          value={form.description}
          onChange={handleChange}
        />
        <Button
          type="submit"
          size="4"
          color={currentMission ? "indigo" : "green"}
          style={{ alignSelf: "start" }}
        >
          {currentMission ? "Update Mission" : "Create Mission"}
        </Button>

        {error && (
          <Badge size="3" color="red">
            {error}
          </Badge>
        )}
      </Flex>
    </form>
  );
}
