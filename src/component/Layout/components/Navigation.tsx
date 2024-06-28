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

export default function NavBarChakra() {

    return (
        <>
            <Box px={4} position={'sticky'} top={0} zIndex={1} boxShadow='md' p='6' rounded='md' bg='white'>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Menu >
                        <MenuButton
                            as={Button}
                            borderRadius='md'
                            rounded={'Square'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'md'}
                                src="/images/images.jpeg"
                            />
                        </MenuButton>

                        <Menu>
                            <List display={'flex'} alignItems={'center'} gap={'30px'} fontSize={'18'} fontWeight={'500'}>
                                <ListItem>
                                    Explore
                                </ListItem>
                                <ListItem>
                                    License
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
        </>
    )
}