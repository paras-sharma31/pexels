import React from 'react';
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
import VideoCard from '../VideoCard/VideoCard.tsx';
import ImageCard from '../ImageCard/ImageCard.tsx';

const CommonModal = ({ imageSrc, src }) => {
    const { onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const modalState = useAppSelector(getModalState);

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

    const renderModalContent = () => {
        switch (modalState.modalType) {
            case ModalType.Video:
                return <VideoCard videoSrc={src} downloadImage={downloadImage} />;
            case ModalType.Image:
                return <ImageCard imageSrc={imageSrc} downloadImage={downloadImage} />;
            default:
                return null;
        }
    };

    return (
        <Modal closeOnOverlayClick={false} size={modalState.modalSize} isOpen={modalState.modalType} preserveScrollBarGap isCentered onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalState.modalType === ModalType.Image ? 'Image' : 'Video'}</ModalHeader>
                <ModalCloseButton />
                {renderModalContent()}
            </ModalContent>
        </Modal>
    );
};

export default CommonModal;
