import { ReactComponent as ArrowDownIcon } from 'assest/img/ArrowDown.svg';
import { ReactComponent as ArrowUpIcon } from 'assest/img/ArrowUp.svg'
import { ReactComponent as MinusCircleIcon } from 'assest/img/minus-circle.svg'
import Pagination from "components/pagination";
import { useDispatch, useSelector } from "react-redux";
import Modal from "components/modal";
import { useState } from "react";
import Notification from "components/notification";
import { handleLinkChange, handlePageIndexChange } from 'redux/actions';

export interface ILinkProp {
    createdDateTime: string,
    id: string,
    linkName: string,
    linkUrl: string,
    point: number,
    pointCreatedTime: string
}

const LinkList = () => {
    const dispatch = useDispatch();
    const pageIndex = useSelector((state: any) => state.linkList.pageIndex)
    const pageSize = useSelector((state: any) => state.linkList.pageSize)
    const linkList = useSelector((state: any) => state.linkList.linkList)
    const [visible, setVisible] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [selectedLink, setSelectedLink] = useState<ILinkProp>();

    const onCancel = (e) => {
        setVisible(false)
    }

    const handleNotificationCancel = (e) => {
        setNotificationVisible(false)
    }

    const handleDeleteLinkModal = (link) => {
        setSelectedLink(link)
        setVisible(true)
    }

    const handleDeleteOk = () => {
        const linkListTemp = [...linkList];
        const filteredData = linkListTemp.filter((e) => e.id !== selectedLink?.id);
        console.log(filteredData)
        const totalPage = Math.ceil(filteredData.length / pageSize);
        if (pageIndex > totalPage) {
            dispatch(handlePageIndexChange(pageIndex - 1))
        }
        dispatch(handleLinkChange(filteredData));
        setVisible(false)
        setNotificationVisible(true)
    }

    const handleUpVote = (link, voteType) => {
        let linkListTemp = [...linkList];
        const findIndexLink = linkListTemp.findIndex((e) => e.id === link.id);
        if (findIndexLink !== -1) {
            const pointCreatedTime = new Date();
            const newObj = { ...linkListTemp[findIndexLink] }

            if (voteType === 'inc')
                newObj.point++
            else if (voteType === 'desc')
                newObj.point--

            newObj.pointCreatedTime = pointCreatedTime.toString();
            linkListTemp[findIndexLink] = { ...newObj };
            linkListTemp = linkListTemp.sort(function (a, b) {
                const datePointA = new Date(a.pointCreatedTime);
                const datePointB = new Date(a.pointCreatedTime);
                if (b.point === a.point) {
                    if (datePointA > datePointB) {
                        return 1
                    }
                    else {
                        return -1;
                    }
                }
                return b.point - a.point;
            });
            dispatch(handleLinkChange(linkListTemp))
        }
    }

    const handleLinkSort = (e) => {
        let linkListTemp = [...linkList];
        if (!!e.target.value) {
            linkListTemp = linkListTemp.sort(function (a, b) {
                const datePointA = new Date(a.pointCreatedTime);
                const datePointB = new Date(a.pointCreatedTime);
                if (b.point === a.point) {
                    if (datePointA > datePointB) {
                        return 1
                    }
                    else {
                        return -1;
                    }
                }
                else {
                    if (e.target.value === 'asc') {
                        return b.point - a.point;
                    }
                    else {
                        return a.point - b.point;
                    }
                }
            });
            dispatch(handleLinkChange(linkListTemp))
        }

    }

    if (!!linkList && linkList.length > 0) {
        return (
            <>
                <div className="link-list-box">
                    <select className="order-select" defaultValue='' onChange={handleLinkSort}>
                        <option disabled value=''>Order By</option>
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
                                    <a href={e.linkUrl} target='_blank' rel="noreferrer">( {e.linkUrl} ) </a>
                                    <div className="button-group">
                                        <button onClick={() => handleUpVote(e, 'inc')}> <ArrowUpIcon /><span> Up Vote </span></button>
                                        <button onClick={() => handleUpVote(e, 'desc')}> <ArrowDownIcon /> <span> Down Vote</span> </button>
                                    </div>
                                </div>
                                <span className="delete-icon">
                                    <MinusCircleIcon onClick={() => handleDeleteLinkModal(e)} />
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
    return (
        <>
            <div className="link-list-box">
                No Data
            </div>
        </>

    )

}

export default LinkList;