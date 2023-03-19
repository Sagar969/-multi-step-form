import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../contexts/DataProvider';

import arcadeIcon from '../../assets/images/icon-arcade.svg';
import advancedIcon from '../../assets/images/icon-advanced.svg';
import proIcon from '../../assets/images/icon-pro.svg';

const plans = {
  name: ['Arcade', 'Advanced', 'Pro'],
  priceMonthly: [9, 12, 15],
  priceYearly: [90, 120, 150],
  icon: [arcadeIcon, advancedIcon, proIcon],
  freePeriod: '2 months',
};

const FormStep2 = () => {
  const con = useContext(MainContext);
  const curr = con.curr;
  const [planType, setPlanType] = useState('yr');
  const [planCost, setPlanCost] = useState(plans.priceYearly);

  useEffect(() => {
    activePlanCost();
    const types = document.querySelectorAll('.plan-type');
    types[0].style.color = 'var(--cool-gray)';
    types[1].style.color = 'var(--cool-gray)';
    if (con.isYearly) {
      setPlanType('yr');
      setPlanCost(plans.priceYearly);
      types[1].style.color = 'var(--marine-blue)';
      document.querySelector('.plan-type-slider').checked = true;
    } else {
      setPlanType('mo');
      setPlanCost(plans.priceMonthly);
      types[0].style.color = 'var(--marine-blue)';
      document.querySelector('.plan-type-slider').checked = false;
    }
  }, [con.isYearly]);

  const switchPlanType = () => {
    con.setIsYearly((prev) => !prev);
  };
  const activePlanCost = () => {
    con.setFinalPlanCost(con.isYearly ? plans.priceYearly[con.plan] : plans.priceMonthly[con.plan]);
  }

  useEffect(() => {
    const plans = document.querySelectorAll('.plan');
    plans.forEach((plan) => plan.classList.remove('selected-plan'));
    plans[con.plan].classList.add('selected-plan');

    activePlanCost();
  }, [con.plan]);

  const activePlan = (item) => {
    con.setPlan(item)
    con.setPlanName(plans.name[item]);
  }
  useEffect(() => {
    activePlan(con.plan);
  }, [])

  return (
    <div className="step">
      <h2>Select your plan</h2>
      <p>You have the option of monthly or yearly billing.</p>
      <fieldset className="input-fields">
        <div className="plans-container">
          {(() => {
            const items = [];
            for (let i = 0; i < 3; i++) {
              items.push(
                <Plan
                  key={i}
                  name={plans.name[i]}
                  price={planCost[i]}
                  type={planType}
                  freePeriod={plans.freePeriod}
                  isYearly={con.isYearly}
                  icon={plans.icon[i]}
                  item={i}
                  activePlan={activePlan}
                  curr={curr}
                />
              );
            }
            return items;
          })()}
        </div>
        <SwitchPlanSlider switchPlanType={switchPlanType} />
      </fieldset>
    </div>
  );
};

export default FormStep2;

const Plan = ({ name, price, type, freePeriod, isYearly, icon, item, activePlan, curr }) => {
  return (
    <div className="plan" onClick={() => activePlan(item)}>
      <img src={icon} alt={`${name} Plan`} className="plan-icon" />
      <div className="plan-info">
        <h3 className="plan-name">{name}</h3>
        <p className="plan-pricing">
          {curr}{price}/{type}
        </p>
        {isYearly ? <h3 className="free-in-plan">{freePeriod} free</h3> : ''}
      </div>
    </div>
  );
};

const SwitchPlanSlider = ({ switchPlanType }) => {
  return (
    <div className="plan-type-container">
      <p className="plan-type plan-type-monthly">Monthly</p>
      <label className="switch">
        <input
          type="checkbox"
          className="plan-type-slider"
          onChange={switchPlanType}
        />
        <span className="slider"></span>
      </label>
      <p className="plan-type plan-type-yearly">Yearly</p>
    </div>
  );
};
