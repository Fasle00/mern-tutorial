
import { Button, Show, Hide, Container, Flex, HStack, Text, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Image, useDisclosure, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GiShirtButton } from "react-icons/gi";
import { FaRegPlusSquare } from "react-icons/fa";
import { HamburgerIcon } from '@chakra-ui/icons'


const Navbar = ({ user, setUser }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const logout = () => {
        window.open("https://mern-tutorial-yzc5.onrender.com/auth/logout", "_self");
    };
    const { isOpen, onOpen, onClose } = useDisclosure();

    const breakpoints = {
        base: '0em', // 0px
        sm: '30em', // ~480px. em is a relative unit and is dependant on the font size.
        md: '48em', // ~768px
        lg: '62em', // ~992px
        xl: '80em', // ~1280px
        '2xl': '96em', // ~1536px
    }

    return (
        <Container maxW={"full"} px={4} bg={useColorModeValue("#3A3A3A", "#3A3A3A")} style={{ fontFamily: 'Lora' }}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    sm: "row"
                }}

            >

                <HStack spacing={0} alignItems={"center"} paddingLeft={[20, 100, 200]}>
                    <Text
                        color={"white"}
                        fontSize='5xl'
                        fontWeight='extrabold'
                        paddingBottom={2}
                        paddingRight={2}
                    >
                        <Link to={"/"}>
                            able
                        </Link>
                    </Text>
                    <GiShirtButton color="#79CFFF" size={35} />



                    <Show breakpoint="(min-width: 850px)">

                        <Text
                            color={"white"}
                            fontSize='3xl'
                            fontWeight='extrabold'
                            paddingLeft={30}

                        >
                            <Link to={"/"}>
                                home
                            </Link>
                        </Text>
                        <Text
                            color={"white"}
                            fontSize='3xl'
                            fontWeight='extrabold'
                            paddingLeft={5}
                        >
                            <Link to={"/dam"}>
                                dam
                            </Link>
                        </Text>
                        <Text
                            color={"white"}
                            fontSize='3xl'
                            fontWeight='extrabold'
                            paddingLeft={5}
                        >
                            <Link to={"/herr"}>
                                herr
                            </Link>
                        </Text>
                        <Text
                            color={"white"}
                            fontSize='3xl'
                            fontWeight='extrabold'
                            paddingLeft={5}
                        >
                            <Link to={"/barn"}>
                                barn
                            </Link>
                        </Text>

                    </Show>

                </HStack>


                <HStack spacing={2} alignItems={"center"} paddingRight={[20, 150, 300]} >
                    <Menu>
                        <MenuButton as={Button} rightIcon={<HamburgerIcon color={"white"} />} variant={'link'} fontSize={"xx-large"} >

                        </MenuButton>


                        <MenuList textColor={useColorModeValue("black", "white")}>
                            {user ? (
                                <>
                                    <MenuItem>
                                        <MenuItem>
                                            <Image src={user.image} alt="profile picture" w="2rem" borderRadius='full' />
                                            <MenuItem as='a' href='/users' w={"80%"}>{user.displayName}</MenuItem>
                                        </MenuItem>
                                    </MenuItem>

                                    {user.accessLevel == "admin" && (
                                        <>
                                            <MenuItem>
                                                <Link to={"/admin"}>
                                                    <Button w={"full"} bg={"bg"} variant={'link'}>
                                                        <MenuItem textColor={useColorModeValue("black", "white")}>
                                                            Admin Page
                                                        </MenuItem>
                                                    </Button>
                                                </Link>
                                            </MenuItem>
                                        </>
                                    )}


                                    {(user.accessLevel == "admin" || user.accessLevel == "editor") && (
                                        <MenuItem>
                                            <Link to={"/create"}>
                                                <Button w={"full"} bg={"bg"} variant={'link'}>
                                                    <MenuItem textColor={useColorModeValue("black", "white")}>
                                                        Create
                                                    </MenuItem>
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                    )}


                                    <MenuItem>
                                        <Text
                                            color={"white"}
                                            fontSize='3xl'
                                            fontWeight='extrabold'
                                            paddingLeft={5}
                                        >
                                            <Link to={"/cart"}>
                                                Cart
                                            </Link>
                                        </Text>
                                    </MenuItem>

                                    <Show breakpoint="(max-width: 850px)">

                                        <MenuItem>
                                            <Text
                                                color={"white"}
                                                fontSize='3xl'
                                                fontWeight='extrabold'
                                                paddingLeft={5}
                                            >
                                                <Link to={"/dam"}>
                                                    Dam
                                                </Link>
                                            </Text>
                                        </MenuItem>
                                        <MenuItem>
                                            <Text
                                                color={"white"}
                                                fontSize='3xl'
                                                fontWeight='extrabold'
                                                paddingLeft={5}
                                            >
                                                <Link to={"/herr"}>
                                                    Herr
                                                </Link>
                                            </Text>
                                        </MenuItem>
                                        <MenuItem>
                                            <Text
                                                color={"white"}
                                                fontSize='3xl'
                                                fontWeight='extrabold'
                                                paddingLeft={5}
                                            >
                                                <Link to={"/barn"}>
                                                    Barn
                                                </Link>
                                            </Text>
                                        </MenuItem>
                                    </Show>

                                    <MenuItem>
                                        <Button w={"full"} bg={"bg"} variant={'link'}>
                                            <MenuItem onClick={logout} textColor={useColorModeValue("black", "white")}>Log out</MenuItem>
                                        </Button>
                                    </MenuItem>

                                </>
                            ) : (
                                <>
                                    <MenuItem>
                                        <Link to={"/login"}>
                                            <Button w={"full"} bg={"bg"} variant={'link'}>
                                                <MenuItem textColor={useColorModeValue("black", "white")}>
                                                    Logga in
                                                </MenuItem>
                                            </Button>
                                        </Link>
                                    </MenuItem>
                                </>
                            )}
                            <MenuItem>
                                <Button w={"full"} onClick={toggleColorMode}>
                                    {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar