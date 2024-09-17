import React from "react";
import "../styles/main.css";
import { SidebarData } from "./SidebarData";

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <li className="sidebar-tittle-group">
          <div className="sidebar-tittle">
            <h3>Kelola App</h3>
          </div>
        </li>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="tittle">{val.tittle}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
