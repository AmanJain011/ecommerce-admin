import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "@/components/store-switcher"
import { redirect } from "next/navigation"
import prismaDb from "@/lib/prismadb"

export const  Navbar = async () => {
    const {userId} = auth()
    if(!userId){
        return redirect("/sign-in")
    }
    const stores = await prismaDb.store.findMany({
        where:{
            userId
        }
    })
    return(
        <div className="border-b sticky top-0 bg-white z-10">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores}/>
                <MainNav className="mx-6"/>
                <div className="ml-auto">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}