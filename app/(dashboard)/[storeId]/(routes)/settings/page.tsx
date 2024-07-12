import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import prismaDb from "@/lib/prismadb"
import { SettingsForm } from "./components/settings-form"

interface SettingPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingPageProps> = async ({params}) => {
    const {userId} = auth()
    if(!userId){
        return redirect("/sign-in")
    }
    const store = await prismaDb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if(!store){
        return redirect("/")
    }
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}

export default SettingsPage