import { menuItems,menuItemsLogged } from '../../../menuItems';
import MenuItems from './MenuItems'
//import navbarstyles from '../../../Styles/navbar.css'
import { useEffect, useState } from 'react';
import styles from '../Styles/navbar.css';

const Navbar = () => {
  let menu = []
  let user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user)
  if (user) {
    menu = menuItemsLogged
  }else{
    menu = menuItems
  }

  

  return (
    <nav>
      <ul className="menus">
        {menu.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MenuItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
              
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
