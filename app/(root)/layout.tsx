import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({children}:{children:React.ReactNode}) {
    const {userId} = auth()
    if(!userId){
        return redirect("/sign-in")
    }

    const store = await prismaDb.store.findFirst({
        where: {
            userId
        }
    })

    if(store){
        return redirect(`/${store.id}`)
    }

    return(
        <>
        {children}
        </>
    )
}