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
    Select,
    Button
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useUserStore } from '../store/user'

const AdminPage = () => {
    const { fetchUsers, users } = useUserStore();

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);
        
    const [updatedUsers, setUpdatedUsers] = useState(users);
    
    console.log("users", users);

    const handleUpdateUser = async () => {
        console.log("handleUpdateUsers");
        console.log("Updated users:", updatedUsers);
    };


    return (

        <Tabs orientation="vertical">
            <TabList >
                <Tab>Users</Tab>
                <Tab>Products</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <VStack>
                        <Heading as='h1' >Users</Heading>

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