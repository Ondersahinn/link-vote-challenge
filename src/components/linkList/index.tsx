import { linkList } from "components/constants";
import { ReactComponent as ArrowDownIcon } from 'assest/img/ArrowDown.svg';
import { ReactComponent as ArrowUpIcon } from 'assest/img/ArrowUp.svg'
import { ReactComponent as MinusCircleIcon } from 'assest/img/minus-circle.svg'
import Pagination from "components/pagination";
import { useSelector } from "react-redux";
import Modal from "components/modal";
import { useState } from "react";


const LinkList = () => {
    const pageIndex = useSelector((state: any) => state.linkList.pageIndex)
    const pageSize = useSelector((state: any) => state.linkList.pageSize)
    const [visible, setVisible] = useState(false);

    const onCancel = (e) => {
       setVisible(false)
    }
    
    return (
        <>
            <div className="link-list-box">
                <select className="order-select">
                    <option disabled>Order By</option>
                    <option value='asc'>Most Voted (Z - A)</option>
                    <option value='desc'>Less Voted (A - Z)</option>
                </select>
                {linkList.slice((pageIndex * pageSize) - 5, pageSize * pageIndex).map((e) => {
                    return (
                        <div className="link-lists" key={e.id}>
                            <div className="point">
                                <span>{e.point}</span>
                                <span>POINTS</span>
                            </div>
                            <div className="link-desc">
                                <h3> {e.linkName} </h3>
                                <span>( {e.linkUrl} ) </span>
                                <div className="button-group">
                                    <button> <ArrowUpIcon /><span> Up Vote </span></button>
                                    <button> <ArrowDownIcon /> <span> Down Vote</span> </button>
                                </div>
                            </div>
                            <span className="delete-icon">
                                <MinusCircleIcon onClick={() => setVisible(true)} />
                            </span>
                        </div>
                    )
                })}
                <Pagination total={linkList.length} pageSize={5} />

            </div>
            <Modal title='Deneme' visible={visible} onCancel={onCancel}>
                <span>Deneme</span>
            </Modal>
        </>

    )
}

export default LinkList;