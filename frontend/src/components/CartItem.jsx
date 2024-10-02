import { useState } from "react";
import { useCartStore } from '../store/cart';
import { 
    Text, 
    Button, 
    Box, 
    Input, 
    InputLeftAddon, 
    InputGroup, 
    VStack, 
    HStack, 
    useColorModeValue,
    useToast,
    useDisclosure,
    IconButton
    
} from '@chakra-ui/react';
import  {DeleteIcon} from "@chakra-ui/icons"
const CartItem = ({ cart }) => {
    const [updatedCart, setUpdatedCart] = useState(cart);

   
    const { deleteCartItem, updateCartItem } = useCartStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

   



   
    
    const handleDeleteCart = async () => {
        const { success, message } = await deleteCartItem();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdateCart = async ( updatedCart) => {
        const { success, message } = await updateCartItem( updatedCart);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    


    return (
        <Box bg={"bg"}   >
            <HStack spacing={"15%"}>
                <img src="img/svartKatt.jpeg" alt="" />

                <VStack >


<Text> {cart.color}</Text>
<Text> {cart.size}</Text>
<Text> {cart.amount}</Text>
                    <Text > a</Text>
                   
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteCart(cart._id)} colorScheme="red" />
                </VStack>
            </HStack>
        </Box>

    )
}
export default CartItem