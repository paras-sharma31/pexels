import React from 'react';
import { Box, Container, Input, Text, VStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { setSearch } from '../../store/imageSlice.ts';
import './search.scss'

export const SearchBanner: React.FC = () => {

    const [input, setInput] = useState<string>("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        dispatch(setSearch(e.target.value))
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input) {
            dispatch(setSearch(input));
            navigate(`/search?photo=${input}`)
        }
    }

    return (
        <Box className='banner-img' objectFit={'cover'} backgroundPosition={'center'} height={{ xl: '400px' }} display='flex' justifyContent='center' alignItems='center'>
            <VStack>
                <Container maxW='container.sm' color='white'>
                    <Text fontSize='33px' color='white' fontWeight={600} >
                        The best free stock photos, royalty free images & videos shared by creators.
                    </Text>
                </Container>
                <Container >
                    <form onSubmit={handleSubmit}>
                        <Input type='search' placeholder='search for free photos...'
                            size='lg' bg={'white'} color={'gray'} my='2'
                            value={input}
                            onChange={searchFilter}
                        />
                    </form>
                </Container>
            </VStack>
        </Box>
    )
}
