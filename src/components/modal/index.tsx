
import './index.scss'

const Modal = ({ visible, onCancel, title, children }) => {


    if (visible) {
        return (
            <>
                <div className="modal-full-part" onClick={onCancel}>
                    <div className="modal-box">
                        <div className="modal-info">
                            <div className='header'>
                                <h4>{title ?? ' Modal'}</h4>
                                <span onClick={onCancel}>Close</span>
                            </div>
                            <div>
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