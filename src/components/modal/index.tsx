
import './index.scss'
import { ReactComponent as CloseIcon } from 'assest/img/Close.svg'

const Modal = ({ visible, onCancel, title, children }) => {


    if (visible) {
        return (
            <>
                <div className="modal-full-part" >
                    <div className="modal-box">
                        <div className="modal-info">
                            <div className='header'>
                                <h4>{title ?? ' Modal'}</h4>
                                <span onClick={onCancel}>
                                    <CloseIcon />
                                </span>
                            </div>
                            <div className='modal-body'>
                                {children}
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

export default Modal;