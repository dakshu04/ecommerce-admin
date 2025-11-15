import prismadb from "@/lib/prismaDb"
import { ColorForm } from "./components/color-forms"


const ColorPage = async ({
    params
}: {
    params: { colorId: string }
}) => {
    const color = await prismadb.color.findUnique({
        where: {
            id: (await params).colorId
        }
    })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm intialData={color} />
            </div>
        </div>
    )
}

export default ColorPage
