import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import { useState } from 'react';

import { toast } from 'react-toastify';

import {
  FiPhone,
  FiMail,
  FiX,
  FiHome,
  FiClipboard,
  FiPlusCircle,
  FiLogOut,
  FiMenu
} from 'react-icons/fi';

const Navbar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [showContact, setShowContact] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const user =
    JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  const isLoggedIn =
    !!localStorage.getItem('token');

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    toast.success(
      'Logout successful'
    );

    setTimeout(() => {

      navigate('/login');

    }, 1000);
  };

  // ACTIVE NAV STYLE

  const navStyle = (path) => ({

    textDecoration:'none',

    color:
      location.pathname === path
        ? '#E85D04'
        : '#6B7280',

    fontWeight:'700',

    padding:'10px 14px',

    borderRadius:'12px',

    background:
      location.pathname === path
        ? '#FFF1E6'
        : 'transparent',

    display:'flex',

    alignItems:'center',

    gap:'8px',

    transition:'0.3s',

    whiteSpace:'nowrap'
  });

  return (

    <>

      {/* NAVBAR */}

      <nav
        style={{
          background:'rgba(255,255,255,0.95)',

          backdropFilter:'blur(10px)',

          borderBottom:'1px solid #F1F5F9',

          position:'sticky',

          top:0,

          zIndex:1000
        }}
      >

        <div
          className="container navbar-container"
        >

          {/* LOGO */}

          <Link
            to="/dashboard"
            style={{
              textDecoration:'none'
            }}
          >

            <div
              style={{
                display:'flex',

                alignItems:'center',

                gap:'12px'
              }}
            >

              <div
                style={{
                  width:'48px',

                  height:'48px',

                  borderRadius:'16px',

                  background:
                    'linear-gradient(135deg,#E85D04,#DC2F02)',

                  color:'white',

                  display:'flex',

                  alignItems:'center',

                  justifyContent:'center',

                  fontWeight:'800',

                  fontSize:'20px'
                }}
              >
                Z
              </div>

              <div>

                <h2
                  style={{
                    color:'#111827',

                    fontSize:'1.5rem',

                    fontWeight:'800'
                  }}
                >
                  Zepnest
                </h2>

                <p
                  style={{
                    color:'#6B7280',

                    fontSize:'12px'
                  }}
                >
                  Home Services Platform
                </p>

              </div>

            </div>

          </Link>

          {/* MOBILE BUTTON */}

          {isLoggedIn && (

            <button
              className="mobile-menu-btn"
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
            >

              <FiMenu size={22} />

            </button>

          )}

          {/* DESKTOP NAV */}

          {isLoggedIn && (

            <div className="desktop-nav">

              <Link
                to="/dashboard"
                style={navStyle('/dashboard')}
              >
                <FiHome />

                Dashboard
              </Link>

              <Link
                to="/requests"
                style={navStyle('/requests')}
              >
                <FiClipboard />

                My Requests
              </Link>

              <Link
                to="/create-request"
                className="btn btn-primary navbar-btn"
              >
                <FiPlusCircle />

                New Request
              </Link>

              <button
                onClick={() =>
                  setShowContact(true)
                }
                className="btn btn-outline navbar-btn"
              >
                Contact Us
              </button>

              <div className="navbar-user">

                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

              <button
                onClick={handleLogout}
                className="btn btn-outline navbar-btn"
              >
                <FiLogOut />

                Logout
              </button>

            </div>

          )}

        </div>

        {/* MOBILE NAV */}

        {mobileMenu && isLoggedIn && (

          <div className="mobile-nav">

            <Link
              to="/dashboard"
              style={navStyle('/dashboard')}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <FiHome />

              Dashboard
            </Link>

            <Link
              to="/requests"
              style={navStyle('/requests')}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <FiClipboard />

              My Requests
            </Link>

            <Link
              to="/create-request"
              className="btn btn-primary"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <FiPlusCircle />

              New Request
            </Link>

            <button
              onClick={() => {

                setShowContact(true);

                setMobileMenu(false);
              }}
              className="btn btn-outline"
            >
              Contact Us
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-outline"
            >
              <FiLogOut />

              Logout
            </button>

          </div>

        )}

      </nav>

      {/* CONTACT MODAL */}

      {showContact && (

        <div className="modal-overlay">

          <div
            className="card"
            style={{
              maxWidth:'420px',
              width:'100%',
              position:'relative',
              textAlign:'center'
            }}
          >

            <button
              onClick={() =>
                setShowContact(false)
              }
              className="modal-close"
            >
              <FiX />
            </button>

            <div className="contact-logo">

              Z

            </div>

            <h2
              style={{
                marginBottom:'18px'
              }}
            >
              Contact Us
            </h2>

            <div className="contact-box">

              <strong>
                Developer:
              </strong>
              <strong>
              <a
                href="https://linkedin.com/in/ramu-kathi"
                target="_blank"
                rel="noreferrer"
                style={{
                  color:'#E85D04',
                  textDecoration:'none',
                  textOverflow:'hidden',
                  
                }}
              >
                Ramu Kathi
              </a>
              </strong>

            </div>

            <div className="contact-box">

              <FiMail />

              ramukathi18@gmail.com

            </div>

            <div className="contact-box">

              <FiPhone />

              6302599608

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default Navbar;