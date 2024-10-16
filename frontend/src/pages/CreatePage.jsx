import {
    Box,
    Button,
    Card,
    Container,
    Heading,
    HStack,
    VStack,
    Input,
    Stack,
    Checkbox,
    Radio,
    RadioGroup,
    useRadioGroup,
    Text,
    useToast,
    useDisclosure,
    useColorModeValue,
    ButtonGroup
    
} from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product'

const CreatePage = () => {
    /*    const handleChange = (value) => {
           console.log("value har ändrats till:", value)
   
           switch (value) {
               case 'barn':
                   newProduct.category = "barn"
              
                   break;
               case 'herr':
                   setImageColor(product.imageGreen);
                   setCartItem({ ...cartItem, color: 'grön' });
                   break;
               case 'dam':
                   setImageColor(product.imageBlue);
                   setCartItem({ ...cartItem, color: 'blå' });
                   break;
               case 'unisex':
                   setImageColor(product.imageYellow);
                   setCartItem({ ...cartItem, color: 'gul' });
                   break;
               default:
                   setImageColor(product.imageRed);
                   setCartItem({ ...cartItem, color: 'röd' });
           }
       } */
    /* 
        const { value, getRadioProps, getRootProps } = useRadioGroup({
            defaultValue: 'röd',
            onChange: handleChange,
        }) */

    const { getDisclosureProps, getButtonProps, } = useDisclosure()

    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()


    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        imageRed: "",
        imageBlue: "",
        imageGreen: "",
        imageYellow: "",
        description: "",
        category: "",
        type: "",
    });
    const toast = useToast();

    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toast({
                "title": "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        } else {
            toast({
                "title": "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }
        setNewProduct({
            name: "",
            price: "",
            imageRed: "",
            imageYellow: "",
            imageGreen: "",
            imageBlue: "",
            description: "",
            category: "",
            type: "",
        });
    }


    return <Container maxW={"container.sm"} style={{ fontFamily: 'Lora' }}>
        <VStack
            spacing={8}
        >
            <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={'1%'} mt={'1%'}>
                Create New Product
            </Heading>

            <Box
                w={"full"} bg={useColorModeValue("#3A3A3A", "#3A3A3A")}
                p={6} rounded={"lg"} shadow={"md"}
                textColor={'white'}
            >

                <VStack spacing={4}>

                    <Input
                        placeholder='Product Name'
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />

                    <Input
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />

                    <Input
                        placeholder='Product Description'
                        name='description'
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />

                    <Text>Color</Text>

                    <Button {...buttonProps} colorScheme='red'> Red</Button>
                    <Input {...disclosureProps}
                        placeholder='Image URL'
                        name='imageRed'
                        value={newProduct.imageRed}
                        onChange={(e) => setNewProduct({ ...newProduct, imageRed: e.target.value })}
                    />
                    <Button {...buttonProps} colorScheme='green'> Green</Button>
                    <Input {...disclosureProps}
                        placeholder='Image URL'
                        name='imageGreen'
                        value={newProduct.imageGreen}
                        onChange={(e) => setNewProduct({ ...newProduct, imageGreen: e.target.value })}
                    />

                    <Button {...buttonProps} colorScheme='blue'> Blue</Button>
                    <Input {...disclosureProps}
                        placeholder='Image URL'
                        name='imageBlue'
                        value={newProduct.imageBlue}
                        onChange={(e) => setNewProduct({ ...newProduct, imageBlue: e.target.value })}
                    />
                    <Button {...buttonProps} colorScheme='yellow'> Yellow</Button>
                    <Input {...disclosureProps}
                        placeholder='Image URL'
                        name='imageYellow'
                        value={newProduct.imageYellow}
                        onChange={(e) => setNewProduct({ ...newProduct, imageYellow: e.target.value })}
                    />
                    {/*    <HStack>
                        <RadioGroup onChange={(e) => newProduct.type = e.target.value}>
                            <Radio value= "barn"> Barn</Radio>
                            <Radio value= "herr"> Herr</Radio>
                            <Radio value= "dam"> Dam </Radio>
                        </RadioGroup>
                    </HStack>

                    
                    <HStack spacing={"3rem"}>
                        <RadioGroup onChange={(e) => {
                            console.log(e)
                            newProduct.type = e.target.value}}>
                            <Radio value= "t-shirt"> T-shirt</Radio>
                            <Radio value= "byxor"> Byxor</Radio>
                            <Radio value= "hoodie"> Hoodie </Radio>
                            <Radio value= "accessoarer"> Accessoarer </Radio>
                            <Radio value= "skor"> Skor </Radio>
                            
                       
                        </RadioGroup >
                    </HStack> */}


                    <HStack>
                        <ButtonGroup onClick={(e) =>  setNewProduct({ ...newProduct, category: e.target.value }) }>
                        <Button value="barn" onClick={console.log("category", newProduct.category)} >Barn</Button>
                        <Button value="herr" onClick={console.log("category", newProduct.category)} >Herr</Button>
                        <Button value="dam" onClick={console.log("category", newProduct.category)} >Dam</Button>
                        {/* <Button onClick={newProduct.category = "herr"}>Herr</Button>
                        <Button onClick={newProduct.category = "dam"}>Dam</Button> */}
                        
                        </ButtonGroup>
                    </HStack>
                    <Text textTransform="capitalize">{newProduct.category}</Text>
                    

                    <HStack spacing={"3rem"}>
                        <ButtonGroup onClick={(e) =>  setNewProduct({ ...newProduct, type: e.target.value }) }>
                        <Button value="t-shirt" onClick={console.log("type", newProduct.type)} >T-Shirt</Button>
                        <Button value="byxor" onClick={console.log("type", newProduct.type)} >Byxor</Button>
                        <Button value="hoodie" onClick={console.log("type", newProduct.type)} >Hoodie</Button>
                        <Button value="accessoarer" onClick={console.log("type", newProduct.type)} >Accessoarer</Button>
                        <Button value="skor" onClick={console.log("type", newProduct.type)} >Skor</Button>
                        </ButtonGroup>
                    </HStack>
                    <Text textTransform="capitalize"> {newProduct.type} </Text>

                    <Button colorScheme='blue' onClick={handleAddProduct} w={'full'}>
                        Add Product
                    </Button>

                </VStack>
            </Box>
        </VStack >
    </Container >
}
export default CreatePage