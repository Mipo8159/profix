import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard-icon.svg';
import { ReactComponent as PagesIcon } from '../assets/icons/pages-icon.svg';
import { ReactComponent as ApplicationIcon } from '../assets/icons/application-icon.svg';
import { ReactComponent as EcommerceIcon } from '../assets/icons/ecommerce-icon.svg';
import { ReactComponent as AuthenticationIcon } from '../assets/icons/authentication-icon.svg';
import { ReactComponent as InteractionIcon } from '../assets/icons/interaction-icon.svg';
import { ReactComponent as AdditionalIcon } from '../assets/icons/interaction-icon.svg';
import { ReactComponent as WidgetsIcon } from '../assets/icons/widgets-icon.svg';

const Sidebar: React.FC = () => {
  return (
    <aside
      className='
        sidenav
        navbar navbar-vertical navbar-expand-xs mip-custom
        border-0 border-radius-xl
        my-3
        fixed-start
        ms-3
        pb-3
      '
      id='sidenav-main'
    >
      <div className='sidenav-header mt-1 mb-0'>
        <a
          className='navbar-brand m-0'
          href='https://beflex.ge/'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/img/logo-ct.png'
            className='navbar-brand-img h-100'
            alt='main_logo'
          />
          <span className='ms-3 font-weight-bold text-secondary'>
            BeFlex CMS
          </span>
        </a>
      </div>
      <hr
        className='horizontal bg-white mt-0 p-0 mx-auto'
        style={{ width: '80%' }}
      />
      <div
        className='collapse navbar-collapse w-auto h-auto max-height-vh-100 h-100'
        id='sidenav-collapse-main'
      >
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to='/' className='nav-link active'>
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                '
              >
                <DashboardIcon />
              </div>
              <span className='nav-link-text ms-1'>Dashboard</span>
            </Link>
          </li>

          {/* PAGES-BTN */}
          <li className='nav-item mt-3'>
            <h6
              className='
                ps-4
                ms-2
                text-uppercase text-xs text-white
                font-weight-bolder
                opacity-6 
              '
            >
              PAGES
            </h6>
          </li>
          <li className='nav-item'>
            <a
              data-bs-toggle='collapse'
              href='#pagesExamples'
              className='nav-link text-white'
              aria-controls='pagesExamples'
              role='button'
              aria-expanded='false'
            >
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                '
              >
                <PagesIcon />
              </div>
              <span className='nav-link-text ms-1'>Pages</span>
            </a>
            <div className='collapse' id='pagesExamples'>
              <ul className='nav ms-4 ps-3'>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    aria-expanded='false'
                    href='#profileExample'
                  >
                    <span className='sidenav-mini-icon'> P </span>
                    <span className='sidenav-normal text-white'>
                      Profile <b className='caret'></b>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* APPLICATIONS-BTN */}
          <li className='nav-item'>
            <a
              data-bs-toggle='collapse'
              href='#applicationsExamples'
              className='nav-link'
              aria-controls='applicationsExamples'
              role='button'
              aria-expanded='false'
            >
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                '
              >
                <ApplicationIcon />
              </div>
              <span className='nav-link-text ms-1'>Applications</span>
            </a>
            <div className='collapse' id='applicationsExamples'>
              <ul className='nav ms-4 ps-3'>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='../../pages/applications/kanban.html'
                  >
                    <span className='sidenav-normal'> Kanban </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* E-COMMERCE */}
          <li className='nav-item'>
            <a
              data-bs-toggle='collapse'
              href='#ecommerceExamples'
              className='nav-link'
              aria-controls='ecommerceExamples'
              role='button'
              aria-expanded='false'
            >
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                '
              >
                <EcommerceIcon />
              </div>
              <span className='nav-link-text ms-1'>Ecommerce</span>
            </a>
            <div className='collapse' id='ecommerceExamples'>
              <ul className='nav ms-4 ps-3'>
                {/* Products Area*/}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    data-bs-toggle='collapse'
                    aria-expanded='false'
                    href='#productsExample'
                  >
                    <span className='sidenav-mini-icon'> P </span>
                    <span className='sidenav-normal'>
                      Products <b className='caret'></b>
                    </span>
                  </a>
                  <div className='collapse' id='productsExample'>
                    <ul className='nav nav-sm flex-column'>
                      <li className='nav-item'>
                        <a
                          className='nav-link'
                          href='../../pages/ecommerce/products/new-product.html'
                        >
                          <span className='sidenav-mini-icon text-xs'></span>
                          <span className='sidenav-normal'>
                            New Product
                          </span>
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          className='nav-link'
                          href='../../pages/ecommerce/products/products-list.html'
                        >
                          <span className='sidenav-normal'>
                            Product List
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Category Area */}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    data-bs-toggle='collapse'
                    aria-expanded='false'
                    href='#categoryExample'
                  >
                    <span className='sidenav-normal'>
                      Categories <b className='caret'></b>
                    </span>
                  </a>
                  <div className='collapse' id='categoryExample'>
                    <ul className='nav nav-sm flex-column'>
                      <li className='nav-item'>
                        <a
                          className='nav-link'
                          href='../../pages/ecommerce/orders/list.html'
                        >
                          <span className='sidenav-normal'>
                            New Category
                          </span>
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          className='nav-link'
                          href='../../pages/ecommerce/orders/details.html'
                        >
                          <span className='sidenav-normal'>
                            Category List
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Order Area */}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    data-bs-toggle='collapse'
                    aria-expanded='false'
                    href='#ordersExample'
                  >
                    <span className='sidenav-mini-icon'> O </span>
                    <span className='sidenav-normal'>
                      Orders <b className='caret'></b>
                    </span>
                  </a>
                  <div className='collapse' id='ordersExample'>
                    <ul className='nav nav-sm flex-column'>
                      <li className='nav-item'>
                        <a
                          className='nav-link'
                          href='../../pages/ecommerce/orders/list.html'
                        >
                          <span className='sidenav-normal'>
                            Order List
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          {/* Authentication Area */}
          <li className='nav-item'>
            <a
              data-bs-toggle='collapse'
              href='#authExamples'
              className='nav-link'
              aria-controls='authExamples'
              role='button'
              aria-expanded='false'
            >
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                '
              >
                <AuthenticationIcon />
              </div>
              <span className='nav-link-text ms-1'>Authentication</span>
            </a>
            <div className='collapse' id='authExamples'>
              <ul className='nav ms-4 ps-3'>
                {/* Sign in */}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    aria-expanded='false'
                    href='#signinExample'
                  >
                    <span className='sidenav-normal'>
                      Sign In <b className='caret'></b>
                    </span>
                  </a>
                </li>
                {/* Sign up */}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    aria-expanded='false'
                    href='#signupExample'
                  >
                    <span className='sidenav-mini-icon'> S </span>
                    <span className='sidenav-normal'>
                      Sign Up <b className='caret'></b>
                    </span>
                  </a>
                </li>
                {/* Reset Password */}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    aria-expanded='false'
                    href='#resetExample'
                  >
                    <span className='sidenav-normal'>
                      Reset Password <b className='caret'></b>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* DOCS */}
          <li className='nav-item'>
            <hr className='horizontal dark' />
            <h6
              className='
                ps-4
                ms-2
                text-white
                text-uppercase text-xs
                font-weight-bolder
                opacity-6
              '
            >
              DOCS
            </h6>
          </li>

          {/* Interaction Area */}
          <li className='nav-item'>
            <a
              data-bs-toggle='collapse'
              href='#basicExamples'
              className='nav-link'
              aria-controls='basicExamples'
              role='button'
              aria-expanded='false'
            >
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                '
              >
                <InteractionIcon />
              </div>
              <span className='nav-link-text ms-1'>Interaction</span>
            </a>
            <div className='collapse' id='basicExamples'>
              <ul className='nav ms-4 ps-3'>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    aria-expanded='false'
                    href='#gettingStartedExample'
                  >
                    <span className='sidenav-normal'>
                      Menu <b className='caret'></b>
                    </span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    aria-expanded='false'
                    href='#foundationExample'
                  >
                    <span className='sidenav-normal'>
                      Delivery <b className='caret'></b>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* Widgets Area */}
          <li className='nav-item'>
            <a
              data-bs-toggle='collapse'
              href='#componentsExamples'
              className='nav-link'
              aria-controls='componentsExamples'
              role='button'
              aria-expanded='false'
            >
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  d-flex
                  align-items-center
                  justify-content-center
                  me-2
                '
              >
                <WidgetsIcon />
              </div>
              <span className='nav-link-text ms-1'>Widgets</span>
            </a>
            <div className='collapse' id='componentsExamples'>
              <ul className='nav ms-4 ps-3'>
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='https://www.creative-tim.com/learning-lab/bootstrap/tooltips/soft-ui-dashboard'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <span className='sidenav-normal'> Slider </span>
                  </a>
                </li>

                <li className='nav-item'>
                  <a
                    className='nav-link'
                    href='https://www.creative-tim.com/learning-lab/bootstrap/tooltips/soft-ui-dashboard'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <span className='sidenav-normal'> Featured </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* Additional */}
          <li className='nav-item'>
            <a
              className='nav-link'
              rel='noreferrer'
              href='https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro/blob/main/CHANGELOG.md'
              target='_blank'
            >
              <div
                className='
                  icon icon-shape icon-sm
                  shadow
                  border-radius-md
                  bg-white
                  text-center
                  me-2
                  d-flex
                  align-items-center
                  justify-content-center
                '
              >
                <AdditionalIcon />
              </div>
              <span className='nav-link-text ms-1'>Additional</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Bar */}
      <div className='sidenav-footer mx-3 mt-3 pt-3'>
        <div
          className='
            card card-background
            shadow-none
            card-background-mask-secondary
          '
          id='sidenavCard'
        >
          <div
            className='full-background'
            style={{
              backgroundImage:
                "url('../../assets/img/curved-images/white-curved.jpeg')",
            }}
          ></div>
          <div className='card-body text-start p-3 w-100'>
            <div
              className='
                icon icon-shape icon-sm
                bg-white
                shadow
                text-center
                mb-3
                d-flex
                align-items-center
                justify-content-center
                border-radius-md
              '
            >
              <i
                className='ni ni-diamond text-dark text-gradient text-lg top-0'
                aria-hidden='true'
                id='sidenavCardIcon'
              ></i>
            </div>
            <div className='docs-info'>
              <h6 className='text-white up mb-0'>Need Consultation?</h6>
              <p className='text-xs font-weight-bold'>
                Please check out out webite
              </p>
              <a
                href='https://beflex.ge/'
                target='_blank'
                rel='noreferrer'
                className='btn btn-white btn-sm w-100 mb-0'
              >
                beflex
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
