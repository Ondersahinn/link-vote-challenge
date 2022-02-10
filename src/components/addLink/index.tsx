import { ReactComponent as Vector } from 'assest/img/Vector.svg'
import { Link } from 'react-router-dom';

const AddLink = () => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.linkName.value)
        console.log(e.target.linkUrl.value)
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
        </>
    )
}

export default AddLink;