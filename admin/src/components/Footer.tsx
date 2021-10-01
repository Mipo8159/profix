import React from 'react';

const Footer = () => {
  return (
    <footer className='footer py-3 px-4'>
      <div className='container-fluid'>
        <div className='row align-items-center justify-content-lg-between'>
          <div className='col-lg-6 mb-lg-0 mb-4'>
            <div className='copyright text-center text-sm text-muted text-lg-start'>
              ©<script>document.write(new Date().getFullYear());</script>
              <a
                href='https://beflex.ge/'
                className='font-weight-bold'
                target='_blank'
                rel='noreferrer'
              >
                BeFlex.ge
              </a>
            </div>
          </div>
          <div className='col-lg-6'>
            <ul
              className='
                    nav nav-footer
                    justify-content-center justify-content-lg-end
                  '
            >
              <li className='nav-item'>
                <a
                  href='https://beflex.ge/'
                  className='nav-link text-muted'
                  target='_blank'
                  rel='noreferrer'
                >
                  BeFlex
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='https://beflex.ge/team/en'
                  className='nav-link text-muted'
                  target='_blank'
                  rel='noreferrer'
                >
                  About Us
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='https://beflex.ge/blog/en'
                  className='nav-link text-muted'
                  target='_blank'
                  rel='noreferrer'
                >
                  Blog
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='https://beflex.ge/contact/en'
                  className='nav-link pe-0 text-muted'
                  target='_blank'
                  rel='noreferrer'
                >
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
