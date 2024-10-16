import { Box, Button, Center, Text, useColorModeValue, VStack, HStack, Heading, Link, Stack, SimpleGrid, filter } from "@chakra-ui/react"
import CartItem from "../components/CartItem"
import { useCartStore } from "../store/cart"
import { useEffect } from 'react'
import { useProductStore } from "../store/product"
import { filterProps } from "framer-motion"

const CartPage = () => {
    const { fetchCarts, carts } = useCartStore()
    const { fetchProducts, products } = useProductStore()
    useEffect(() => {
        fetchCarts();
    }, [fetchCarts])
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])
    const filteredProduct = []
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < carts.length; j++) {
            if (carts[j]._id === products[i]._id) {
                filteredProduct.push({
                    ...products[i],
                    color: carts[j].color,
                    size: carts[j].size,
                    amount: carts[j].amount
                })
            }
        }
    }
    console.log("filterd", filteredProduct)


    console.log("carts:", carts)

    const calculateTotal = () => {
        let total = 0;
    {filteredProduct.map((cart) => (
        total += cart.price * cart.amount
    ))}
    return total;
    }

    return (
        <Box bg={"#3A3A3A"} w="35%" minW={"21rem"} p={3} margin={"auto"} marginTop={"2%"} style={{ fontFamily: 'Lora' }} textColor={"white"}>
            <Box bg={useColorModeValue("gray.600", "gray.600")} w="90%" p={"1%"} margin={"auto"} marginTop={"2%"}>
                <VStack>
                    <Text> Min varukorg</Text>
                </VStack>
            </Box>

            <Box bg={useColorModeValue("gray.600", "gray.600")} w="90%" minH={100} p={"1%"} margin={"auto"} marginTop={"2%"}>
                <VStack>
                    {filteredProduct.map((cart) => (
                        <CartItem key={cart._id} cart={cart} />
                    ))},
                </VStack>
            </Box>

            <Box bg={useColorModeValue("gray.600", "gray.600")} w="90%" p={"1%"} margin={"auto"} marginTop={"2%"}>
                <VStack spacing={"2%"}>
                    <Text>Summa att betala: {calculateTotal()}:-</Text>
                    <Button>Betala</Button>
                </VStack>
            </Box>
        </Box>

    )
}


export default CartPage