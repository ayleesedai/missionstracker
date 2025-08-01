import { ReactNode } from "react";

type ApplicationBodyProps = {
  children: ReactNode;
};

function ApplicationBody({ children }: ApplicationBodyProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {children}
    </div>
  );
}
export default ApplicationBody;
