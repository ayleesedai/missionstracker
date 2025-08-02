import { Box, Flex, Heading } from "@radix-ui/themes";
import Logout from "../login/Logout";

function ApplicationHeader() {
  return (
    <Flex align="center" justify="center" style={{ padding: "10px", backgroundColor: "var(--accent-3)", position: "relative" }}>
      <Heading
        color="blue"
        size={{
          initial: "7",
          md: "8",
          xl: "9",
        }}
      >
        Missions Tracker
      </Heading>
      <Box position={"absolute"} right="10px">
        <Logout />
      </Box>
    </Flex>
  );
}

export default ApplicationHeader;
