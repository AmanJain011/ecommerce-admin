import prismaDb from "@/lib/prismadb";

interface DashboardPageProps{
    params: {storeId: string}
}

const DashBoardPage: React.FC<DashboardPageProps> = async ({params}) => {

    const store = await prismaDb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return(
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashBoardPage;