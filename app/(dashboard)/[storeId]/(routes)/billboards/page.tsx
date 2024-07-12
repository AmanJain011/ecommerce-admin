import {format} from "date-fns"
import prismaDb from "@/lib/prismadb";

import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";

const Billboards = async ({
    params
}:{
    params: {storeId: string}
}) => {
    const billboards = await prismaDb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdat: "desc"
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdat, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards}/>
            </div>
        </div>
    )
} 

export default Billboards;