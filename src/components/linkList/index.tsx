import { ReactComponent as ArrowDownIcon } from 'assest/img/ArrowDown.svg';
import { ReactComponent as ArrowUpIcon } from 'assest/img/ArrowUp.svg'
import { ReactComponent as MinusCircleIcon } from 'assest/img/minus-circle.svg'
import Pagination from "components/pagination";
import { useDispatch, useSelector } from "react-redux";
import Modal from "components/modal";
import { useState } from "react";
import Notification from "components/notification";
import { handleLinkChange, handlePageIndexChange } from 'redux/actions';
import EmtyImage from 'assest/img/emty-data.png';

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

    const onCancel = () => {
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
        const totalPage = Math.ceil(filteredData.length / pageSize);
        if (pageIndex > totalPage) {
            dispatch(handlePageIndexChange(pageIndex - 1))
        }
        dispatch(handleLinkChange(filteredData));
        setVisible(false)
        setNotificationVisible(true)
    }

    const handlePointVote = (link, voteType) => {
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
                const datePointB = new Date(b.pointCreatedTime);
                if (b.point === a.point) {
                    if (datePointA > datePointB) {
                        return 0
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
                const datePointB = new Date(b.pointCreatedTime);
                if (b.point === a.point) {
                    if (datePointA > datePointB) {
                        return 0
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
                <div className="link-list-box" data-testid='linklist-test'>
                    <select className="order-select" defaultValue='' onChange={handleLinkSort}>
                        <option disabled value=''>Order By</option>
                        <option value='asc'>Most Voted (Z - A)</option>
                        <option value='desc'>Less Voted (A - Z)</option>
                    </select>
                    {linkList.slice((pageIndex * pageSize) - 5, pageSize * pageIndex).map((e, index) => {
                        return (
                            <div className="link-lists" key={index}>
                                <div className="point">
                                    <span>{e.point}</span>
                                    <span>POINTS</span>
                                </div>
                                <div className="link-desc">
                                    <h3> {e.linkName} </h3>
                                    <a href={e.linkUrl} target='_blank' rel="noreferrer">( {e.linkUrl} ) </a>
                                    <div className="button-group">
                                        <button data-testid={'vote-inc-button-' + index} onClick={() => handlePointVote(e, 'inc')}> <ArrowUpIcon /><span> Up Vote </span></button>
                                        <button data-testid={'vote-desc-button-' + index} onClick={() => handlePointVote(e, 'desc')}> <ArrowDownIcon /> <span> Down Vote</span> </button>
                                    </div>
                                </div>
                                <span className="delete-icon">
                                    <MinusCircleIcon onClick={() => handleDeleteLinkModal(e)} />
                                </span>
                            </div>
                        )
                    })}
                    <Pagination total={linkList.length} pageSize={5} pageIndex={pageIndex} />
                </div>
                <Modal title='Remove Link' visible={visible} onCancel={onCancel}>
                    <div className="remove-link-content">
                        <p>Do you want to remove: </p>
                        <span>{selectedLink?.linkName}</span>
                    </div>
                    <div className="remove-button-group">
                        <button data-testid='modal-ok-button' onClick={handleDeleteOk}>Ok</button>
                        <button data-testid='modal-cancel-button' onClick={() => setVisible(false)}>Cancel</button>
                    </div>
                </Modal>
                <Notification desc='Remove Link' visible={notificationVisible} onCancel={handleNotificationCancel} />
            </>

        )
    }
    return (
        <>
            <div className="link-list-box nodata" data-testid='linklist-test-no-data'>
                <img src={EmtyImage} alt='Not data' />
                <span>NO DATA</span>
            </div>
        </>

    )

}

export default LinkList;