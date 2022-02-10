import { linkList } from "components/constants";
import { ReactComponent as ArrowDownIcon } from 'assest/img/ArrowDown.svg';
import { ReactComponent as ArrowUpIcon } from 'assest/img/ArrowUp.svg'
import { ReactComponent as MinusCircleIcon } from 'assest/img/minus-circle.svg'
import Pagination from "components/pagination";
import { useSelector } from "react-redux";
import Modal from "components/modal";
import { useState } from "react";
import Notification from "components/notification";


interface ILinkProp {
    createdDateTime:string,
    id:string,
    linkName:string,
    linkUrl:string,
    point:number,
    pointCreatedTime: string
}

const LinkList = () => {
    const pageIndex = useSelector((state: any) => state.linkList.pageIndex)
    const pageSize = useSelector((state: any) => state.linkList.pageSize)
    const [visible, setVisible] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [selectedLink, setSelectedLink] = useState<ILinkProp>();

    const onCancel = (e) => {
        setVisible(false)
    }

    const handleNotificationCancel = (e) => {
        setNotificationVisible(false)
    }

    const handleDeleteLink = (link) => {
        setSelectedLink(link)
        setVisible(true)
    }

    const handleDeleteOk = () => {
        const linkListTemp = [...linkList];
        const filteredData = linkListTemp.filter((e) => e.id !== selectedLink?.id);
        console.log(filteredData)
        setVisible(false)
        setNotificationVisible(true)
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
                                <MinusCircleIcon onClick={() => handleDeleteLink(e)} />
                            </span>
                        </div>
                    )
                })}
                <Pagination total={linkList.length} pageSize={5} />

            </div>
            <Modal title='Remove Link' visible={visible} onCancel={onCancel}>
                <div className="remove-link-content">
                    <p>Do you want to remove: </p>
                    <span>{selectedLink?.linkName}</span>
                </div>
                <div className="remove-button-group">
                    <button onClick={handleDeleteOk}>Ok</button>
                    <button onClick={() => setVisible(false)}>Cancel</button>
                </div>
            </Modal>
            <Notification desc='Remove Link' visible={notificationVisible} onCancel={handleNotificationCancel} />
        </>

    )
}

export default LinkList;