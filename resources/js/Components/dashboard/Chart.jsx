import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Avatar } from "@chakra-ui/react";
import moment from "moment";

export default function Chart({ transactions }) {
    const [data1, setData1] = useState();
    const [data2, setData2] = useState();

    useEffect(() => {
        setData1(generateRandomData());
        setData2(generateRandomData());

        const interval = setInterval(() => {
            setData1(generateRandomData());
            setData2(generateRandomData());
        }, 15000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const generateRandomData = () => {
        const randomData = [];
        for (let i = 0; i < labels.length; i++) {
            randomData.push(Math.floor(Math.random() * 1000));
        }
        return randomData;
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "5Dreams Data",
            },
        },
    };

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Tiền vào",
                data: data1,
                backgroundColor: "#c3ae93",
            },
            {
                label: "Tiền ra",
                data: data2,
                backgroundColor: "#b9bbc1",
            },
        ],
    };

    return (
        <section className="grid grid-cols-3 gap-8 mt-8">
            <div className="bg-white h-[450px] rounded-xl shadow-sm p-4 col-span-3 xl:col-span-2 hidden md:block">
                <Bar options={options} data={data} />
            </div>
            <div className="bg-white h-[450px] rounded-xl shadow-sm py-4 px-6 col-span-3 xl:col-span-1 text-sm">
                <h1 className=" font-semibold">Giao dịch gần đây</h1>
                {transactions.length &&
                    transactions.map((item) => (
                        <div
                            key={item.id}
                            className="flex text-gray-600 gap-2 items-center mt-3"
                        >
                            <Avatar size="sm" name={item.author.name} />
                            <div>
                                <div>
                                    <span className="font-semibold">
                                        {item.author.name}
                                    </span>{" "}
                                    đã {item.type == 1 ? "gửi vào" : "rút ra"}{" "}
                                    {Number(item.total).toLocaleString("en-US")}{" "}
                                    vnd
                                </div>
                                <div className="flex text-xs items-center gap-1 font-medium text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {moment(item.created_at).format(
                                        "HH:mm:ss DD/MM/YYYY"
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
}
