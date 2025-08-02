import React from "react";
import { supabase } from "../supabase/supabaseClient";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

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
  const [open, setOpen] = React.useState(false);
  const handleOpenChange = (isOpen: boolean) => setOpen(isOpen);

  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
        <AlertDialog.Trigger>
          <IconButton
            color="red"
            variant="soft"
            size="2"
            onClick={() => setOpen(true)}
            aria-label="Delete mission"
          >
            <TrashIcon />
          </IconButton>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Mission</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this mission? This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={handleMissionDelete}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteMission;
