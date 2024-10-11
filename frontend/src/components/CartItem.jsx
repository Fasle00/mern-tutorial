import { useState } from "react";
import { useCartStore } from '../store/cart';
import {
    Text,
    Button,
    Box,
    Image,
    Input,
    InputLeftAddon,
    InputGroup,
    VStack,
    HStack,
    useColorModeValue,
    useToast,
    useDisclosure,
    IconButton,
    Icon

} from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import { color } from "framer-motion";
import { FaCircle } from "react-icons/fa";
const CartItem = ({ cart }) => {
    const [updatedCart, setUpdatedCart] = useState(cart);


    const { deleteCartItem, updateCartItem } = useCartStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();





    
    
    const handleDeleteCart = async () => {
        console.log("cart", cart)
        const { success, message } = await deleteCartItem(cart._id, cart.color, cart.size);
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

    const handleUpdateCart = async (updatedCart) => {
        const { success, message } = await updateCartItem(updatedCart);
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

let Displaycolor 


    return (
        <Box bg={"bg"}   >
            <HStack p={"3%"} bg={"#3A3A3A"}>



                {cart.color === "röd" && (
                   Displaycolor="red" ,
                    <>
                   
                        <Box >
                            
                            <Image src={cart.imageRed} w={"35rem"} minW={"5rem"} aspectRatio={1/1} objectFit={"cover"} alt="image"></Image>
                        </Box>
                    </>
                   
                    
                     
                )}
                {cart.color === "grön" && (
                   Displaycolor="green",
                   
                   <>
                        <Box >
                            <Image src={cart.imageGreen} w={"35rem"} minW={"5rem"} aspectRatio={1/1} objectFit={"cover"} alt="image"></Image>
                        </Box>

                    </>

                    
                )}
                {cart.color === "blå" && (
                    Displaycolor="blue" ,<>
                        <Box >
                            <Image src={cart.imageBlue} w={"35rem"} minW={"5rem"} aspectRatio={1/1} objectFit={"cover"} alt="image"></Image>
                        </Box>

                    </>

                    
                )}
                {cart.color === "gul" && (
                  Displaycolor="yellow" , <>
                        <Box >
                            <Image src={cart.imageYellow} w={"35rem"}minW={"5rem"} aspectRatio={1/1} objectFit={"cover"} alt="image"></Image>
                        </Box>

                    </>

                    
                )}
                <VStack >

                    <Box fontSize={"110%"} p={"1%"} w={"15rem"}>

                        <HStack >
                           
                            <Text fontSize={"120%"}>{cart.name}</Text>

                            
                            
                    <IconButton bg={"#0000"} _hover={"#0000"} /* left={3} */ paddingLeft={"5rem"} onClick={handleDeleteCart}><MdDelete size={"90%"} /></IconButton>
                        </HStack>

                        <HStack pt={2}>

                            <Text > Färg: </Text>
                            <Text style={{ textTransform: "capitalize" }}>{cart.color}</Text>

                            <FaCircle color={Displaycolor} />
                            
                        </HStack>
                        <HStack>
                            <Text> Storlek: </Text> 
                            <Text style={{ textTransform: "capitalize" }}>{cart.size}</Text>
                        </HStack>
                        <Text paddingBottom={2}> Antal: {cart.amount}</Text>
                    </Box>
                   

                </VStack>
            </HStack>
        </Box>

    )
}
export default CartItem