import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// Authentication
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
// ShowOnLogin and ShowOnLogout
import ShowOnLogin, {ShowOnLogout } from "../hiddenLinks/hiddenLinks";
// Show admin if admin is logged in
import AdminOnlyroute, { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyroute";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
import { useSelector } from 'react-redux';


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        iG<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const Header = () => {
  // Navigate
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY)
  }, []);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      <FaShoppingCart size={20} />
      <p>{ cartTotalQuantity }</p>
    </Link>
  </span>
  );
  
  // Dispatching redux action
  const dispatch = useDispatch();

  const fixNavbar = () => {
    if(window.scrollY > 50){
      setScrollPage(true);
    } else
    {
      setScrollPage(false);
    }
  }
  window.addEventListener("scroll", fixNavbar);

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => { 
      if(user){
        if(user.displayName == null){
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else{
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        )
      }
      else{
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout successfully");
      navigate('/login');
    }).catch((error) => {
      toast.error(error.message);
    });
  }

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>

            <AdminOnlyLink>
            <li>
              <button className="--btn --btn-primary">
                <NavLink to="/admin/home">
                  Admin
                </NavLink>
              </button>
            </li>
            </AdminOnlyLink>

            <li>
              <NavLink to="/">
                Home
              </NavLink>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
              <NavLink to="/login" className={activeLink}>
                Login
              </NavLink>
              </ShowOnLogout>
              <a href="#home" style={{color: "#ff7722"}}>
                <FaUserCircle size={16} />
                Hi, { displayName }
              </a>
              {/* <NavLink to="/register" className={activeLink}>
                Register
              </NavLink> */}
              <NavLink to="/order-history" className={activeLink}>
                My Orders
              </NavLink>
              <ShowOnLogin>
              <NavLink to="/" onClick={logoutUser}>
                Logout
              </NavLink>

              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};
export default Header;