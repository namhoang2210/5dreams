import {
    Avatar,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    VStack,
    Box,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import React from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { PiFlowerTulipDuotone } from "react-icons/pi";

const MobileNav = ({ onOpen, user, header, ...rest }) => {
    const { post, processing } = useForm({});

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 10 }}
            height="20"
            alignItems="center"
            bg={{ base: "white", md: "none" }}
            justifyContent="space-between"
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Flex
                h="20"
                alignItems="center"
                mx="8"
                display={{ base: "flex", md: "none" }}
            >
                <PiFlowerTulipDuotone
                    color="#fc8181"
                    fontSize="20px"
                    stroke="2"
                />
                <Text
                    fontSize="2xl"
                    color="red.300"
                    fontFamily="monospace"
                    fontWeight="bold"
                >
                    5Dreams
                </Text>
            </Flex>
            <Text
                display={{ base: "none", md: "block" }}
                color="#364474"
                fontSize="2xl"
                fontWeight="extrabold"
            >
                {header}
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar
                                    size={{ base: "sm", md: "md" }}
                                    src={
                                        "https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                                    }
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">{user.name}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList bg="white">
                            {/* <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider /> */}
                            <MenuItem onClick={() => post(route("logout"))}>
                                Sign out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNav;
