import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { handlePageIndexChange } from "redux/slices/linkList";
import { ReactComponent as LeftIcon } from 'assest/img/Left.svg';
import { ReactComponent as RightIcon } from 'assest/img/Right.svg'

interface IProps {
    total: number,
    pageSize: number,
}
const Pagination = ({ total, pageSize }: IProps) => {

    const dispatch = useDispatch();
    const pageIndex = useSelector((state: any) => state.linkList.pageIndex)

    let pageList = [];
    const pageCount = Math.ceil(total / pageSize);
    console.log(total);
    for (let index = 1; index <= pageCount; index++) {
        pageList.push(
            <li onClick={() => handlePaginationChange(index)} key={index} className={pageIndex === index ? styles.active : ''}> {index} </li>
        )

    }

    const handlePaginationChange = (index) => {
        if(!(index > pageCount) && index > 0){
            dispatch(handlePageIndexChange(index));
        }
    }

    return (
        <>
            <ul className={styles.pagination}>
                <li className={styles.nextprevbutton} onClick={() => handlePaginationChange(pageIndex - 1)}><LeftIcon /></li>
                {pageList}
                <li className={styles.nextprevbutton}  onClick={() => handlePaginationChange(pageIndex + 1)}><RightIcon /></li>
            </ul>
        </>
    );
};

export default Pagination;