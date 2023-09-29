import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import SidebarContent from "@/Components/SidebarContent";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import MobileNav from "@/Components/MoblieNav";

export default function AdminLayout({ user, header, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg="#f1f1fb">
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} user={user} header={header} />
            <Box ml={{ base: 0, md: 60 }} p={{ base: 4, md: 10 }}>
                <main>{children}</main>
            </Box>
        </Box>
    );
}
