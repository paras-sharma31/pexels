import React, { useEffect } from 'react';
import { Container, Heading, Box } from '@chakra-ui/react';
import { ImagesSlice, searchData, setSearch } from '../../store/imageSlice.ts';
import { Layout } from '../../component/Layout/index.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import Images from '../../component/ImagesData/Images.tsx';
import { useLocation, useNavigate } from 'react-router-dom';


const SearchImage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { imageCategoryData, hasMore, search, page } = useAppSelector((state: { data: ImagesSlice }) => state.data);
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('photo')

    useEffect(() => {
        if (query) {
            dispatch(setSearch(query));
            dispatch(searchData({ query: search, page: 1 }));
        }
    }, [dispatch, search]);

    const loadMore = () => {
        if (search) {
            dispatch(searchData({ query: search, page }));
        }
    };

    const openImageModal = (id: number) => {
        navigate({ search: `?image=${id}` });
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
    };

    return (
        <Layout>
            <Box>
                <Container>
                    <Heading textAlign='center' fontSize='50px' p='20px' my='20px' textTransform={'capitalize'}>
                        {search} image
                    </Heading>
                </Container>
                <Images
                    openImageModal={openImageModal}
                    imageCategoryData={imageCategoryData}
                    loadMore={loadMore}
                    search={search}
                    data={[]}
                    fetchMoreData={() => { }}
                    hasMore={hasMore}
                    downloadImage={downloadImage}
                />
            </Box>
        </Layout>
    );
};

export default SearchImage;
