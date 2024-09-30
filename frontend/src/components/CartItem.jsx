import { useProductStore } from '../store/product'
import { useState } from "react";
import { 
    Text, 
    Button, 
    Box, 
    Input, 
    InputLeftAddon, 
    InputGroup, 
    VStack, 
    HStack, 
} from '@chakra-ui/react';

const CartItem = ({ product }) => {


    const [updatedProduct, setUpdatedProduct] = useState(product);
    const ItemId = "Id"
    const ItemColor = "Röd"
    const ItemQuantity = 2
    const ItemSize = "M"

    return (
        <Box bg={"bg"}   >
            <HStack spacing={"15%"}>
                <img src="img/svartKatt.jpeg" alt="" />

                <VStack >

                    <Text >{ItemId}</Text>
                    <Text> {ItemColor}</Text>
                    <Text>{ItemSize}</Text>
                    <Text>{ItemQuantity}</Text>

                    <Button colorScheme='red'> Ta bort produkt</Button>
                </VStack>
            </HStack>
        </Box>

    )
}
export default CartItem