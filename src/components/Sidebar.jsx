import React, { useContext, useState } from 'react';
import { MainContext } from '../contexts/DataProvider';

import mobileSB from '../assets/images/bg-sidebar-mobile.svg'
import desktopSB from '../assets/images/bg-sidebar-desktop.svg'

const stepNames = ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'];

const Sidebar = () => {
  const con = useContext(MainContext);

  return (
    <div className="sidebar">
      <picture>
        <source
          media="(min-width: 1000px)"
          srcSet={desktopSB}
          sizes=""
        />
        <source
          media="(max-width: 1000px)"
          srcSet={mobileSB}
          sizes=""
        />
        <img
          src="../assets/images/bg-sidebar-mobile.svg"
          alt="sidebar-background"
          className="bg-sidebar"
        />
      </picture>
      <nav className='btns-sidebar'>
        {(function () {
            let items = [];
            for(let i = 1; i <= 4; i++) {
                items.push(<NavItem key={i} item={i} stepName={stepNames[i-1]} active={con.curStep}/>)
            }
            return items;
        })()}
      </nav>
    </div>
  );
};

export default Sidebar;

const NavItem = ({item, stepName, active}) => {
    return (
        <div className={`nav-item ${active === item ? 'active-step' : ''}`}>
            <button className={`btn-nav-${item} btn-nav`} data-step={item}>
                {item}
            </button>
            <div className="step-info">
                <h2 className="step-number">STEP {item}</h2>
                <h2 className="step-name">{stepName}</h2>
            </div>
        </div>
    )
}
