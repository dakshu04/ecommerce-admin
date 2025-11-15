"use client"
import React, { useState } from 'react'
import { SizeColumn } from '../../components/columns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { AlertModal } from '@/components/modals/alert-modal'

interface CellActionProps {
    data: SizeColumn
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const[loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Size Id copied to clipboard")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh()
            toast.success("Size deleted")
        } catch (error) {
            toast.error("Make sure you removed all products using this size first.")
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
    onConfirm={onDelete}
    loading={loading}/>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open Menu</span>
                    <MoreHorizontal className='h-4 w-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => onCopy(data.id)}
                className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
                className="flex items-center gap-2">
                    <Edit className=" h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem 
                onClick={() => setOpen(true)}
                className="flex items-center gap-2">
                    <Trash className=" h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </>
  )
}

export default CellAction
