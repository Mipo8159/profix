import React, { useState, useEffect } from 'react';
import './assets/css/soft-ui-dashboard.css';
import './assets/css/nucleo-icons.css';
import Sidebar from './components/Sidebar';
import classNames from 'classnames';
import Navbar from './components/Navbar';
import axios from 'axios';
import AppRouter from './components/AppRouter';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
require('dotenv').config();

const App: React.FC = () => {
  const [showSidebar, setShowsidebar] = useState<boolean>(true);
  const { isAuth, accessToken } = useTypedSelector((state) => state.auth);
  const { refresh } = useActions();

  axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api';
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div
      className={classNames('g-sidenav-show bg-gray-100', {
        'g-sidenav-pinned': showSidebar,
      })}
      style={{ height: '100vh' }}
    >
      {/* SIDEBAR */}
      {isAuth && (
        <div
          onClick={showSidebar ? () => setShowsidebar(false) : () => setShowsidebar(true)}
          className="bg-white border shadow-lg cursor-pointer text-dark position-fixed rounded-circle d-flex justify-content-center align-items-center"
          style={{
            bottom: '5%',
            right: '5%',
            zIndex: 100,
            height: '55px',
            width: '55px',
          }}
        >
          <i className="fa fa-cog fa-lg"></i>
        </div>
      )}

      {/* SIDEBAR */}
      {isAuth && <Sidebar />}

      {/* MAIN START */}
      <main className="pt-4 main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        {/* NAVBAR */}
        {isAuth && <Navbar showSidebar={showSidebar} setShowsidebar={setShowsidebar} />}

        {/* PAGES */}
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
