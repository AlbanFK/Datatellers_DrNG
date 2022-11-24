import React from 'react'
import styles from './style.module.css'
import { Outlet } from "react-router-dom";
import { Affix } from 'antd';

function Layout() {
  return (
    <div className={styles.layout}>
      {/* <Affix offsetTop={0}> */}
        <div className={styles.bar}>
          <p className={styles.title}>
            <span>DrNG  |  PATIENTS</span> 
          </p>
          
        </div>
      {/* </Affix> */}
      
      <div className={styles.outletBody}>
        <Outlet/>
      </div>
      
    </div>
   
  )
}

export default Layout
