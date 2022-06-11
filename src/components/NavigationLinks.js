import React from "react";
import { NavLink } from "react-router-dom";

function NavigationLinks() {
  return (
    <div id="links">
      <NavLink className="link-text w500 p-3" activeclassname="active" to="/">
        Explore
      </NavLink>
      <NavLink
        className="link-text w500 p-3"
        activeclassname="active"
        to="/create"
      >
        Sell a product
      </NavLink>
    </div>
  );
}

export default NavigationLinks;
