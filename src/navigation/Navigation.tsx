import { ReactNode } from "react";
import { Tabs, Box } from "@radix-ui/themes";

type NavigationProps = {
  currentValue: string;
  completedValue: string;
  reportsValue: string;
  children: ReactNode | ReactNode[];
};

const Navigation: React.FC<NavigationProps> = ({
  currentValue,
  completedValue,
  reportsValue,
  children,
}) => {
  return (
    <nav
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        overflow: "auto",
        background: "var(--gray-a2)",
        padding: "10px",
      }}
    >
      <Tabs.Root defaultValue={currentValue}>
        <Tabs.List size="2">
          <Tabs.Trigger value={currentValue}>Current Mission</Tabs.Trigger>
          <Tabs.Trigger value={completedValue}>Completed Missions</Tabs.Trigger>
          <Tabs.Trigger value={reportsValue}>Reports</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">{children}</Box>
      </Tabs.Root>
    </nav>
  );
};

export default Navigation;
