'use client'
import React from 'react'
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    List,
    ListItem,
} from '@chakra-ui/react'

// import Logo from '../../../assests/images.jpeg'
import { CgProfile } from 'react-icons/cg'
import { IoIosNotifications } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export default function NavBarChakra() {

    const navigate = useNavigate()

    const nagivateToVideoPage = () => {
        navigate('/video')
    }
    const naviagteHomepage = () => [
        navigate('/')
    ]

    return (
        <Box px={4} position={'sticky'} top={0} zIndex={4} boxShadow='md' p='6' rounded='md' bg='white'>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Menu >
                    <MenuButton
                        as={Button}
                        borderRadius='md'
                        rounded={'Square'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}
                        onClick={naviagteHomepage}>
                        <Avatar
                            size={'md'}
                            src="/images/images.jpeg"

                        />
                    </MenuButton>

                    <Menu>
                        <List display={'flex'} alignItems={'center'} gap={'30px'} fontSize={'18'} fontWeight={'500'} cursor={'pointer'}>
                            <ListItem>
                                Explore
                            </ListItem>
                            <ListItem onClick={nagivateToVideoPage}>
                                Videos
                            </ListItem>
                            <ListItem>
                                <IoIosNotifications className='icon' />
                            </ListItem>
                            <ListItem>
                                <CgProfile />
                            </ListItem>
                        </List>
                    </Menu>
                </Menu>
            </Flex>
        </Box>
    )
}