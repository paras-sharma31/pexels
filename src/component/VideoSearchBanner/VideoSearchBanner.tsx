import { Box, Container, Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearch } from '../../store/videoSlice.ts';

const VideoSearchBanner: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const search = formData.get('search')
        if (search) {
            dispatch(setSearch(search));
            navigate(`/videos?video=${search}`);
        }
    };
    return (
        <Box position="relative" width="100%" height={{ base: '50vh', xl: '80vh' }} overflow="hidden">
            <Box
                as='video'
                src='https://static.pexels.com/lib/videos/free-videos.mp4'
                autoPlay
                muted
                loop
                objectFit='cover'
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                zIndex="-2"
            />
            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bg="rgba(0, 0, 0, 0.5)"
                zIndex="-1"
            />
            <VStack
                spacing={6}
                justifyContent="center"
                alignItems="center"
                height="100%"
                position="relative"
                zIndex="1"
                color="white"
                textAlign="center"
            >
                <Container maxW='container.sm'>
                    <Text fontSize='33px' fontWeight={600} textAlign='start'>
                        The best free stock videos shared by the Pexels community.
                    </Text>
                </Container>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type='search'
                            placeholder='search for free photos...'
                            size='lg'
                            bg='white'
                            color='gray'
                            my='2'
                            name='search'
                        />
                    </form>
                </Container>
            </VStack>
        </Box>
    );
};

export default VideoSearchBanner;
