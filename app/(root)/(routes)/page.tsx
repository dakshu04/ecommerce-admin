"use client"

import { StoreModal } from "@/components/modals/store-modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { ModalProvider } from "@/provider/modal-provider"
import { useEffect } from "react"

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen)
    const isOpen = useStoreModal((state) => state.isOpen)

    useEffect(() => {
        if(!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])

    return (
        <div className="">
            <StoreModal />
        </div>
    )
}

export default SetupPage