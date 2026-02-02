import { createClient } from "@/lib/supabase/server";
import { getUsageState } from "@/lib/usage";
import { AnalyzePageWrapper } from "./AnalyzePageWrapper";

export default async function AnalyzePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const usage = await getUsageState(user.id);

  return <AnalyzePageWrapper usage={usage} />;
}
