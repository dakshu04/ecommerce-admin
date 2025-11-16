import prismadb from "@/lib/prismaDb"
import { ProductForm } from "./components/product-forms"


const ProductPage = async ({
    params
}: {
    params: { productId: string }
}) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: (await params).productId
        },
        include: {
            images: true
        }
    })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm intialData={product} />
            </div>
        </div>
    )
}

export default ProductPage
