import React, { useEffect } from 'react';
import { Layout } from '../../component/Layout/index.tsx';
import { Box, Container, Heading } from '@chakra-ui/react';
import Video from '../../component/VideosData/Video.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { fetchSearchVideos, setSearch } from '../../store/videoSlice.ts';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchVideo: React.FC = () => {
    const dispatch = useAppDispatch();
    const categoryVideos = useAppSelector((state) => state.videos.categoryVideos);
    const page = useAppSelector((state) => state.videos.page);
    const search = useAppSelector((state) => state.videos.search);
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('video');

    useEffect(() => {
        if (query) {
            dispatch(setSearch(query));
            dispatch(fetchSearchVideos({ query: search, page: 1 }));
        }
    }, [dispatch, search]);

    const fetchMoreData = () => {
        if (search) {
            dispatch(fetchSearchVideos({ query: search, page }));
        }
    };
    const openImageModal = (id: number) => {
        navigate({ search: `?video=${id}` });
    };

    return (
        <Layout>
            <Box>
                <Container>
                    <Heading textAlign='center' fontSize='50px' p='20px' my='20px' textTransform={'capitalize'}>
                        {search} Video
                    </Heading>
                </Container>
                <Video
                    categoryVideos={categoryVideos}
                    search={search}
                    fetchMoreData={fetchMoreData}
                    openImageModal={openImageModal}

                />
            </Box>
        </Layout>
    );
};

export default SearchVideo;
