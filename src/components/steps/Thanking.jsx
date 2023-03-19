import React, { useContext } from 'react';
import { MainContext } from '../../contexts/DataProvider';

import icon from '../../assets/images/icon-thank-you.svg'

const Thanking = () => {
  const con = useContext(MainContext);

  return (
    <div className="step last-step">
      <img src={icon} alt="" />
      <h2>Thank you! {con.userName.split(' ')[0]} :)</h2>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremepsum.com.
      </p>
    </div>
  );
};

export default Thanking;
