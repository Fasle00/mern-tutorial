import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
    Box,
    VStack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    IconButton,
    Td,
    Tfoot,
    Select,
    Input,
    Image,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    Container,
    SimpleGrid,
    Card,
    Stack,
    Checkbox,
    Radio,
    RadioGroup,
    Text,
    useToast,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useUserStore } from '../store/user'
import { useProductStore } from "../store/product";
import { Link } from "react-router-dom";
import AdminProduct from "../components/adminProduct";


const AdminPage = (user) => {
    const { fetchUsers, users, setUsers, updateUsers } = useUserStore();
    const { getDisclosureProps, getButtonProps, } = useDisclosure()

    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()
    const toast = useToast();


    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);

    useEffect(() => {
        console.log("users har updaterats till:", users);
    }, [users]);

    const [updatedUsers, setUpdatedUsers,] = useState({
        accessLevel: "",
    });


    const handleUpdateUser = async (pid, accessLevel) => {
        /*  pid = selectedUserID; */
        console.log("pid:", pid);
        console.log("updatedUsers", updatedUsers);
        setUsers(updatedUsers);
        updateUsers(pid, accessLevel);
    };


    // product stuff
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    console.log("Products:", products);



    return (

        <Tabs orientation="vertical">
            <TabList>
                {users.accessLevel == "admin"(
                    <Tab>Users</Tab>
                )}
                <Tab>Products</Tab>
            </TabList>

            <TabPanels>
                {user.accessLevel == "admin"(

                    <TabPanel>
                        <VStack>
                            <Text
                                fontSize={"30"}
                                fontWeight={"bold"}
                                bgClip={"text"}
                                TextAlign={"center"}
                            >
                                Edit acces level of users
                            </Text>
                            <Heading as='h1'>  </Heading>

                            <TableContainer w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"} >
                                <Table variant='striped' colorScheme='red'>
                                    <TableCaption>Userinfo</TableCaption>
                                    <Thead borderBottom={'2px'} >
                                        <Tr>
                                            <Th>Username</Th>
                                            <Th>Email</Th>
                                            <Th>Access Level</Th>
                                            <Th>Created</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {users.map((user) => (
                                            <Tr key={user.displayName}>
                                                <Td>{user.displayName}</Td>
                                                <Td>{user.email}</Td>
                                                <Td>
                                                    <Select variant='unstyled' onChange={(e) => {
                                                        console.log("e.target.value", e.target.value);
                                                        console.log("user._id", user._id);
                                                        handleUpdateUser(user._id, e.target.value);
                                                        const updatedUser = { ...user, accessLevel: e.target.value };
                                                        let updateUserList = [];
                                                        let selectedUserID = user._id;
                                                        users.map((user) => {
                                                            if (user.displayName === updatedUser.displayName) {
                                                                updateUserList.push(updatedUser);
                                                            } else {
                                                                updateUserList.push(user);
                                                            }
                                                        })
                                                        setUpdatedUsers(updateUserList);
                                                    }}>
                                                        <option
                                                            selected={user.accessLevel === "admin" ? "selected" : ""}
                                                            value="admin">
                                                            Admin
                                                        </option>
                                                        <option
                                                            selected={user.accessLevel === "editor" ? "selected" : ""}
                                                            value="editor">
                                                            Editor
                                                        </option>
                                                        <option
                                                            selected={!(user.accessLevel === "admin" || user.accessLevel === "editor") ? "selected" : ""}
                                                            value="user">
                                                            User
                                                        </option>
                                                    </Select>
                                                </Td>
                                                <Td>{user.createdAt}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <Tfoot borderTop={'2px'} >
                                        <Tr>
                                            <Th>Username</Th>
                                            <Th>Email</Th>
                                            <Th>Access level</Th>
                                            <Th>Created</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer>
                        </VStack>
                    </TabPanel>
                )}

                <TabPanel>
                    {/* Product stuff */}
                    <Container maxW={'container.xl'} py={12}>
                        <VStack spacing={8}>

                            <Text
                                fontSize={"30"}
                                fontWeight={"bold"}
                                bgClip={"text"}
                                TextAlign={"center"}
                            >
                                Edit and Delete Products
                            </Text>

                            <SimpleGrid
                                columns={{
                                    base: 1,
                                    md: 2,
                                    lg: 3,
                                }}
                                spacing={10}
                                w={"full"}
                            >
                                {products.map((product) => (
                                    <AdminProduct key={product._id} product={product} />
                                ))}
                            </SimpleGrid>

                            {products.length === 0 && (
                                <Text fontSize='xl' TextAlign={"center"} fontWeight='bold' color='gray.500'>
                                    No products available{" "}
                                    <Link to={"/create"}>
                                        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                            Create a product
                                        </Text>
                                    </Link>
                                </Text>
                            )}

                        </VStack>
                    </Container>

                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}


export default AdminPage