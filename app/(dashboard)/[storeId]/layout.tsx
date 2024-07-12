import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import prismaDb from "@/lib/prismadb"
import { Navbar } from "@/components/navbar"

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {storeId: string}
}){
    const {userId} = auth()

    if(!userId){
        return redirect("/sign-in")
    }

    const store = await prismaDb.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    })

    if(!store){
        return redirect("/")
    }

    return(
        <>
        <Navbar/>
        {children}
        </>
    )
}