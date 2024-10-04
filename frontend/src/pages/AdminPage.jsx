import {
    Box,
    VStack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Heading,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    useColorModeValue,
    useToast,
    Select,
    Button
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useUserStore } from '../store/user'

const AdminPage = () => {
    const { fetchUsers, users, setUsers, updateUsers } = useUserStore();
    const toast = useToast();

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);

    useEffect(() => {
        console.log("users har updaterats till:", users);
    }, [users]);

    const [updatedUsers, setUpdatedUsers] = useState({
        accessLevel: "",
    });


    const handleUpdateUser = async (pid) => {
        console.log("updatedUsers", updatedUsers);
        setUsers(updatedUsers);
        updateUsers(pid, updatedUsers);

        const { success, message } = await updateUsers(updatedUsers);

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Access level updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (

        <Tabs orientation="vertical">
            <TabList>
                <Tab>Users</Tab>
                <Tab>Products</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <VStack>
                        <Heading as='h1'> Users </Heading>

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
                                                    const updatedUser = { ...user, accessLevel: e.target.value };
                                                    let updateUserList = [];
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
                        <Button onClick={() => handleUpdateUser()}>submit</Button>
                    </VStack>
                </TabPanel>
                <TabPanel>
                    product
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default AdminPage