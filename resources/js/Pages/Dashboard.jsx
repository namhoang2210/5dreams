import Chart from "@/Components/dashboard/Chart";
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

export default function Dashboard({ auth, data }) {
    console.log(data.transactions);
    return (
        <AdminLayout user={auth.user} header="Bussiness Dashboard">
            <Head title="Dashboard" />

            <StatGroup gap={{ base: 4, md: 10 }}>
                <Stat background="white" p={5} rounded="lg" minWidth="300px">
                    <StatLabel>Ngân sách còn lại</StatLabel>
                    <StatNumber>
                        {(data.money_in - data.money_out).toLocaleString(
                            "en-US"
                        )}{" "}
                        VND
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        xx% so với tháng trước
                    </StatHelpText>
                </Stat>
                <Stat background="white" p={5} rounded="lg" minWidth="250px">
                    <StatLabel>Tiền vào</StatLabel>
                    <StatNumber>
                        {data.money_in.toLocaleString("en-US")} VND
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        xx% so với tháng trước
                    </StatHelpText>
                </Stat>

                <Stat background="white" p={5} rounded="lg" minWidth="300px">
                    <StatLabel>Tiền ra</StatLabel>
                    <StatNumber>
                        {data.money_out.toLocaleString("en-US")} VND
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type="decrease" />
                        xx% so với tháng trước
                    </StatHelpText>
                </Stat>
            </StatGroup>
            <Chart transactions={data.transactions} />
        </AdminLayout>
    );
}
