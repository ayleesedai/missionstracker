import React, { ReactNode } from "react";
import { Tabs } from '@radix-ui/themes'

type NavigationItemProps = {
  value: string;
  children: ReactNode;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ value, children }) => {
  return <Tabs.Content value={value}>{children}</Tabs.Content>;
};

export default NavigationItem;
