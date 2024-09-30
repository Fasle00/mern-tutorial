import { 
    Container, 
    VStack, 
    Text, 
    SimpleGrid, 
    Box, 
    useColorModeValue, 
    Image, 
    HStack, 
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'


const HomePage = () => {
    const { fetchProducts, products } = useProductStore();
    const bg = useColorModeValue("#3A3A3A", "#3A3A3A")
    const mx = 300;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    /* console.log("Products: ", products);
    console.log("Products Length: ", products.length);
    for (let i = 0; i < products.length; i++) {
        console.log("Products: ", products[i]._id);
    } */

    return (
        <Container maxW="80%" py={12} style={{ fontFamily: 'Lora' }}>

            <VStack spacing={8} >
                <Box bgGradient='linear(to-r, #0000, #3A3A3A, #3A3A3A, #0000)' paddingLeft='40%' paddingRight='40%' >

                    <Text

                        fontSize='3xl'
                        fontWeight='extrabold'
                        color={'white'}
                    >
                        Popular right now
                    </Text>
                </Box>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {products.length === 0 && (
                    <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                        No products found {""}
                        <Link to={"/create"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>

                )}

            </VStack>
        </Container>
    )
}
export default HomePage