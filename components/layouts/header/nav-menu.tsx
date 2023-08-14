import React from "react";
import Link from "next/link";

const NavMenu = ({
  isMobileAndTablet,
  user,
  storeData,
  navRef,
  menuOpen,
  siteHeaderHeight,
}) => {
  return (
    <nav
      ref={navRef}
      className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
      style={{ paddingTop: isMobileAndTablet ? siteHeaderHeight : null }}
    >
      <div className="site-nav__container">
        {storeData.navigationMenu &&
        storeData.navigationMenu.NavigationMenuItems &&
        storeData.navigationMenu.NavigationMenuItems ? (
          <>
            {storeData.navigationMenu.NavigationMenuItems.map(
              (menuItem, index) => {
                return (
                  <Link
                    href={`/${menuItem.link}`}
                    key={index}
                    className="site-nav__link"
                  >
                    {menuItem.name}
                  </Link>
                );
              }
            )}
          </>
        ) : (
          <>
            <Link href="/" className="site-nav__link">
              Home
            </Link>
            <Link href="/products" className="site-nav__link">
              Products
            </Link>
            <Link href="/collections" className="site-nav__link">
              Shop
            </Link>
            <Link href="/our-story" className="site-nav__link">
              Our Story
            </Link>
            <Link href="/faq" className="site-nav__link">
              FAQs
            </Link>
          </>
        )}
        {isMobileAndTablet ? (
          <Link
            className="site-nav__link"
            href={user.id ? "/account/profile" : "/login"}
          >
            Account
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default NavMenu;
