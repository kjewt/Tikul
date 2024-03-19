import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { CategoryDataType } from '../../types/Types';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type ListSummaryProps = {
    summaryData: CategoryDataType[] | undefined;
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: '지난 달과 비교',
        },
    },
};

export const LineChartSummary = ({ summaryData }: ListSummaryProps): JSX.Element => {

    if (summaryData === undefined) return (<div></div>)
    const labels = summaryData?.map((item) => item.category)
    const thisMonthData = summaryData?.map((item) => item.thisMonth)
    const lastMonthData = summaryData?.map((item) => item.lastMonth + item.thisMonth)

    const data = {
        labels,
        datasets: [
            {
                label: '이번 달',
                data: thisMonthData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '저번 달',
                data: lastMonthData,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };




    return (<div>
        <Bar options={options} data={data} />
    </div>)

}