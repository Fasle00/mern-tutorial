import {
  Container,
  Text,
  VStack,
  SimpleGrid,
  Input,
  Stack,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Box,
  Spacer,
  Flex,
  Button,
  HStack,
  Divider,
  AbsoluteCenter,
  useColorModeValue,
  Center,
} from '@chakra-ui/react'
import { color } from 'framer-motion'

const LoginPage = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  /* För fler login metoder i framtiden

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  */

  const breakpoints = {
    base: '0em', // 0px
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  }

  const ButtonWidth = "100px";
  return <Container maxW={"container.sm"} style={{ fontFamily: 'Lora' }} alignItems={'center'}>

    <VStack>
      <Box bg={useColorModeValue("#3A3A3A", "#3A3A3A")} w='80%' p={4} marginTop={10} color={'white'} fontSize={"xl"}>

        <Text marginLeft={[20, 28, 40]}>Logga in med:</Text>
        {/*      <Text marginRight={1}>Logga in på ditt konto</Text> */}

        <Container >
          {/*<Button w={ButtonWidth}>Facebook</Button > */}
          <Button marginLeft={[20, 28, 40]} marginTop={2} w={ButtonWidth} onClick={google}>Google</Button>

        </Container>

        {/*  <Divider orientation='vertical' h={'200px'} w={'0px'} paddingRight={10}></Divider>

            <VStack >

              <Input placeholder='Username' placeh textColor={'black'} bg={"#D9D9D9"} w={"90%"} />

              <Input placeholder='Password' textColor={'black'} bg={"#D9D9D9"} w={"90%"} />
              <style>
                {` 
                  ::placeholder { 
                      color: black; 
                  }`
                }
              </style>

              <HStack paddingTop='5%' >
                <Button bg={'blue.500'} color={'white'}>Logga in</Button  >
                <Button>  Skapa Konto </Button>
              </HStack>
            </VStack> */}
      </Box>
    </VStack>
  </Container>
}

export default LoginPage;