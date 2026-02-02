// Server-compatible Nav wrapper - delegates to client component
import { NavClient } from "./NavClient";

interface NavProps {
  authenticated?: boolean;
  email?: string | null;
}

export function Nav({ authenticated, email }: NavProps) {
  return <NavClient authenticated={authenticated} email={email} />;
}
