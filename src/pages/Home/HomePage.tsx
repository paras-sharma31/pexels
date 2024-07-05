import React, { useEffect } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { Layout } from '../../component/Layout/index.tsx';
import { SearchBanner } from '../../component/SearchBanner/SearchBanner.tsx';
import Images from '../../component/ImagesData/Images.tsx';
import { fetchData } from '../../store/imageSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const data = useAppSelector((state) => state.data.data);
    const page = useAppSelector((state) => state.data.page);
    const hasMore = useAppSelector((state) => state.data.hasMore);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (page === 1) {
            dispatch(fetchData(1));
        }
    }, [dispatch, page]);

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

    const fetchMoreData = () => {
        if (hasMore) {
            dispatch(fetchData(page + 1));
        }
    };

    const openImageModal = (id: number) => {
        navigate({ search: `?image=${id}` });
    };

    return (
        <Layout>
            <SearchBanner />
            <Container>
                <Heading textAlign="center" fontSize="50px" p="20px" my="20px">
                    Free Stock Photos
                </Heading>
            </Container>
            <Images
                openImageModal={openImageModal}
                fetchMoreData={fetchMoreData}
                downloadImage={downloadImage}
                data={data}
                hasMore={hasMore}
            />
        </Layout>
    );
};

export default HomePage;
