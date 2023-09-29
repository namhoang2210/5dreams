import AdminLayout from "@/Layouts/AdminLayout";
import {
    Stat,
    StatArrow,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AdminLayout user={auth.user} header="Bussiness Dashboard">
            <Head title="Dashboard" />

            <StatGroup gap={{ base: 4, md: 10 }}>
                <Stat background="white" p={5} rounded="lg" minWidth="300px">
                    <StatLabel>Tiền vào</StatLabel>
                    <StatNumber>2,345,670 VND</StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        23.36% so với tháng trước
                    </StatHelpText>
                </Stat>

                <Stat background="white" p={5} rounded="lg" minWidth="300px">
                    <StatLabel>Tiền ra</StatLabel>
                    <StatNumber>450,000 VND</StatNumber>
                    <StatHelpText>
                        <StatArrow type="decrease" />
                        9.05% so với tháng trước
                    </StatHelpText>
                </Stat>

                <Stat background="white" p={5} rounded="lg" minWidth="300px">
                    <StatLabel>Sản phẩm</StatLabel>
                    <StatNumber>45</StatNumber>
                    <StatHelpText>
                        <StatArrow type="decrease" />
                        9.05% so với tháng trước
                    </StatHelpText>
                </Stat>
            </StatGroup>
        </AdminLayout>
    );
}
