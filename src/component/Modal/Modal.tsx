import React, { useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,

} from '@chakra-ui/react';

import { closeModal, getModalState, ModalType } from '../../store/modalSlice.ts';
import VideoModal from '../VideoModal/VideoModal.tsx';
import ImageModal from '../ImageModal/ImageModal.tsx';

const ModalBox = ({ imageSrc, src }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const modalState = useAppSelector(getModalState);
    console.log(modalState, 'modalState')
    console.log(modalState.modalType, 'images')
    console.log(modalState.modalType, 'type')

    useEffect(() => {
        if (modalState.modalType) {
            onOpen()
        } else {
            onClose();
        }
    }, [modalState.modalType, onOpen])

    const handleClose = () => {
        onClose();
        dispatch(closeModal());
    };

    const downloadImage = async (url: string, filename: string) => {
        const response = await fetch(url, { mode: 'cors' });
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); // Clean up after download
    }
    console.log(src, 'src')

    const renderModalContent = () => {
        switch (modalState.modalType) {
            case ModalType.Video:
                return <VideoModal videoSrc={src} downloadImage={downloadImage} />;
            case ModalType.Image:
                return <ImageModal imageSrc={imageSrc} downloadImage={downloadImage} />;
            default:
                return null;
        }
    };

    return (
        <Modal closeOnOverlayClick={false} size={modalState.modalSize} isOpen={isOpen} preserveScrollBarGap isCentered onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalState.modalType === ModalType.Image ? 'Image' : 'Video'}</ModalHeader>
                <ModalCloseButton />
                {renderModalContent()}
            </ModalContent>
        </Modal>
    );
};

export default ModalBox;
