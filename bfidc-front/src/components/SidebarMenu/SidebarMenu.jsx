import { Fragment, useRef } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineMenu, AiOutlineUser} from 'react-icons/ai';
import {RiDashboardLine} from "react-icons/ri";
import logo from "../../assets/images/logo.png"
import {getUserDetails, removeSessions} from "../../helper/SessionHelper";
const SidebarMenu = (props) => {
    let contentRef, sideNavRef,topNavRef = useRef();

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        let topNav = topNavRef;
        if (sideNav.classList.contains('side-nav-open')) {
            sideNav.classList.add('side-nav-close');
            sideNav.classList.remove('side-nav-open');
            content.classList.add('content-expand');
            content.classList.remove('content');
            topNav.classList.remove('top-nav-open');
            topNav.classList.add('top-nav-close');
        } else {
            sideNav.classList.remove('side-nav-close');
            sideNav.classList.add('side-nav-open');
            content.classList.remove('content-expand');
            content.classList.add('content');
            topNav.classList.add('top-nav-open');
            topNav.classList.remove('top-nav-close');
        }
    };


    //Logout
    const onLogout=()=> {
        removeSessions();
    }



    return (
        <Fragment>
            <Navbar className="fixed-top px-0 ">
                <Container fluid={true}>

                    <Navbar.Brand>
                        <div ref={(div) => {topNavRef = div}} className="top-nav-open">
                            <h4 className="text-white m-0 p-0"><a onClick={MenuBarClickHandler}><AiOutlineMenu /></a></h4>
                        </div>
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex align-items-center">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={getUserDetails()['photo']} alt=""/>
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={getUserDetails()['photo']} alt=""/>
                                    <h6>{getUserDetails()['firstName']} {getUserDetails()['lastName']}</h6>
                                    <hr className="user-dropdown-divider  p-0"/>
                                </div>
                                <NavLink to="/Profile" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout}  className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </Container>
            </Navbar>

            <div ref={(div) => {sideNavRef = div}} className="side-nav-open border-radius-0 card">
                <NavLink to="/" end className="d-flex justify-content-center sticky-top bg-white">
                    <img src={logo} className="logo" alt="logo"/>
                </NavLink>
                <NavLink  className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/"  end>
                    <RiDashboardLine className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>
                <NavLink   className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/Profile"  end>
                    <AiOutlineUser className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <NavLink onClick={onLogout} className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/"  end>
                    <AiOutlineLogout className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Logout</span>
                </NavLink>
            </div>

            <div ref={(div) => (contentRef = div)} className="content">
                {props.children}
            </div>
        </Fragment>
    );
};

export default SidebarMenu;
