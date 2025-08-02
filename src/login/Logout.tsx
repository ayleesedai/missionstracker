import { ExitIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useAuth } from "../supabase/AuthContext";

const Logout: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <IconButton color="crimson" onClick={() => signOut()}>
      <ExitIcon />
    </IconButton>
  );
};

export default Logout;
