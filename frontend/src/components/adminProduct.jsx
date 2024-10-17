import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    VStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    Card,
    Container,
    Stack,
    Checkbox,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";


const AdminProduct = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { getDisclosureProps, getButtonProps, } = useDisclosure()

    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()


    // Delete function
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 1500,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 1500,
                isClosable: true,
            });
        }
    };

    // Update function
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onEditClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 1500,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
            as='a'
        >

            <Image src={product.imageRed} alt={product.name} h={48} w='full' objectFit='cover' href={`/product/${product._id}`} />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    {product.price}:-
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onEditOpen} colorScheme='blue' />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={onDeleteOpen}
                        colorScheme='red'
                    />
                </HStack>
            </Box>

            <Modal isOpen={isEditOpen} onClose={onEditClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />

                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={updateProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />

                        <Input
                            placeholder='Product Description'
                            name='description'
                            value={updateProduct.description}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                        />

                        <Text>Color</Text>

                        <Button {...buttonProps} colorScheme='red'> Red</Button>
                        <Input {...disclosureProps}
                            placeholder='Image URL'
                            name='imageRed'
                            value={updateProduct.imageRed}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageRed: e.target.value })}
                        />
                        <Button {...buttonProps} colorScheme='green'> Green</Button>
                        <Input {...disclosureProps}
                            placeholder='Image URL'
                            name='imageGreen'
                            value={updateProduct.imageGreen}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageGreen: e.target.value })}
                        />

                        <Button {...buttonProps} colorScheme='blue'> Blue</Button>
                        <Input {...disclosureProps}
                            placeholder='Image URL'
                            name='imageBlue'
                            value={updateProduct.imageBlue}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageBlue: e.target.value })}
                        />
                        <Button {...buttonProps} colorScheme='yellow'> Yellow</Button>
                        <Input {...disclosureProps}
                            placeholder='Image URL'
                            name='imageYellow'
                            value={updateProduct.imageYellow}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageYellow: e.target.value })}
                        />

                        {/* Uppdatera category */}
                        <HStack spacing={"3rem"}
                            placeholder='Category'
                            name='category'
                            value={updateProduct.category}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
                        >
                            <RadioGroup>
                                <Radio value={updateProduct.category = "barn"}> Barn</Radio>
                                <Radio value={updateProduct.category = "herr"}> Herr</Radio>
                                <Radio value={updateProduct.category = "Dam"}> Dam </Radio>
                            </RadioGroup>
                        </HStack>


                        {/* Uppdatera type */}
                        <HStack spacing={"3rem"}
                            placeholder='Type'
                            name='type'
                            value={updateProduct.type}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, type: e.target.value })}
                        >
                            <RadioGroup>
                                <Radio value={updateProduct.type = "T-shirt"}> T-shirt</Radio>
                                <Radio value={updateProduct.type = "Byxor"}> Byxor</Radio>
                                <Radio value={updateProduct.type = "Hoodie"}> Hoodie </Radio>
                                <Radio value={updateProduct.type = "Accessoarer"}> Accessoarer </Radio>
                                <Radio value={updateProduct.type = "Skor"}> Skor </Radio>
                            </RadioGroup>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onEditClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            {/* Delete product modal */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Delete Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this product?
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            Delete
                        </Button>
                        <Button onClick={onDeleteClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
export default AdminProduct;