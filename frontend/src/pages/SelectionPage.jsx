import {
    Box,
    Center,
    Container,
    HStack,
    Image,
    VStack,
    Text,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'
import { useLocation } from "react-router";


const SelectionPage = () => {
    const { fetchProducts, products } = useProductStore()
    const bg = useColorModeValue("#3A3A3A", "#3A3A3A")
    const mx = 300;



    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    console.log("products", products)
    const location = useLocation();
    console.log("Location:", location);

    const splitLocation = location.pathname.split("/")

    const id = location.pathname.split("/")[1];
    console.log("ID:", id);
    const breakpoints = {
        base: '0em', // 0px
        sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
        md: '48em', // ~768px
        lg: '62em', // ~992px
        xl: '80em', // ~1280px
        '2xl': '96em', // ~1536px
    }


    let type = null
    if (splitLocation[2]) {
        console.log(splitLocation[2])
        type = splitLocation[2]
    }

    var productSelection = [];

    for (let i = 0; i < products.length; i++) {
        const currentProduct = products[i];
        if (type !== null) {
            if (id === currentProduct.category.toLowerCase() && type === currentProduct.type.toLowerCase()) {
                productSelection.push(currentProduct)
            }
            console.log(type)
        } else {
            if (id === currentProduct.category.toLowerCase()) {
                productSelection.push(currentProduct)
            }
        }
    }
    console.log(productSelection)
    return (
        <Container maxW="80%" py={12} style={{ fontFamily: 'Lora' }}>

            <Box bgGradient='linear(to-r, #0000, #3A3A3A, #3A3A3A, #0000)' paddingLeft='40%' paddingRight='40%' >
                <Text
                    fontSize={["2xl", "3xl"]}
                    fontWeight='extrabold'
                    color={'white'}
                    textTransform="capitalize"
                    textAlign="center"
                >
                    {id}
                </Text>
            </Box>


            <VStack spacing={8}>


                <SimpleGrid columns={[1, 2, 4]} spacing={10} w={"full"} paddingTop="3%">
                    <Box
                        shadow='lg'
                        overflow='hidden'
                        transition='all 0.3s'
                        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                        style={{ fontFamily: 'Lora' }}
                        position={"relative"}>
                        <Image src='https://image.hm.com/assets/hm/ce/53/ce53a6ef590fdf566a6a53762e97a2a09defbcaa.jpg?imwidth=396' alt='REA' h={mx} w='full' objectFit='cover' />

                        <Box p={2} position={"absolute"} bottom={3} right={3} left={3} bgGradient='linear(to-r, #3A3A3A, #3A3A3A, #3A3A3A, #0000)' color={"white"} paddingLeft={3} paddingRight={3}>
                            <Text fontSize={'3xl'}>REA</Text>
                        </Box>
                    </Box>
                    <Box
                        shadow='lg'
                        overflow='hidden'
                        transition='all 0.3s'
                        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                        style={{ fontFamily: 'Lora' }}
                        position={"relative"}>
                        <Image src='https://image.hm.com/assets/hm/2f/d1/2fd161a50d8b9a1be205985943b1c3a832e551c5.jpg?imwidth=396' alt='NYHETER' h={mx} w='full' objectFit='cover' />

                        <Box p={2} position={"absolute"} bottom={3} right={3} left={3} bgGradient='linear(to-r, #3A3A3A, #3A3A3A, #3A3A3A, #0000)' color={"white"} paddingLeft={3} paddingRight={3}>
                            <Text fontSize='3xl'>NYHETER</Text>
                        </Box>
                    </Box>
                    <Link to={`/${id}/skor`}>
                        <Box
                            shadow='lg'
                            overflow='hidden'
                            transition='all 0.3s'
                            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                            style={{ fontFamily: 'Lora' }}
                            position={"relative"}
                        >
                            <Image src='https://image.hm.com/assets/hm/37/5f/375f97384a6e47d5f34b50e41ca185457a6b1fa2.jpg?imwidth=396' alt='SKOR' h={mx} w='full' objectFit='cover' />

                            <Box p={2} position={"absolute"} bottom={3} right={3} left={3}
                                bgGradient='linear(to-r, #3A3A3A, #3A3A3A, #3A3A3A, #0000)' color={"white"} paddingLeft={3} paddingRight={3} >
                                <Text fontSize='3xl'>SKOR</Text>
                            </Box>
                        </Box>
                    </Link>
                    <Link to={`/${id}/accessoarer`}>
                        <Box
                            shadow='lg'
                            overflow='hidden'
                            transition='all 0.3s'
                            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                            style={{ fontFamily: 'Lora' }}
                            position={"relative"}>
                            <Image src='https://image.hm.com/assets/hm/3c/90/3c9054f89d4e49fdbd06f888a5cac0e39493360f.jpg?imwidth=396' alt='ACESGJORAR' h={mx} w='full' objectFit='cover' />

                            <Box p={2} position={"absolute"} bottom={3} right={3} left={3} bgGradient='linear(to-r, #3A3A3A, #3A3A3A, #3A3A3A, #0000)' color={"white"} paddingLeft={3} paddingRight={3}>
                                <Text fontSize='3xl'>ACCESSOARER</Text>
                            </Box>
                        </Box>
                    </Link>


                </SimpleGrid>

            </VStack>

            {/* 
        
      <HStack paddingTop='2%'>
        <SimpleGrid columns={7} spacing={1} 
        >
            <Box bg={"#3A3A3A"} fontSize='2xl' paddingLeft={2} paddingRight={2}>
                <Text>Byxor</Text>
            </Box>
            <Box bg={"#3A3A3A"} fontSize='2xl' paddingLeft={2} paddingRight={2}>
                <Text>Klänningar</Text>
            </Box>

        </SimpleGrid>
      </HStack> */}

            <VStack spacing={8} paddingTop='5%'>
                <Box bgGradient='linear(to-r, #0000, #3A3A3A, #3A3A3A, #0000)' paddingLeft='40%' paddingRight='40%' >

                    <Text

                        fontSize={["2xl", "3xl"]}
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
                        lg: 4
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {productSelection.map((product) => (
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

export default SelectionPage