"use client"
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useDelete } from '@/services/delete';
import { useRouter } from 'next/navigation';

interface DeleteI {
    isOpen: any
    onOpen: any
    onOpenChange: any
    afterDelete: any
    url: string
    title: string
}

export default function ModalDelete({ isOpen, onOpen, onOpenChange, url, title, afterDelete }: DeleteI) {

    const { data, error, isLoading, isDeleted, deleteEntry } = useDelete(url)
    const router = useRouter()
    const [handleClose, setHandleClose] = useState<any>(null)
    const handleDelete = (onClose: any) => {
        deleteEntry()
        setHandleClose(onClose)
    }


    useEffect(() => {
        if (isDeleted) {
            afterDelete()
            if(handleClose) handleClose()
        }
    }, [isDeleted])

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Eliminar Blog</ModalHeader>
                        <ModalBody>
                            <p>
                                ¿Está seguro que quiere eliminar {title}?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="bordered" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="danger" onPress={() => { handleDelete(onClose) }} isLoading={isLoading}>
                                Delete
                            </Button>
                            {
                                error && <p className="text-danger">Un error ocurrio</p>
                            }
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
