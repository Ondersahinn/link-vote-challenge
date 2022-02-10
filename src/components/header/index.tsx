import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from 'assest/img/logo.svg';
import './index.scss'

const Header = () => {
    return (
        <div className="header-full-part">
            <div className="header-normal-part">
                <Link to='/'>
                    <Logo />
                </Link>
                <h1><span>Link</span>VOTE Challenge</h1>
            </div>

        </div>
    )
}

export default Header;