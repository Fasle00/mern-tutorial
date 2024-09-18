import {Container, Heading, VStack, HStack, useColorModeValue, Box, Input, Button, useToast} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const Login = () => {
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    };

    const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
    };

    /*return (
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
            <PlusSquareIcon fontSize={20}/>
              Google
            </div>
            <div className="loginButton facebook" onClick={facebook}>
            <PlusSquareIcon fontSize={20}/>
              Facebook
            </div>
            <div className="loginButton github" onClick={github}>
            <PlusSquareIcon fontSize={20}/>
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button className="submit">Login</button>
          </div>
        </div>
      </div>
    );*/
    return (
        <Container maxW={"container.sm"}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} >
                Create New Product
            </Heading>

            <HStack spacing={8} >
                <Box w={"full"} p={6} rounded={"lg"} shadow={"md"} >
                    <VStack spacing={4} >
                        <Link to={"/auth/google"} onClick={google}>
                            <PlusSquareIcon fontSize={20} />
                            Google
                        </Link>
                        <Link to={"/auth/google"} onClick={google}>
                            <PlusSquareIcon fontSize={20} />
                            Google
                        </Link>
                        
                    </VStack>

                </Box>
                <Box w={"full"}p={6} rounded={"lg"} shadow={"md"} >
                    <VStack spacing={4} >
                    <Input
                            placeholder="username"
                            name="name"
                        />
                        <Input
                            placeholder="username"
                            name="name"
                        />

                        <Button colorScheme="blue" w={"full"} >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </HStack>
        </Container>
    )
};

export default Login;