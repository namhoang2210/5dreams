import AdminLayout from "@/Layouts/AdminLayout";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Textarea,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import moment from "moment/moment";
import React, { useState } from "react";

export default function MoneyIn({ auth, transactions }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [errors, setErrors] = useState({});
    const toast = useToast();

    const { data, setData, post, processing, reset } = useForm({
        total: "",
        note: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.total === "") {
            setErrors({
                total: "Vui lòng nhập số tiền",
            });
            return;
        }

        setErrors({});
        post(route("dashboard.money-in.add"));
        onClose();
        reset();

        toast({
            title: `Thêm thành công`,
            status: "success",
            position: "top",
            isClosable: true,
        });
    };

    console.log(transactions);
    return (
        <>
            <Head title="Money in" />
            <AdminLayout user={auth.user} header="Danh sách tièn vào">
                <Box bg="white" height="calc(100vh - 160px)" rounded="lg" p={6}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>Total: 2,222,222 VND</Box>
                        <Button onClick={() => onOpen()}>Add</Button>
                    </Flex>

                    <TableContainer mt={6}>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th>No</Th>
                                    <Th>Số tiền</Th>
                                    <Th>Người đóng</Th>
                                    <Th>Ghi chú</Th>
                                    <Th>Thời gian</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {transactions.data.map((item, index) => (
                                    <Tr key={item.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>
                                            {Number(item.total).toLocaleString(
                                                "en-US"
                                            )}
                                        </Td>
                                        <Td>{item.author.name}</Td>
                                        <Td>
                                            <Box
                                                maxWidth="400px"
                                                overflow="hidden"
                                                textOverflow="ellipsis"
                                            >
                                                {item.note || "N/A"}
                                            </Box>
                                        </Td>
                                        <Td>
                                            {moment(item.updated_at).format(
                                                "HH:mm:ss DD/MM/YYYY"
                                            )}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Thêm khoản nộp tiền</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isInvalid={!!errors.total}>
                                <FormLabel>Số tiền</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Nhập số tiền"
                                    onChange={(e) =>
                                        setData("total", e.target.value)
                                    }
                                />
                                {errors.total && (
                                    <FormErrorMessage>
                                        {errors.total}
                                    </FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Ghi chú</FormLabel>
                                <Textarea
                                    placeholder="Nhập ghi chú cho khoản tiền"
                                    onChange={(e) =>
                                        setData("note", e.target.value)
                                    }
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                disabled={processing}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </AdminLayout>
        </>
    );
}
