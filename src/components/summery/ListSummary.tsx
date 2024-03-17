import { CategoriesList } from './CategoriesList';
import { NumberFormat } from '../../business/NumberFormat';
import { BtnEditCategory } from './BtnEditCategory';
import type { CategoryDataType } from '../../types/Types';

type ListSummaryProps = {
    summaryData: CategoryDataType[] | undefined;
};

export const ListSummary = ({ summaryData }: ListSummaryProps): JSX.Element => {


    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>수정</th>
                            <th>카테고리</th>
                            <th></th>
                            <th>이번달 소비</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryData?.map((item, index) => (
                            <tr key={String(index) + item.category}>
                                <td><BtnEditCategory category={item.category} /></td>
                                <td className="min-w-16">{item.category}</td>
                                <td><CategoriesList thisMonth={item.thisMonth} lastMonth={item.lastMonth} /></td>
                                <td>{NumberFormat(item.thisMonth)}원</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
