import React from 'react'
import globe from '../images/globe.png';
import launch from '../images/launch.png';
import diamond from '../images/diamond.png';
import { NavLink}  from 'react-router-dom';

function NavigationLinks() {
  return (
    <div id="links">
      <NavLink className="link-text w500 p-3" to="/" style={({ isActive }) => ({
        background: isActive ? '#eeeeee' : '#ffffff',
      })} >
        <img src={globe} height="15vh" alt="explore" />&nbsp;&nbsp;Explore
      </NavLink>
      <NavLink className="link-text w500 p-3" to="/create" style={({ isActive }) => ({
        background: isActive ? '#eeeeee' : '#ffffff',
      })}>
        <img src={launch} height="15vh" alt="launch" />&nbsp;&nbsp;Sell a product
      </NavLink>
      <NavLink className="link-text w500 p-3" to="/my-auctions" style={({ isActive }) => ({
        background: isActive ? '#eeeeee' : '#ffffff',
      })}>
        <img src={diamond} height="15vh" alt="diamond" />&nbsp;&nbsp;My Auctions
      </NavLink>
    </div>
  )
}

export default NavigationLinks