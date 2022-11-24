import React from 'react'
import { Col } from 'antd';

import './style.css'

function Card({type, number}) {
    const styleType = (type === 'missed') ? 'missed' : (type === 'passed') ? 'passed' : (type === 'recheduled') ? 'recheduled' : ''
  return (
    <Col span={8}>
      <div className={styleType}>
            <p style={{color: 'black', fontWeight: 'bold'}}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
            <p style={{fontSize: '30px', fontWeight: 'bolder'}}>
                {number}
            </p>
      </div>
    </Col>
  )
}

export default Card
