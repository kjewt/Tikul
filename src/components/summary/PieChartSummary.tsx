import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { CategoryDataType } from '../../types/Types';
ChartJS.register(
    ArcElement,
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
            text: '이번달 소비 비율',
        },
    },
};

export const PieChartSummary = ({ summaryData }: ListSummaryProps): JSX.Element => {

    if (summaryData === undefined) return (<div></div>)
    const labels = summaryData?.map((item) => item.category)
    const thisMonthData = summaryData?.map((item) => item.thisMonth)


    const data = {
        labels: labels,
        datasets: [
            {
                label: '이번 달',
                data: thisMonthData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 150, 255, 0.2)',
                    'rgba(100, 200, 100, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 150, 255, 1)',
                    'rgba(100, 200, 100, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };



    return (
        <div>
            <span className="text-sm opacity-50">카테고리별 비율</span>
            <Pie data={data} className="py-2" />
        </div>)

}