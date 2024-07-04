import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store.ts'
import { Layout } from '../../component/Layout/index.tsx';
import { fetchPopularVideos } from '../../store/videoSlice.ts';
import Video from '../../component/VideosData/Video.tsx';
import VideoSerchBanner from '../../component/VideoSearchBanner/VideoSerchBanner.tsx';
import { useNavigate } from 'react-router-dom';

const Videos: React.FC = () => {
    const video = useAppSelector((state) => state.videos.data);
    const page = useAppSelector((state) => state.videos.page);
    const hasMore = useAppSelector((state) => state.videos.hasMore);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()


    useEffect(() => {
        if (page === 1) {
            dispatch(fetchPopularVideos(1))
        }
    }, [dispatch, page])


    const handleLoadMore = () => {
        if (hasMore) {
            dispatch(fetchPopularVideos(page + 1))
        }
    }
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
    };

    const openImageModal = (id: number) => {
        // navigate({ search: `?video=${id}` });
    };


    return (
        <Layout>
            <VideoSerchBanner />
            <Video
                video={video}
                hasMore={hasMore}
                handleLoadMore={handleLoadMore}
                fetchMoreData={handleLoadMore}
                downloadImage={downloadImage}
                openImageModal={openImageModal}

            />
        </Layout>
    );
}

export default Videos;
