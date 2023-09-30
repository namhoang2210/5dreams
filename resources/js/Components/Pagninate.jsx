import { Box, Flex, Text, Center } from "@chakra-ui/react";
import React from "react";
import { createIcon } from "@chakra-ui/react";

export const Pagination = ({ onPageChange, pagination }) => {
    const bgActiveColor = "#b4c8e0";
    const bgColor = "gray.100";

    if (!pagination || pagination.last_page < 2) {
        return null;
    }

    const PaginationDotIcon = createIcon({
        path: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
            >
                <text
                    id="_"
                    data-name="…"
                    fill="#333"
                    fontSize="14"
                    fontFamily="ArialMT, Arial"
                >
                    <tspan x="1" y="13">
                        …
                    </tspan>
                </text>
            </svg>
        ),
        viewBox: "0 0 16 16",
    });

    const LeftPaginationIcon = createIcon({
        path: (
            <svg
                id="グループ_19194"
                data-name="グループ 19194"
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="8"
                viewBox="0 0 5 8"
                rounded="lg"
            >
                <path
                    id="多角形_3"
                    data-name="多角形 3"
                    d="M4,0,8,5H0Z"
                    transform="translate(0 8) rotate(-90)"
                    fill="#455364"
                />
            </svg>
        ),
        viewBox: "0 0 5 8",
    });

    const RightPaginationIcon = createIcon({
        path: (
            <svg
                id="グループ_19194"
                data-name="グループ 19194"
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="8"
                viewBox="0 0 5 8"
            >
                <path
                    id="多角形_3"
                    data-name="多角形 3"
                    d="M4,0,8,5H0Z"
                    transform="translate(5) rotate(90)"
                    fill="currentcolor"
                />
            </svg>
        ),
        viewBox: "0 0 5 8",
    });

    const renderPage = (pageNumber, isActive) => (
        <Center
            key={pageNumber}
            width="24px"
            height="24px"
            m="0 7px"
            p="11px"
            bg={isActive ? bgActiveColor : bgColor}
            onClick={() => onPageChange(pageNumber)}
            cursor="pointer"
            rounded="sm"
        >
            <Text fontSize="13px" color={isActive ? "#fff" : "black"}>
                {pageNumber}
            </Text>
        </Center>
    );

    const renderPages = () => {
        const pages = [];
        const { current_page, last_page } = pagination;
        const firstPage = Math.max(1, current_page - 2);
        const lastPage = Math.min(last_page, firstPage + 4);

        if (firstPage > 1) {
            pages.push(renderPage(1, 1 === current_page));
            pages.push(<PaginationDotIcon key="dots-1" />);
        }

        for (let i = firstPage; i <= lastPage; i++) {
            pages.push(renderPage(i, i === current_page));
        }

        if (lastPage < last_page) {
            pages.push(<PaginationDotIcon key="dots-2" />);
            pages.push(renderPage(last_page, last_page === current_page));
        }

        return pages;
    };
    return (
        <Box height="24px">
            <Box as="div" maxWidth="288px">
                <Flex justify="center">
                    {pagination.current_page !== 1 && (
                        <Center
                            width="24px"
                            height="24px"
                            m="0 8px 0 0"
                            p="0 8px"
                            bg={`${bgColor}`}
                            onClick={() =>
                                onPageChange(pagination.current_page - 1)
                            }
                            cursor="pointer"
                        >
                            <Center
                                marginRight="auto"
                                marginLeft="auto"
                                alignItems="center"
                            >
                                <LeftPaginationIcon
                                    width="10px"
                                    height="10px"
                                    display="block"
                                    rounded="sm"
                                />
                            </Center>
                        </Center>
                    )}
                    {renderPages()}
                    {pagination.current_page !== pagination.last_page && (
                        <Center
                            width="24px"
                            height="24px"
                            margin="0 0 0 8px"
                            p="0 8px"
                            bg={`${bgColor}`}
                            onClick={() =>
                                onPageChange(pagination.current_page + 1)
                            }
                            cursor="pointer"
                        >
                            <Center
                                marginRight="auto"
                                marginLeft="auto"
                                alignItems="center"
                            >
                                <RightPaginationIcon
                                    width="10px"
                                    height="10px"
                                    display="block"
                                    margin="0 8px"
                                    rounded="sm"
                                />
                            </Center>
                        </Center>
                    )}
                </Flex>
            </Box>
        </Box>
    );
};
