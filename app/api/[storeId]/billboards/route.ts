import prismaDb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        const {userId} = auth()
        const body = await req.json()
        const {label, imageUrl} = body

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!label){
            return new NextResponse("Label is required", {status: 400})
        }
        if(!imageUrl){
            return new NextResponse("Image Url is required", {status: 400})
        }
        if(!params.storeId){
            return new NextResponse("Store Id is required", {status: 400})
        }

        const soteIdByUser = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!soteIdByUser){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const billboard = await prismaDb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARDS_POST]', error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function GET(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        if(!params.storeId){
            return new NextResponse("Store Id is required", {status: 400})
        }

        const billboards = await prismaDb.billboard.findMany({
            where:{
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards)

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error)
        return new NextResponse("Internal Error", {status: 500})
    }
}