import React, { useContext, useEffect } from 'react';
import { MainContext } from '../contexts/DataProvider';

const BtnsChangeSteps = () => {
  const con = useContext(MainContext);
  const curr = con.curr;

  useEffect(() => {
    const prevBtn = document.querySelector('.btn-left');
    const nextBtn = document.querySelectorAll('.btn-right')[0];
    const payBtn = document.querySelector('#rzp-pay-btn');
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    payBtn.style.display = 'none';
    if (con.curStep === 1) prevBtn.style.display = 'none';
    if (con.curStep === 4) {
      nextBtn.style.display = 'none';
      payBtn.style.display = 'block';
    }
    if (con.curStep === 5) {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
    }
  }, [con.curStep]);

  const prevStep = () => {
    con.setCurStep(cur => cur - 1);
  }
  const nextStep = () => {
    if(con.curStep === 1) {
      if(con.checkInputs()) con.setCurStep(cur => cur + 1)
    }
    else con.setCurStep(cur => cur + 1);
  }

  return (
    <div className="btns-change-steps">
      <button className="btn-left btn-steps" onClick={prevStep}>
        Go Back
      </button>
      <button type="submit" className="btn-right btn-steps" onClick={nextStep}>
        Next Step
      </button>
      <button type="submit" className="btn-right btn-steps" id="rzp-pay-btn" onClick={con.handlePayment}>
        Pay {curr}
        {con.payAmt}
      </button>
    </div>
  );
};

export default BtnsChangeSteps;