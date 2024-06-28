import { Box, Button, Container, Grid, Image } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageModalBox from '../ModalImagebox/ImageModalBox.tsx';
import { Spinner } from '@chakra-ui/react'

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
    return (
        <section>
            <ImageModalBox />
            <InfiniteScroll
                dataLength={search ? imageCategoryData.length : data.length} // This is an important field to render the next data
                next={search ? loadMore || fetchMoreData : fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' size='md' display='flex' justifyContent='center' alignContent='center' />}
                style={{ padding: '3rem 1.5rem' }}
                scrollThreshold={0.9}
            >
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    {(search ? imageCategoryData : data).map((image, index) => (
                        <Container key={index} position='relative' _hover={{ '.hover-button': { display: 'block' } }}>
                            <Image src={image.src.portrait} alt={image.photographer} onClick={() => openImageModal(image.id)} />
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
                </Grid>
            </InfiniteScroll>
        </section>
    );
};

export default Images;
