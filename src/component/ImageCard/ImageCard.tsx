import React from 'react';
import {
    Button, Flex, Heading, Image, Menu, MenuButton, MenuList, ModalBody, Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdOutlineFileDownload } from 'react-icons/md';

const ImageCard = ({ imageSrc, downloadImage }) => {
    return (
        <ModalBody pb={6}>
            <Flex w="full" justifyContent="center" direction="column">
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                as={Button}
                                width={{ xl: "20%", md: '25%' }}
                                alignSelf="end"
                                justifyContent="space-between"
                                top="-20px"
                                right="40px"
                                position="relative"
                                zIndex="1"
                                rightIcon={<ChevronDownIcon />}
                            >
                                Free Download
                            </MenuButton>
                            <MenuList width={{ xl: '30%', md: '20%' }} p="5px">
                                <Heading fontSize="18px" fontWeight={500}>
                                    Choose a size:
                                </Heading>
                                {Object.keys(imageSrc).map((item, index) => (
                                    <Text
                                        key={index}
                                        fontSize="18px"
                                        fontWeight={700}
                                        color="gray"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        p={{ base: 1, sm: 2 }}
                                        borderBottom="1px solid gray"
                                        textTransform="capitalize"
                                    >
                                        {item}
                                        <Button onClick={() => downloadImage(imageSrc[item], `photo-${item}.jpg`)}>
                                            <MdOutlineFileDownload />
                                        </Button>
                                    </Text>
                                ))}
                            </MenuList>
                        </>
                    )}
                </Menu>
                <Image h="full" maxH="34rem" w="auto" src={imageSrc.original} objectFit="contain" />
            </Flex>
        </ModalBody>
    );
};

export default ImageCard;
