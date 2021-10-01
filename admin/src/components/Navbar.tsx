import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface NavbarProps {
  showSidebar: boolean;
  setShowsidebar: (key: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ showSidebar, setShowsidebar }) => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  const fetchUsers = async () => {
    const res = await axios.get('/auth/users');
    console.log(res.data);
  };

  return (
    <nav
      className="
          bg-white
          navbaring
          navbar navbar-main navbar-expand-lg
          position-sticky
          top-2
          px-0
          mx-2
          ms-4
         shadow-md
          border-radius-xl
          z-index-sticky
        "
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbar">
          <div className=" pe-md-3 d-flex align-items-center cursor-pointer">
            <div className="input-group" style={{ width: '202px' }}>
              <span className="input-group-text text-body">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
              <input type="text" className="form-control px-2" placeholder="Type here..." />
            </div>
          </div>
          <ul className="navbar-nav justify-content-end">
            {isAuth ? (
              <li className="nav-item d-flex align-items-center mx-3">
                <button
                  onClick={logout}
                  className="nav-link text-body font-weight-bold px-0 border-0 bg-transparent"
                >
                  <i className="fa fa-user me-sm-1"></i>
                  <span className="d-sm-inline d-none ms-1">Logout</span>
                </button>
              </li>
            ) : (
              <li className="nav-item d-flex align-items-center mx-3">
                <Link to="/signin" className="nav-link text-body font-weight-bold px-0">
                  <i className="fa fa-user me-sm-1"></i>
                  <span className="d-sm-inline d-none ms-1">Sign In</span>
                </Link>
              </li>
            )}

            <li onClick={fetchUsers} className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <div className="nav-link text-body p-0 cursor-pointer" id="iconNavbarSidenav">
                fetch users
              </div>
            </li>

            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <div
                onClick={showSidebar ? () => setShowsidebar(false) : () => setShowsidebar(true)}
                className="nav-link text-body p-0 cursor-pointer"
                id="iconNavbarSidenav"
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
