import React, { useContext, useEffect } from 'react';
import { MainContext } from '../../contexts/MainContextProvider';
import { DataContext } from '../../contexts/DataProvider';

const FormStep4 = () => {
  const con = useContext(MainContext);
  const data = useContext(DataContext);
  const slc = data.selected;

  const curr = con.curr;
  const planType = con.isYearly ? 'Yearly' : 'Monthly';
  const planRepeat = con.isYearly ? 'year' : 'month';
  const pricePer = con.isYearly ? 'yr' : 'mo';
  const totalCost =
    slc.planCost +
    slc.addonsCost.reduce((total, n) => (total += Number(n)), 0);

  const changeStep = () => {
    con.setIsClicked(true)
    setTimeout(() => {
      con.setCurStep(2);
    }, 250);
  }

  useEffect(() => {
    con.setPayAmt(totalCost);
  });

  return (
    <div className="step">
      <h2>Finishing up</h2>
      <p>Double-check everything looks OK before confirming.</p>
      <fieldset>
        <div className="selected-services-box">
          <div className="final-plan-container">
            <div className="final-plan-options">
              <h3 className="final-plan-name">
                {slc.planName} ({planType})
              </h3>
              <a
                href="#"
                className="plan-change"
                onClick={changeStep}
              >
                Change
              </a>
            </div>
            <h3 className="final-plan-pricing">
              {curr}
              {slc.planCost}/{pricePer}
            </h3>
          </div>
          <div className="addons-container">
            {(() => {
              const items = [];
              slc.addonsName.forEach((addon, i) => {
                items.push(
                  <AddonsSelected
                    key={i}
                    name={addon}
                    price={slc.addonsCost[i]}
                    type={pricePer}
                    curr={curr}
                  />
                );
              });
              return items;
            })()}
          </div>
        </div>
        <div className="total-price-container">
          <p className="total-as-plan">Total per {planRepeat}</p>
          <h3 className="total-price">
            +{curr}
            {totalCost}/{pricePer}
          </h3>
        </div>
      </fieldset>
    </div>
  );
};

export default FormStep4;

const AddonsSelected = ({ name, price, type, curr }) => {
  return (
    <div className="final-addon-info">
      <p className="final-addon-name">{name}</p>
      <p className="final-addon-price">
        +{curr}
        {price}/{type}
      </p>
    </div>
  );
};