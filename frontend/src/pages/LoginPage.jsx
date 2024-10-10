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

  const ButtonWidth = "100px";
  return <Container maxW={"container.sm"} style={{ fontFamily: 'Lora' }}>

    <VStack>
      <Box bg={useColorModeValue("#3A3A3A", "#3A3A3A")} w='80%' p={4} marginTop={10} color={'white'} fontSize={"xl"} >
        <HStack spacing={20}>
          <Text>Logga in med:</Text>

          <Text marginRight={1}>Logga in på ditt konto</Text>

        </HStack>

        <VStack >
          <HStack>
            <Container >
              <VStack marginBottom={100} marginRight={5}>
                <Button w={ButtonWidth}>Facebook</Button >
                <Button w={ButtonWidth} onClick={google}>Google</Button>
              </VStack>
            </Container>

            <Divider orientation='vertical' h={'200px'} w={'0px'} paddingRight={10}></Divider>

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
                <Button >  Skapa Konto </Button>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  </Container>
}

export default LoginPage;