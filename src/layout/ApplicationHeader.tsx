import { Flex, Heading } from "@radix-ui/themes";

function ApplicationHeader() {
  return (
    <Flex align="center" justify="center" style={{ padding: "10px" }}>
      <Heading
        size={{
          initial: "5",
          md: "7",
          xl: "9",
        }}
      >
        Missions Tracker
      </Heading>
    </Flex>
  );
}

export default ApplicationHeader;
