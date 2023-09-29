import AdminLayout from '@/Layouts/AdminLayout';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <StatGroup gap={6}>
                <Stat background="white" p={4} rounded="lg">
                    <StatLabel>Tiền vào</StatLabel>
                    <StatNumber>2,345,670 VND</StatNumber>
                    <StatHelpText>
                    <StatArrow type='increase' />
                    23.36%
                    </StatHelpText>
                </Stat>

                <Stat background="white" p={4} rounded="lg">
                    <StatLabel>Tiền ra</StatLabel>
                    <StatNumber>450,000 VND</StatNumber>
                    <StatHelpText>
                    <StatArrow type='decrease' />
                    9.05%
                    </StatHelpText>
                </Stat>

                <Stat background="white" p={4} rounded="lg">
                    <StatLabel>Sản phẩm</StatLabel>
                    <StatNumber>45</StatNumber>
                    <StatHelpText>
                    <StatArrow type='decrease' />
                    9.05%
                    </StatHelpText>
                </Stat>
            </StatGroup>
        </AdminLayout>
    );
}
