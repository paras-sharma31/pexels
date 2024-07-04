import { Box, Button, Container, Grid, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '@chakra-ui/react'
import ModalBox from '../Modal/Modal.tsx';
import { ModalType, setModal } from '../../store/modalSlice.ts';
import { useAppDispatch } from '../../store/store.ts';
import Masonry from "react-responsive-masonry"

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
            <ModalBox imageSrc={imageSrc} />
            <InfiniteScroll
                dataLength={search ? imageCategoryData.length : data.length} // This is an important field to render the next data
                next={search ? loadMore || fetchMoreData : fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="md" />
                    </div>
                }
                style={{ padding: '4rem 1.5rem' }}
                scrollThreshold={0.9}

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
                                console.log(image, "023840328402")
                                setImageSc(image.src)

                            }} />
                            <Box position="relative">
                                <Container display='none' className="hover-button">
                                    <Button
                                        position="absolute"
                                        bottom="20px"
                                        right="20px"
                                        onClick={() => downloadImage(image.src.portrait, `photo-${index + 1}.jpg`)}
                                        variant="solid"
                                        _hover={{ cursor: 'pointer', bg: '#05a081' }}
                                    >
                                        <MdOutlineFileDownload className="download-icon" />
                                        Download
                                    </Button>
                                </Container>
                            </Box>
                        </Container>
                    ))}
                </Masonry>
            </InfiniteScroll>
        </section>
    );
};

export default Images;
