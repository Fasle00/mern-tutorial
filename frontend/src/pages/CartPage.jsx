import { Box, Button, Center, Text, useColorModeValue, VStack, HStack, Heading, Link, Stack, SimpleGrid, filter  } from "@chakra-ui/react"
import CartItem from "../components/CartItem"
import { useCartStore } from "../store/cart"
import { useEffect } from 'react'
import { useProductStore } from "../store/product"
import { filterProps } from "framer-motion"

const CartPage= () => {
const {fetchCarts, carts } = useCartStore()
const {fetchProducts, products } = useProductStore()
useEffect(() => {
    fetchCarts();
}, [fetchCarts])
useEffect(() => {
    fetchProducts();
}, [fetchProducts])

 for(let i = 0; i < products.length; i++) {
    for (let j = 0; j < carts.length; j++){
        if (carts[j]._id===products[i]){
filteredProduct.push({_id:products[i]._id,
                      color:products[i].color,  
                    size:products[i].size,
                    amount:products[i].amount
})
        }
    }
 }

    return(
        
       

    <Box bg={useColorModeValue("gray.800", "gray.800")} w="80%" p={"3rem"} marginTop={"3rem"}marginLeft={"10%"}  > 
   
    <Box bg={useColorModeValue("gray.600", "gray.600")} w="80%" p={"1rem"} marginLeft={"10%"}>
         
       
    <VStack>
<Text> Min varukorg</Text>

</VStack>
</Box>

<Box bg={useColorModeValue("gray.600", "gray.600")} w="80%" p={"2rem"} marginTop={"2rem"} marginLeft={"10%"} >

<VStack>

    {carts.map((cart) => (
            <CartItem key={cart._id} cart={cart}  />
        ))},

    
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