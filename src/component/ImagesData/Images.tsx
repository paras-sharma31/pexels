import { Box, Button, Container, Grid, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '@chakra-ui/react'
import { ModalType, setModal } from '../../store/modalSlice.ts';
import { useAppDispatch } from '../../store/store.ts';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import CommonModal from '../CommonModal/CommonModal.tsx';

interface ImagesProps {
    openImageModal: (id: number) => void;
    fetchMoreData: () => void;
    downloadImage: (url: string, filename: string) => void;
    data: Array<any>;
    hasMore: boolean;
    imageCategoryData?: Array<any>;
    loadMore?: () => void;
    search?: string;
}

const Images: React.FC<ImagesProps> = ({ openImageModal, fetchMoreData, downloadImage, data = [], hasMore, imageCategoryData = [], loadMore, search = "" }) => {
    const [imageSrc, setImageSc] = useState<Array>([])
    const dispatch = useAppDispatch()
    return (
        <section>
            <CommonModal imageSrc={imageSrc} />
            <Box>
                <InfiniteScroll
                    dataLength={search ? imageCategoryData.length : data.length} // This is an important field to render the next data
                    next={search ? loadMore || fetchMoreData : fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="md" />
                        </div>
                    }
                    style={{ padding: '3rem  0.5rem' }}

                    scrollThreshold={0.9}
                >
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3 }}
                    >
                        <Masonry>
                            {(search ? imageCategoryData : data).map((image, index) => (
                                <Container key={image.id} position='relative' _hover={{ '.hover-button': { display: 'block' } }} padding='1rem'>
                                    <Image src={image.src.large2x} alt={image.photographer} onClick={() => {
                                        openImageModal(image.id)
                                        dispatch(setModal({
                                            modalType: ModalType.Image, // Changed to camelCase
                                            modalSize: '6xl',  // Changed to camelCase
                                            id: image.id,
                                        }));
                                        setImageSc(image.src)

                                    }} />
                                    <Box position="relative">
                                        <Container display='none' className="hover-button">
                                            <Button
                                                background='rgba(0, 0, 0, .64)'
                                                borderRadius='50px'
                                                position="absolute"
                                                bottom={{ base: 2 }}
                                                right={{ base: 3 }}
                                                onClick={() => downloadImage(image.src.portrait, `photo-${index + 1}.jpg`)}
                                                variant="solid"
                                                _hover={{ cursor: 'pointer', bg: '#05a081' }}
                                            >
                                                <MdOutlineFileDownload className="download-icon" />
                                            </Button>
                                        </Container>
                                    </Box>
                                </Container>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll>
            </Box>

        </section>
    );
};

export default Images;
