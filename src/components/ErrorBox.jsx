import React, { useContext, useEffect } from 'react'
import { MainContext } from '../contexts/DataProvider'
import styled, { keyframes } from 'styled-components'

let AniDiv = styled.div``;

const ErrorBox = () => {
  const con = useContext(MainContext);

  popupAni(con.popupClr);
  useEffect(() => {
    const errBoxMsg = document.querySelector('.error-msg');
    errBoxMsg.style.color = con.popupClr;
  }, [con.popupClr])
  

  useEffect(() => {
    const errBox = document.querySelector('.error-box');
    if(!con.isError) return;
    errBox.style.display = 'block';
    setTimeout(() => {
      errBox.style.display = 'none';
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

const popupAni = (shadowClr) => {
  const showErrorAni = keyframes`
  0% { display: block; opacity: 0; transform: translate(-50%, 10vh); boxShadow: none;}
  20% { opacity: 1; transform: translate(-50%, -20vh); box-shadow: none;}
  60% { opacity: 1; transform: translate(-50%, -20vh); box-shadow: .5rem .5rem 1rem ${shadowClr}; }
  90% { opacity: 1; transform: translate(-50%, -20vh); box-shadow: -.5rem -.5rem 1rem ${shadowClr}; }
  100% { display: none; opacity: 0; transform: translate(-50%, 10vh); box-shadow: none;}
  `
  AniDiv = styled.div`animation: 3s ${showErrorAni} 1;`;
}