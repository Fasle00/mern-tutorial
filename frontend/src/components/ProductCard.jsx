import {
    Box, Image, Text, HStack, IconButton, useColorModeValue, Heading, useToast, Modal, useDisclosure, ModalContent, ModalHeader, ModalCloseButton,
    ModalOverlay, VStack, ModalBody, Input, Button, ModalFooter,
} from "@chakra-ui/react"


import { useProductStore } from "../store/product";
import { useState } from 'react'
import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const textColor = useColorModeValue("white", "gray.100")
    const bg = useColorModeValue("#3A3A3A", "#3A3A3A")

    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct)
        onClose()
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Success',
                description: "Product updated successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (

        <Link to={`/product/${product._id}`}>
            <Box
                shadow='lg'
                overflow='hidden'
                transition='all 0.3s'
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                bg={bg}
                style={{ fontFamily: 'Lora' }}
                position={"relative"}
                
            >
                {/*             <Image src={product.image} alt={product.name} h='100%' w='full' objectFit='contain' aspectRatio={2/3} />
 */}
                <Image src={product.imageRed} alt={product.name} h='100%' w='full' objectFit='cover' aspectRatio={2 / 3} />


                <Box p={2} position={"absolute"} bottom={3} right={3} left={3} bg={"#3A3A3A"} color={"white"} paddingLeft={3} paddingRight={3} >

                    <HStack justifyContent={"space-between"} >
                        <Text fontWeight='bold' fontSize='xl' color={textColor}>
                            {product.name}


                        </Text>

                        <Text fontWeight='bold' fontSize='xl' color={textColor}>
                            {product.price}:-


                        </Text>




                    </HStack>


                    {/*                 <Box>
                <HStack spacing={1}>
                
                
                <IconButton icon={<FaEdit size={20} />}  onClick={onOpen} colorScheme="blue" />
                <IconButton icon={<MdDeleteForever size={25} />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
                </Box> */}


                </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />

                    <ModalContent>
                        <ModalHeader>Update Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <Input placeholder="Product Name" name="name" value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
                                <Input placeholder="Price" name="price" type='number' value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                                <Input placeholder="Image URL" name="image" value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                                Update
                            </Button>
                            <Button variant='ghost' onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Link>
    )
}

export default ProductCard