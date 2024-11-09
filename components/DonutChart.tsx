"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const accountNames = accounts.map((a)=> a.name);
    const balances = accounts.map((a)=> a.currentBalance)
    const data = {
        labels: [
            accountNames,
        ],
        datasets: [
            {
                label: 'First data set',
                data: balances,
                backgroundColor: [
                    'rgb(255, 99, 132 )',
                    'rgb(54, 162, 235 )',
                    'rgb(255, 206, 86 )',
                ],

            },
        ]
    }
    return <Doughnut data={data} options={{ cutout: '60%', plugins: { legend: { display: false } } }} />
}

export default DoughnutChart