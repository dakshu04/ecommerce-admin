"use client"

import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/Heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Image, Product } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface ProductFormProps {
    intialData: Product & {
        images: Image[]
    } | null
}

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
})

type ProductFormValues = z.infer<typeof formSchema>

export const ProductForm: React.FC<ProductFormProps> =  ({ intialData }) => {
    const params = useParams()
    const router = useRouter()
  
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = intialData ? "Edit product" : "Create product"
    const description = intialData ? "Edit a product" : "Add a new product"
    const toastMessage = intialData ? "Product updated." : "Product created."
    const action = intialData ? "Save changes" : "Create"

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: intialData ? {
            ...intialData,
            price: parseFloat(String(intialData?.price))
        } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            colorId: '',
            sizeId: '',
            isFeatured: false,
            isArchived: false
        }
    })

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true)
            if(intialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    const onDelete = async () => {
        
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh();
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard deleted")
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard  first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    } 

    return (
        <>  
            <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => onDelete()}
            loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading
                title={title}
                description={description} />

                {intialData && (
                    <Button 
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}>
                        <Trash className="h-4 w-4"/>

                    </Button>
                )}
            </div>
            <Separator />
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                    value={(field.value ?? []).map((image) => image.url)}
                                    disabled={loading}
                                    onChange={(url) => field.onChange([...(field.value ?? []), { url }])}
                                    onRemove={(url) =>
                                        field.onChange((field.value ?? []).filter((current) => current.url !== url))
                                    }/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>

                        </FormField>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard label" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>

                        </FormField>
                    </div>
                    <Button disabled={loading} type="submit" className="ml-auto">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}

