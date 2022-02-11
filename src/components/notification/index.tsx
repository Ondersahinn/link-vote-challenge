
import './index.scss'
import { useEffect, useRef } from 'react'

const Notification = ({ visible, desc, onCancel }) => {
    let interval : any= useRef();

    useEffect(() => {
        interval.current = setInterval(() => {
            onCancel();
        }, 2000)
        return () => {
            clearInterval(interval.current);
        };
    });

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