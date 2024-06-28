import React, { useEffect, useState } from 'react';
import {
    AspectRatio,
    Button,
    Container,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    Heading,
    Text
} from '@chakra-ui/react';
import { ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdOutlineFileDownload } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../Store/Store.ts';
import { ImagesSlice, fetchSinglePhoto } from '../../Store/imageSlice.ts';

const ImageModalBox = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const images = useAppSelector((state: { data: ImagesSlice }) => state.data.imageModalBox);
    const dispatch = useAppDispatch();
    const [params] = useSearchParams();
    const [imageUrl, setImageUrl] = useState<string>("");
    const navigate = useNavigate();

    const imageId = params.get("image");
    console.log(images, 'images')
    console.log(imageUrl, 'imageUrl')

    useEffect(() => {
        if (imageId) {
            dispatch(fetchSinglePhoto(Number(imageId)));
            onOpen();
        } else {
            onClose();
        }
    }, [imageId, dispatch, onOpen, onClose]);

    useEffect(() => {
        if (images.length > 0) {
            const image = images.find((i: any) => i.id === Number(imageId));
            if (image) {
                setImageUrl(image.src.original);
            }
        }
    }, [images, imageId]);

    if (!imageId) {
        return null;
    }

    const image = images.find((i: any) => i.id === Number(imageId));

    const handleClose = () => {
        setImageUrl("");
        navigate('/');
    }

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
    }

    return (
        <Modal closeOnOverlayClick={false} size='4xl' isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{image?.alt}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {image && (
                        <>
                            <Container display="flex" justifyContent='center' flexDirection="column"
                                _hover={{ '.hover-button': { display: 'block' } }}>

                                <Menu>
                                    {({ isOpen }) => (
                                        <>
                                            <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />} width='30%' alignSelf="end"
                                                justifyContent='space-between' top={'50px'}
                                                right={'40px'}
                                                position="relative"
                                                zIndex='1'
                                                className='hover-button'>
                                                {isOpen ? 'Close' : 'Free download'}
                                            </MenuButton>
                                            <MenuList width='30%' p='10px'>
                                                <Heading fontSize='18px' fontWeight={500} >Choose a size:</Heading>
                                                <Text fontSize='18px' fontWeight={700} color='gray' display='flex' justifyContent='space-between' alignItems='center' p='10px' borderBottom='1px solid gray'>Orginal:
                                                    <Button onClick={() => downloadImage(image.src.original, `photo-${image.id}.jpg`)}>
                                                        <MdOutlineFileDownload />
                                                    </Button>
                                                </Text>

                                                <Text fontSize='18px' fontWeight={700} display='flex' color='gray' justifyContent='space-between' alignItems='center' p='10px' borderBottom='1px solid gray'>Portrait:
                                                    <Button onClick={() => downloadImage(image.src.portrait, `photo-${image.id}.jpg`)}>
                                                        <MdOutlineFileDownload />
                                                    </Button>
                                                </Text>

                                                <Text fontSize='18px' fontWeight={700} color='gray' display='flex' justifyContent='space-between' alignItems='center' p='10px'>Large:
                                                    <Button onClick={() => downloadImage(image.src.large, `photo-${image.id}.jpg`)}>
                                                        <MdOutlineFileDownload />
                                                    </Button>
                                                </Text>

                                            </MenuList>
                                        </>
                                    )}
                                </Menu>
                                {/* <Button
                                    alignSelf="end"
                                    justifyContent='space-between'
                                    width={50}
                                    top={'50px'}
                                    right={'40px'}
                                    position="relative"
                                    zIndex='1'
                                    className='hover-button'
                                    variant={{ md: 'md' }}
                                    onClick={() => downloadImage(image.src.original, `photo-${image.id}.jpg`)}
                                >
                                    <MdOutlineFileDownload />
                                </Button> */}

                                {imageUrl && (
                                    <Container className='slideshow-container'>
                                        <Container className='mySlides fade'>
                                            <AspectRatio maxW='800px' ratio={1}>
                                                <Image src={imageUrl} objectFit='contain' />
                                            </AspectRatio>
                                        </Container>
                                    </Container>
                                )}
                            </Container>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ImageModalBox;
