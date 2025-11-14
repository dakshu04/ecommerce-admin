import prismadb from "@/lib/prismaDb"
import { CategoryForm } from "./components/category-forms"



const CategoryPage = async ({
    params
}: {
    params: { categoryId: string, storeId: string }
}) => {
    const category = await prismadb.category.findUnique({
        where: {
            id: (await params).categoryId
        }
    })

    const billboard = await prismadb.billboard.findMany({
        where : {
            storeId: (await params).storeId
        }
    })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm billboards={billboard} intialData={category} />
            </div>
        </div>
    )
}

export default CategoryPage
