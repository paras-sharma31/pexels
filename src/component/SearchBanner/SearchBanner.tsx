import React from 'react';
import { Box, Container, Input, Text, VStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { setSearch } from '../../Store/imageSlice.ts';
import './search.scss'



export const SearchBanner: React.FC = () => {

    const [input, setInput] = useState<string>("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        dispatch(setSearch(e.target.value))
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate(`search/${input}`)
        console.log(e, "2038423084023842308")
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
                            onChange={searchFilter}
                        />
                    </form>
                </Container>
            </VStack>
        </Box>
    )
}
