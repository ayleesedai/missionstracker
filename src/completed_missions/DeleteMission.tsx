import React from "react";
import { supabase } from "../supabase/supabaseClient";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

type DeleteMissionProps = {
  missionId: string;
  onDelete: (missionId: string) => void;
};

const DeleteMission: React.FC<DeleteMissionProps> = ({ missionId, onDelete }) => {
  const handleMissionDelete = async () => {
    const { error } = await supabase
      .from("mission")
      .delete()
      .eq("id", missionId);
    if (error) {
      console.error("Error deleting mission:", error);
    } else {
      console.log("Mission deleted successfully:", missionId);
      onDelete(missionId);
    }
  };

  return (
    <IconButton
      color="red"
      variant="soft"
      size="2"
      onClick={() => handleMissionDelete()}
      aria-label="Delete mission"
    >
      <TrashIcon />
    </IconButton>
  );
};

export default DeleteMission;
