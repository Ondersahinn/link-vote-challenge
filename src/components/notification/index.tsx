
import './index.scss'
import { ReactComponent as CloseIcon } from 'assest/img/Close.svg'
import { useEffect } from 'react'

const Notification = ({ visible, desc , onCancel}) => {

    useEffect(() => {
        setTimeout(() => {
                onCancel()
        },5000)
    })

    if (visible) {
        return (
            <>
                <div className="notification-full-part" >
                    <div className="notification-box">
                        <div className="notification-info">
                            <div className='header'>
                                <h4>{desc ?? ' notification'}</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
    return (
        <>
        </>
    )
}

export default Notification;