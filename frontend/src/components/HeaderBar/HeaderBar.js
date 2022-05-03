import React, {useContext,useEffect} from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {AppContext} from "../../contexts/AppContext"
import UserImage from '../UIs/UserImage';

const HeaderBar = () => {
  const {
    user,
    setUser,
    showSmallSidebar,
    setShowSmallSidebar,
    mobileNav,
    showNav,
    setShowNav,
    isMobile
  } = useContext(AppContext)
  
  let id = 11135
  useEffect(() => {
    fetch(`/getStudent/${id}`)
    .then(res=> res.json())
    .then(response => {
       setUser(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  if(user.length === 0) {
      return
  }

  const showSmallSidebarHandler = () => {
    setShowSmallSidebar(!showSmallSidebar)
  }

  const showSidebarMobile = () => {
    setShowNav(true)
    console.log('clicked',showNav)
  }

  return (
   <FixedHeader 
    isMobile={isMobile}
    showSmallSidebar={showSmallSidebar}
    >
      <HeaderWrapper 
      showSmallSidebar={showSmallSidebar}
      isMobile={isMobile}
      >
        <div className="header-left-part">
          <div className="small-sidebar">
            {
              !mobileNav && (
                <FontAwesomeIcon onClick={showSmallSidebarHandler} icon={solid('outdent')} />
              )
            }
            {
              mobileNav && (
                <FontAwesomeIcon onClick={showSidebarMobile} icon={solid('bars')} />
              )
            }
          </div>
          <div className="search-bar">
          <input type="text" placeholder="Search here" name="search">
          </input>
            <FontAwesomeIcon icon={solid('search')} />
          </div>

        </div>
        <div className="user-area">
          <div className="notification">
            <FontAwesomeIcon icon={solid('bell')} />
          </div>
          <div className="user-wrapper">
            <UserImage user_photo={user.user_photo}/>
          </div>
        </div>
      </HeaderWrapper>
  </FixedHeader>
  
 );
};
const FixedHeader = styled.div`
    background: white;
    width: ${({showSmallSidebar,isMobile}) => showSmallSidebar ? 'calc(100% - 60px)' : isMobile ? '100%':'calc(100% - 285px)'};
    position: fixed;
    z-index: 9;
`
const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #aaa5a54f;
    padding: 10px 20px;
    padding: ${({showSmallSidebar}) => showSmallSidebar ? '8px 5px' : '10px 20px'};
    justify-content: space-between;
    .user-area {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({isMobile}) => isMobile ? '0px 1rem' : '0px 3rem'}
   }
   .user-wrapper {
   }
   .notification {
       color: #747474;
       font-size: 25px;
   }
   .search-bar input {
    border: none;
    padding: 5px 0px;
    width: 100%;
}
.search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding:${({isMobile}) => isMobile ? '3px' : '8px'};
    border-radius: 25px;
    border: 1px solid #e4e4e4;
    width: ${({isMobile}) => isMobile ? '150px' : '270px'};
    position: relative;
}
.search-bar input::placeholder {
    color: #7c7c7c;
}
.search-bar input:focus-visible {
    border: none;
    outline: none;
    color: #2196F3;
}
input[placeholder="Search here"]:focus {
    background: none;
}
.search-bar svg {
    color: #ffc107;
    font-size: 14px;
        position: absolute;
    right: 1.5vw;
}
.header-left-part {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 2rem;
}.small-sidebar {
    font-size: 25px;
    color: #3498ec;
    &:hover {
    cursor: pointer;
    transition: all 200ms ease-in;
   }
}

`
export default HeaderBar;