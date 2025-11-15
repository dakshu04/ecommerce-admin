"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorsClientProps {
    data: ColorColumn[]
}

const BillboardClient: React.FC<ColorsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();


    return (
        <>
        <div className="flex items-center justify-between">
            <Heading
            title={`Colors (${data.length})`}
            description="Manage colors for your store" />
            <Button
            onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                <Plus className="h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator />

        <DataTable searchKey="label" columns={columns} data={data} />
        <Heading title="API" description="API calls for Colors"/>
        <Separator />
        <ApiList entityName="colors" entityIdName="colorId" />
        </>
    )
}

export default BillboardClient