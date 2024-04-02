import Pagination from "react-js-pagination";
import '../../assets/css/paging.css'

type PagingPropsType = {
    page: number,
    count: number,
    setPage: (page: number) => void
};


export const Paging = ({ page, count, setPage }: PagingPropsType) => {


    return (
        <div>
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={(page) => setPage(page)}

            />
        </div>
    );
};
