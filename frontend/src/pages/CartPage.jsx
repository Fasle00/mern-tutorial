import { Box, Button, Center, Text, useColorModeValue, VStack, HStack, Heading, Link, Stack, SimpleGrid  } from "@chakra-ui/react"
import CartItem from "../components/CartItem"

const CartPage= () => {

const cart = [{
    _id:CartPage.ItemId, 
    color:CartPage.ItemColor, 
    size:CartPage.ItemSize, 
    amount:CartPage.ItemQuantity
},{
    _id:CartPage.ItemId, 
    color:CartPage.ItemColor, 
    size:CartPage.ItemSize, 
    amount:CartPage.ItemQuantity
}]

    return(
    
    <Box bg={useColorModeValue("gray.800", "gray.800")} w="80%" p={"3rem"} marginTop={"3rem"}marginLeft={"10%"}  > 
    <Box bg={useColorModeValue("gray.600", "gray.600")} w="80%" p={"1rem"} marginLeft={"10%"}>
        
    <VStack>
<Text> Min varukorg</Text>

</VStack>
</Box>

<Box bg={useColorModeValue("gray.600", "gray.600")} w="80%" p={"2rem"} marginTop={"2rem"} marginLeft={"10%"} >

<VStack>
    
    <CartItem> </CartItem>
    <CartItem> </CartItem>
</VStack>




</Box>

<Box bg={useColorModeValue("gray.600", "gray.600")} w="80%" p={"2rem"} marginTop={"2rem"} marginLeft={"10%"}>
    <VStack spacing={"2rem"}>
<Text>Summa att betala:</Text>
<Button>Betala</Button>
</VStack>
</Box>
    </Box>

)
}


export default CartPage