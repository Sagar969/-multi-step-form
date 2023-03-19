import React, { useContext } from 'react';
import { MainContext } from '../../contexts/DataProvider';

const FormStep1 = () => {
  const con = useContext(MainContext);

  return (
    <div className="step">
      <h2>Personal info</h2>
      <p>Please provide your name, email address, and phone number.</p>
      <fieldset className="input-fields">
        <label>
          <p className="input-info">Name</p>
          <input
            type="text"
            name="username"
            className="user-info"
            placeholder="e.g. Stephen King"
            value={con.userName}
            onChange={(e) => con.setUserName(e.target.value)}
          />
        </label>
        <label>
          <p className="input-info">Email Address</p>
          <input
            type="email"
            name="email"
            className="user-info"
            placeholder="e.g. stephenking@lorem.com"
            value={con.userEmail}
            onChange={(e) => con.setUserEmail(e.target.value)}
          />
        </label>
        <label>
          <p className="input-info">Phone Number</p>
          <input
            type="number"
            name="ph-number"
            className="user-info"
            placeholder="e.g. +13 564345234"
            value={con.userPhone}
            onChange={(e) => con.setUserPhone(e.target.value)}
          />
        </label>
      </fieldset>
    </div>
  );
};

export default FormStep1;
