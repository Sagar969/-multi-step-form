import React, { useContext, useEffect } from 'react';
import { MainContext } from '../contexts/MainContextProvider';

const BtnsChangeSteps = () => {
  const con = useContext(MainContext);
  const curr = con.curr;

  useEffect(() => {
    const prevBtn = document.querySelector('.btn-left');
    const nextBtn = document.querySelectorAll('.btn-right')[0];
    const payBtn = document.querySelector('#rzp-pay-btn');
    const refBtn = document.querySelector('.btn-refresh');
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    payBtn.style.display = 'none';
    refBtn.style.display = 'none';
    if (con.curStep === 1) prevBtn.style.display = 'none';
    if (con.curStep === 4) {
      nextBtn.style.display = 'none';
      payBtn.style.display = 'block';
    }
    if (con.curStep === 5) {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
      refBtn.style.display = 'block';
    }
  }, [con.curStep]);


  const prevStep = () => {
    con.setIsClicked(true);
    setTimeout(() => {
      con.setCurStep((cur) => cur - 1);
    }, 250);
  };

  const nextStep = () => {
    if (con.curStep === 1) {
      if (con.checkInputs()) {
        con.setIsClicked(true);
        setTimeout(() => {
          con.setCurStep((cur) => cur + 1);
        }, 250);
      }
    } else {
      con.setIsClicked(true);
      setTimeout(() => {
        con.setCurStep((cur) => cur + 1);
      }, 250);
    }
  };


  return (
    <div className="btns-change-steps">
      <button className="btn-left btn-steps" onClick={prevStep}>
        Go Back
      </button>
      <button type="submit" className="btn-right btn-steps" onClick={nextStep}>
        Next Step
      </button>
      <button
        type="submit"
        className="btn-right btn-steps"
        id="rzp-pay-btn"
        onClick={con.handlePayment}
      >
        Pay {curr}
        {con.payAmt}
      </button>
      <button type="submit" className="btn-right btn-steps btn-refresh" onClick={() => window.location.reload(false)}>
        Refresh
      </button>
    </div>
  );
};

export default BtnsChangeSteps;
