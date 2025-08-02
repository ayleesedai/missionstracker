import React from 'react';
import { Flex, Text, TextField } from '@radix-ui/themes';

interface MissionFieldProps {
  label: string;
  name?: string;
  type: 'date' | 'datetime-local' | 'email' | 'hidden' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const MissionField: React.FC<MissionFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
}) => (
  <Flex align="start" gap="0" direction="column" >
    <Text size="1" weight="bold">{label}</Text>
    <TextField.Root
      size="3"
      type={type}
      name={name || label.toLowerCase().replace(/\s+/g, '_')}
      value={value}
      onChange={onChange}
      required={required}
      style={{ width: type === "text" ? "30rem" : undefined, maxWidth: "95%" }}
    />
  </Flex>
);

export default MissionField;
