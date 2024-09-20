import { Button, Center, Container, Flex, HStack, Text, useColorMode, Menu, MenuButton, MenuList, MenuItem, useDisclosure, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon,  } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = ({ user }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const logout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Container maxW={"1140px"} px={4} >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    {user ? (

                        <><Link to={"/create"}>
                            <Button>
                                <PlusSquareIcon fontSize={20} />
                            </Button>
                        </Link>
                            <Menu >
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton isActive={isOpen} as={Button}>
                                            <Image src={user.photos} alt="profile picture" w="2rem" borderRadius='full'/>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>{user.displayName}</MenuItem>
                                            <MenuItem onClick={logout}>Log out</MenuItem>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </>

                    ) : (
                        <Link to={"/login"}>
                            Login
                        </Link>
                    )}

                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
                    </Button>
                </HStack>

            </Flex>
        </Container>
    )
}
export default Navbar