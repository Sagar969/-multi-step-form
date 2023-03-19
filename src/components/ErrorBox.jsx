import React, { useContext, useEffect } from 'react'
import { MainContext } from '../contexts/DataProvider'
import styled, { keyframes } from 'styled-components'

const showErrorAni = keyframes`
0% { display: block; opacity: 0; transform: translate(-50%, 10vh); boxShadow: none;}
30% { opacity: 1; transform: translate(-50%, -20vh); box-shadow: none;}
60% { opacity: 1; transform: translate(-50%, -20vh); box-shadow: .5rem .5rem 1rem red; }
90% { opacity: 1; transform: translate(-50%, -20vh); box-shadow: -.5rem -.5rem 1rem red; }
100% { display: none; opacity: 0; transform: translate(-50%, 10vh); box-shadow: none;}
`
let AniDiv = styled.div`animation: 3s ${showErrorAni} 1;`;

const ErrorBox = () => {
  const con = useContext(MainContext);

  useEffect(() => {
    if(!con.isError) return;
    document.querySelector('.error-box').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.error-box').style.display = 'none';
    }, 2800);
  }, [con.isError])

  return (
    <AniDiv className='error-box'>
    <div className='error-box-inner'>
      <h2 className="error-msg">{con.errorMsg}</h2>
    </div>
    </AniDiv>
  )
}

export default ErrorBox