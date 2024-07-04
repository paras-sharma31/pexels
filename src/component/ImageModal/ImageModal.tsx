import React from 'react';
import {
    AspectRatio,
    Box,
    Button, Center, Container, Flex, Heading, Image, Menu, MenuButton, MenuList, ModalBody, Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdOutlineFileDownload } from 'react-icons/md';

const ImageModal = ({ imageSrc, downloadImage }) => {
    console.log(Object.keys(imageSrc), 'srsadfadsfc', imageSrc)
    return (
        <ModalBody pb={6}>
            <Flex w='full' justifyContent="center" direction="column" _hover={{ '.hover-button': { display: 'block' } }}>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                width="20%"
                                alignSelf="end"
                                justifyContent="space-between"
                                top="-20px"
                                right="40px"
                                position="relative"
                                zIndex="1"
                                className="hover-button"
                            >
                                {isOpen ? 'Free Download' : 'Free Download'}
                            </MenuButton>
                            <MenuList width="30%" p="5px">
                                <Heading fontSize="18px" fontWeight={500}>
                                    Choose a size:
                                </Heading>
                                {Object.keys(imageSrc)?.map((item) => {
                                    console.log(imageSrc[item], 'item')
                                    return (<Text
                                        fontSize="18px"
                                        fontWeight={700}
                                        color="gray"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        p="10px"
                                        borderBottom="1px solid gray"
                                        textTransform='capitalize'
                                    >
                                        {item}
                                        <Button onClick={() => downloadImage(imageSrc[item], `photo.jpg`)}>
                                            <MdOutlineFileDownload />
                                        </Button>
                                    </Text>)
                                })}
                            </MenuList>
                        </>
                    )}
                </Menu>
                {/* <Box h='full' maxH='34rem' w='auto' bg={imageSrc.original} /> */}
                <Image h='full' maxH='34rem' w='auto' src={imageSrc.original} objectFit='contain' />
            </Flex>
        </ModalBody>





    )
}

export default ImageModal;
