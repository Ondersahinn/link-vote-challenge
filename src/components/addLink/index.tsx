import { ReactComponent as Vector } from 'assest/img/Vector.svg'
import { ILinkProp } from 'components/linkList';
import Notification from 'components/notification';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleLinkChange } from 'redux/actions';

const AddLink = () => {

    const dispatch = useDispatch();
    const linkList = useSelector((state : any) => state.linkList.linkList)
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [addLinkName, setAddLinkName] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const linkListTemp = [...linkList]
        const date = new Date();
        const newObj : ILinkProp = {
            linkName:  e.target.linkName.value,
            linkUrl: e.target.linkUrl.value,
            id: Date.now().toString(),
            point: 0,
            pointCreatedTime: '',
            createdDateTime : date.toString()
        };
        newObj.linkName = e.target.linkName.value;
        linkListTemp.unshift(newObj)
        dispatch(handleLinkChange(linkListTemp))
        setNotificationVisible(true);
        setAddLinkName(e.target.linkName.value)
    }

    
    const handleNotificationCancel = () => {
        setNotificationVisible(false)
    }

    return (
        <>
            <div className='add-to-list'>
                <div className='add-to-list-normal-part'>
                    <Link to='/' className='back-to-list'>
                        <Vector />
                        <span>Return to List</span>
                    </Link>
                    <h1>Add New Link</h1>
                    <form onSubmit={handleFormSubmit} className='add-to-form'>
                        <label htmlFor="linkName">Link Name : </label>
                        <input name='linkName' />
                        <label htmlFor="linkUrl">Link Url : </label>
                        <input name='linkUrl' />
                        <div className='submit-button'>
                            <button type='submit'>Kaydet</button>
                        </div>
                    </form>
                </div>
            </div>
            <Notification desc={addLinkName.toUpperCase()+' added.'} visible={notificationVisible} onCancel={handleNotificationCancel} />
        </>
    )
}

export default AddLink;