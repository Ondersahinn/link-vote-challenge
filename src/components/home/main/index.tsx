import React from "react";
import { ReactComponent as PlusIcon } from 'assest/img/Plus.svg'
import { Link } from 'react-router-dom'
import "./index.scss";
import LinkList from "components/linkList";

export const Main: React.FC = () => {

  return (
    <div className='home-page-box'>
      <div className="home-page-normal-part">
        <Link to='/newlink' className="add-new-link">
          <span className="icon-box">
            <PlusIcon />
          </span>
          <span>SUBMIT A LINK</span>
        </Link>
        <LinkList />
      </div>
    </div>
  );
};
