import PrivacyPolicy from "@/src/features/(public)/privacy/_components/Privacy";
import { PublicHeader } from "@/src/components/header/PublicHeader"
import { createClient } from "@/src/lib/supabase/server"

export default async function Home() {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    return (
        <>
            <PublicHeader initialUser={user}/>
        <PrivacyPolicy />
        </>
    )
}