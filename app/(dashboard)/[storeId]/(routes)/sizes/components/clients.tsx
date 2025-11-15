"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { columns, SizeColumn } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface SizeColumnProps {
    data: SizeColumn[]
}

const BillboardClient: React.FC<SizeColumnProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();


    return (
        <>
        <div className="flex items-center justify-between">
            <Heading
            title={`Sizes (${data.length})`}
            description="Manage sizes for your store" />
            <Button
            onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                <Plus className="h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator />

        <DataTable searchKey="name" columns={columns} data={data} />
        <Heading title="API" description="API calls for Sizes"/>
        <Separator />
        <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    )
}

export default BillboardClient