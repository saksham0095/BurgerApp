import React from 'react';

import Logo from '../../Logo/Logo';
import classes from './ToolBar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolBar=(props)=>(

		<header className={classes.ToolBar}>
        <DrawerToggle clicked={props.drawToggleClicked}/>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
        <NavigationItems/>
        </nav>
		</header>

);

export default toolBar;