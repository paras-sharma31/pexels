import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Menu, MenuButton, MenuList, ModalBody, Text, } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md'
const VideoModal = ({ videoSrc, downloadImage }) => {
    console.log(videoSrc, 'videoSrc')
    return (
        <ModalBody pb={6}>
            <Flex w='full' justifyContent="center" direction="column" >
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                as={Button}
                                width="20%"
                                alignSelf="end"
                                justifyContent="space-between"
                                top="-20px"
                                right="40px"
                                position="relative"
                                zIndex="1"
                                className="hover-button"
                                rightIcon={<ChevronDownIcon />}
                            >
                                {isOpen ? 'Free Download' : 'Free Download'}
                            </MenuButton>
                            <MenuList width="30%" p="10px">
                                <Heading fontSize="18px" fontWeight={500}>
                                    Choose a size:
                                </Heading>
                                {Object.keys(videoSrc)?.map((item) => {
                                    console.log(videoSrc[item], 'item')
                                    return (<Text
                                        fontSize="18px"
                                        fontWeight={700}
                                        color="gray"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        p="10px"
                                        borderBottom="1px solid lightgray"
                                        textTransform='capitalize'
                                    >
                                        {videoSrc[item].width}p
                                        <Button onClick={() => downloadImage(videoSrc[item], `video.mp4`)}>
                                            <MdOutlineFileDownload />
                                        </Button>
                                    </Text>)
                                })}
                            </MenuList>
                        </>
                    )}
                </Menu>
                <Box h='full' maxH='34rem' w='auto' as='video' src={videoSrc[1].link} controls autoPlay loop muted />
            </Flex>
        </ModalBody>







    )
}

export default VideoModal