import { useAuth } from "./AuthContext";
import { ComponentType } from "react";

type AuthGateProps = {
  LoggedInComponent: ComponentType;
  LoginComponent: ComponentType;
};

const AuthGate: React.FC<AuthGateProps> = ({ LoggedInComponent, LoginComponent }) => {
  const { user, loading } = useAuth()

  if (loading) return <p className="p-4">Loading...</p>

  return user ? <LoggedInComponent /> : <LoginComponent />
}

export default AuthGate;
