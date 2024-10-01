import { 
    Button, 
    Container, 
    Flex, 
    HStack, 
    Image,
    Text, 
    useColorMode, 
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem, 
    useDisclosure, 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon, HamburgerIcon } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = ({ user, setUser }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const logout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const guestUser = {
        displayName: "User",
        accessLevel: "user",
        email: "test@email.com",
        photos: "data:image/jpeg;base64,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"
    };
    const guestEditor = {
        displayName: "Editor",
        accessLevel: "editor",
        email: "test@email.com",
        photos: "data:image/jpeg;base64,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"
    };
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
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
                    </Button>

                    {user ? (
                        <>
                            <Link to={"/create"}>
                                <Button>
                                    <PlusSquareIcon fontSize={20} />
                                </Button>
                            </Link>
                            <Menu >
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton isActive={isOpen} as={Button} >
                                            <Image src={user.image} alt="profile picture" w="2rem" borderRadius='full' />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem as='a' href='/users'>{user.displayName}</MenuItem>
                                            <MenuItem onClick={logout}>Log out</MenuItem>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </>

                    ) : (
                        <>
                            <Button onClick={() => { setUser(guestUser) }}>guest user</Button>
                            <Button onClick={() => { setUser(guestEditor) }}>guest Editor</Button>
                            <Link to={"/login"}>
                                <Button>
                                    Logga in
                                </Button>
                            </Link>
                        </>
                    )}

                    <Menu>
                        <MenuButton as={Button} rightIcon={<HamburgerIcon />} variant={'link'} size={'lg'}>

                        </MenuButton>
                        <MenuList>
                            <MenuItem as="a" href='/create'>
                                <Button w={"full"} bg={"bg"} variant={'link'}>
                                    <MenuItem>
                                        Create
                                    </MenuItem>
                                </Button>
                            </MenuItem>
                            <MenuItem as="a" href='/login'>
                                <Button w={"full"} bg={"bg"} variant={'link'}>
                                    <MenuItem>
                                        Logga in
                                    </MenuItem>
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>

                </HStack>

            </Flex>
        </Container >
    )
}
export default Navbar