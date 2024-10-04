import {
    chakra,
    Box,
    Button,
    Heading,
    useToast,
    HStack,
    Stack,
    Image,
    useRadioGroup,
    useRadio,
    Text,
    useColorModeValue,
    VStack,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@chakra-ui/react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useState } from "react";
import { useCartStore } from "../store/cart";



const ProductDetails = ({ product, cart }) => {
    const textColor = "white";
    const bg = useColorModeValue("#3A3A3A", "#3A3A3A");
    const { createCart } = useCartStore
    function CustomRadio(props) {
        const { image, ...radioProps } = props
        const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
            useRadio(radioProps)

        return (
            <chakra.label {...htmlProps} {...getLabelProps()}>
                <input {...getInputProps({})} hidden />
                <Box
                    {...getRadioProps()}
                    bg={state.isChecked ? 'blue.200' : 'transparent'}
                    w={12}
                    p={1}
                    rounded='full'
                >
                    <Image src={image} rounded='full' {...getLabelProps()} />
                </Box>
            </chakra.label>
        )
    }

    const colors = [
        { name: 'röd', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Upsdell_red-Colour_Box.png' },
        { name: 'grön', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Color-Green.JPG/640px-Color-Green.JPG' },
        { name: 'blå', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Color-blue.JPG/640px-Color-blue.JPG' },
        { name: 'gul', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Color-yellow.JPG/640px-Color-yellow.JPG' },
    ]

    const [imageColor, setImageColor] = useState(product.imageRed);

    const handleChange = (value) => {
        console.log("value har ändrats till:", value)


        if (value == 'röd') {
            setImageColor(product.imageRed)

        } else if (value == 'grön') {
            setImageColor(product.imageGreen);

        } else if (value == 'blå') {
            setImageColor(product.imageBlue);

        } else if (value == 'gul') {
            setImageColor(product.imageYellow);
        }
    }

    const { value, getRadioProps, getRootProps } = useRadioGroup({
        defaultValue: 'röd',
        onChange: handleChange,
    })

    const toast = useToast();

    let selectedColor = value;
    console.log("selected color:", selectedColor)


    return (
        <Box
            overflow='hidden'
            bg={bg}
            p={"3%"}
            style={{ fontFamily: 'Lora' }}
            maxWidth={500}
        >
            <HStack >
                <VStack align="start">
                    <Heading as='h1' size="3xl" color={textColor} style={{ fontFamily: 'Lora' }}>
                        {product.name}
                    </Heading>
                </VStack>
            </HStack>

            <HStack paddingTop={"5%"} align={"top"} spacing={3}>
                <Image

                    boxSize='200px'
                    fit='cover'
                    src={imageColor}
                />

                <VStack>
                    <Text color={textColor} fontSize={'4xl'}>
                        Pris: {product.price}:-
                    </Text>
                    <Text w={"100%"} wordBreak={"keep-all"}>
                        {product.description}
                    </Text>

                </VStack>
            </HStack>








            <HStack p={3}>
                <Text>
                    Färg:
                </Text>
                <Stack {...getRootProps()}>
                    {/* <Text>The selected radio is: {value}</Text> */}
                    <HStack>
                        {colors.map((colors) => {
                            return (
                                <CustomRadio
                                    key={colors.name}
                                    image={colors.image}
                                    {...getRadioProps({ value: colors.name })}
                                />
                            )
                        })}
                    </HStack>
                </Stack>
            </HStack>




            <HStack>
                <Select>
                    <option value='XS'>XS</option>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='L'>L</option>
                    <option value='XL'>XL</option>
                </Select>
            </HStack>




            <HStack p={3}>
                <Text>
                    Antal:
                </Text>
                <NumberInput defaultValue={1} min={1} max={5}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </HStack>



            <Box boxSize={'250px'} p={0}>
                <HStack spacing={4} bg={bg}>

                    
                    <Button onClick={() => createCart[cart._id, cart.color, cart.size, cart.amount]}>
                        <Text>
                            Lägg till i varukorgen
                        </Text>
                        <MdOutlineAddShoppingCart size={'28px'} />
                    </Button>
                </HStack>

            </Box>

        </Box >
    );
}
export default ProductDetails;