import { Pagination } from "@/Components/Pagninate";
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
    Select,
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
import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function MoneyOut({ auth, transactions, members }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [errors, setErrors] = useState({});
    const toast = useToast();
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        setPagination({
            current_page: transactions.current_page,
            last_page: transactions.last_page,
            per_page: transactions.per_page,
            total: transactions.total,
        });
    }, [transactions]);

    const { data, setData, post, processing, reset } = useForm({
        total: "",
        member_id: "",
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

        if (data.member_id === "") {
            setErrors({
                member_id: "Vui lòng chọn người nộp tiền",
            });
            return;
        }

        setErrors({});
        post(route("dashboard.money-out.add"));
        onClose();
        reset();

        toast({
            title: `Thêm thành công`,
            status: "success",
            position: "top",
            isClosable: true,
        });
    };

    const handlePageChange = (newPage) => {
        router.visit(`money-out?page=${newPage}`, {
            method: "get",
        });
    };

    return (
        <>
            <Head title="Money in" />
            <AdminLayout user={auth.user} header="Danh sách chi ra">
                <Box
                    bg="white"
                    minHeight="calc(100vh - 160px)"
                    rounded="lg"
                    p={6}
                    position="relative"
                >
                    <Flex
                        flexWrap="wrap"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            bg="#fc8181"
                            paddingX={5}
                            color="white"
                            onClick={() => onOpen()}
                            _hover={{
                                bg: "red.200",
                            }}
                            size="sm"
                        >
                            Thêm
                        </Button>
                        <Pagination
                            onPageChange={handlePageChange}
                            pagination={pagination}
                        />
                    </Flex>

                    <TableContainer mt={{ base: 6, md: 10 }}>
                        <Table variant='striped' colorScheme='gray' size="sm">
                            <Thead>
                                <Tr >
                                    <Th textColor="#4C4382">No.</Th>
                                    <Th textColor="#4C4382">Số tiền</Th>
                                    <Th textColor="#4C4382">Người đóng</Th>
                                    <Th textColor="#4C4382">Ghi chú</Th>
                                    <Th textColor="#4C4382">Thời gian</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {transactions.data.map((item, index) => (
                                    <Tr key={item.id}>
                                        <Td>{(transactions.current_page - 1) * 15 + index + 1}</Td>
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

                <Modal isOpen={isOpen} size="lg" onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Thêm khoản tiền chi </ModalHeader>
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

                            <FormControl mt={4} isInvalid={!!errors.member_id}>
                                <FormLabel>Người quyết toán</FormLabel>
                                <Select
                                    placeholder="Chọn người quyết toán"
                                    onChange={(e) =>
                                        setData("member_id", e.target.value)
                                    }
                                >
                                    {members.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Select>
                                {errors.member_id && (
                                    <FormErrorMessage>
                                        {errors.member_id}
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
                                mr={3}
                                disabled={processing}
                                onClick={(e) => handleSubmit(e)}
                                bg="#fc8181"
                                paddingX={5}
                                color="white"
                                _hover={{
                                    bg: "red.200",
                                }}
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
