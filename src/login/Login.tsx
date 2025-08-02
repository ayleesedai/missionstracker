// src/pages/Login.tsx
import { Badge, Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useAuth } from "../supabase/AuthContext";
import { useState } from "react";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await signIn(email);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link.");
    }
  };

  return (
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <Flex direction="column" gap="6" style={{ padding: "20px" }} align="start">
      <Heading size="8">Login</Heading>
          <TextField.Root
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="3"
            style={{ width: "450px" }}
          />
          <Button size="4" type="submit">Send Magic Link</Button>
          {message && <Badge color="crimson">{message}</Badge>}
        </Flex>
      </form>
  );
};

export default Login;
