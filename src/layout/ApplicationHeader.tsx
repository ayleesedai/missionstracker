import { Flex, Heading } from "@radix-ui/themes";

function ApplicationHeader() {
  return (
    <Flex align="center" justify="center" style={{ padding: "10px", backgroundColor: "var(--accent-3)" }}>
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
    </Flex>
  );
}

export default ApplicationHeader;
