import { createClient } from "@/lib/supabase/server";
import { getUsageState } from "@/lib/usage";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const usage = await getUsageState(user.id);

  return <DashboardClient usage={usage} />;
}
