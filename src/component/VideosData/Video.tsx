import { Box, Button, Container, Grid, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch } from '../../store/store.ts';
import { ModalType, setModal } from '../../store/modalSlice.ts';
import ModalBox from '../Modal/Modal.tsx';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


interface VideoFile {
    link: string;
    id: number;
    quality: 'hd'
}

interface VideoData {
    video_files: VideoFile[];
    image: string;
}

interface VideoProps {
    video: VideoData[];
    hasMore: boolean;
    handleLoadMore: () => void;
    fetchMoreData: () => void;
    openImageModal: (id: number) => void;
    downloadImage: (url: string, filename: string) => void;
    search: string;
    categoryVideos: VideoData[];
}
const Video: React.FC<VideoProps> = ({ video = [], hasMore, handleLoadMore, categoryVideos = [], search, fetchMoreData, openImageModal, downloadImage }) => {
    const [videoUrl, setVideoUrl] = useState<Array>([])
    const dispatch = useAppDispatch()
    console.log(video, 'video')
    return (
        <section>
            <ModalBox src={videoUrl} />
            <InfiniteScroll
                dataLength={search ? categoryVideos.length : video.length}
                next={search ? handleLoadMore || fetchMoreData : fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="md" />
                    </div>
                }
                style={{ padding: '3rem  1.5rem' }}
                scrollThreshold={0.9}
            >

                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3 }}
                >
                    <Masonry>
                        {
                            (search ? categoryVideos : video).map((videos, index) => (
                                <Container key={index} position='relative' _hover={{ '.hover-button': { display: 'block' } }} className="video-container" padding='1rem'>
                                    <video
                                        src={videos.image}
                                        poster={videos.image}
                                        className="video-item"
                                        onClick={() => {
                                            openImageModal(videos.video_files[0].id);
                                            setVideoUrl(videos.video_files);
                                            dispatch(
                                                setModal({
                                                    modalType: ModalType.Video,
                                                    modalSize: '6xl',
                                                    id: videos.video_files[0].id,
                                                })
                                            );
                                        }}
                                    />
                                    <Box position="relative">
                                        <Container display='none' className="hover-button">
                                            <Button
                                                background='rgba(0, 0, 0, .64)'
                                                borderRadius='50px'
                                                position="absolute"
                                                bottom={{ base: 2 }}
                                                right={{ base: 4, }}
                                                variant="solid"
                                                onClick={() => downloadImage(videos.video_files[0].link, `video-${index + 1}.mp4`)}
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

        </section >

    );
}

export default Video;
