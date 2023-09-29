import React from "react";
import { Box, CloseButton, Flex, Icon, Text } from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass } from "react-icons/fi";
import { PiFlowerTulipDuotone } from "react-icons/pi";

const NavItem = ({ icon, path, url, children, ...rest }) => {
    const pathUrl = window.location.pathname;
    return (
        <Box
            as="a"
            href={route(url)}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                paddingY={4}
                paddingX={6}
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "gray.50",
                }}
                {...rest}
                fontWeight="semibold"
                borderRight={path === pathUrl ? "3px solid #fc8181" : "none"}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        // _groupHover={{
                        //     color: "white",
                        // }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    );
};

const SidebarContent = ({ onClose, ...rest }) => {
    const LinkItems = [
        {
            name: "Trang chủ",
            icon: FiHome,
            path: "/dashboard",
            url: "dashboard",
        },
        {
            name: "Tiền vào",
            icon: FiTrendingUp,
            path: "/dashboard/money-in",
            url: "dashboard.money-in",
        },
        {
            name: "Tiền ra",
            icon: FiCompass,
            path: "/dashboard/money-out",
            url: "dashboard",
        },
    ];

    return (
        <Box
            transition="3s ease"
            bg="white"
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Flex alignItems="center">
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

                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    path={link.path}
                    url={link.url}
                >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

export default SidebarContent;
