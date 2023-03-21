import React, { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../../contexts/MainContextProvider';
import { DataContext } from '../../contexts/DataProvider';

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const FormStep3 = () => {
  const con = useContext(MainContext);
  const data = useContext(DataContext);
  const addons = data.addons;
  const states = data.states;
  const slc = data.selected;

  const addonType = con.isYearly ? 'yr' : 'mo';
  const addonCost = con.isYearly ? addons.priceYearly : addons.priceMonthly;
  const [addonsList, setAddonsList] = useState([]);
  const rendered = useRef(false);
  const curr = con.curr;
  let names = con.selectedAddons;
  let cost = con.selectedAddonsCost;

  const updateAddons = () => {
    if (addonsList.length > 0) {
      names = [];
      cost = [];
      addonsList.forEach((item) => {
        names.push(addons.name[item]);
        cost.push(addonCost[item]);
      });
      states.setAddonsName(names);
      states.setAddonsCost(cost);
    }
  };
  const toggleAddons = () => {
    const checked = document.querySelectorAll('.checked');
    let addonsArr = [];
    checked.forEach((chk) => addonsArr.push(+chk.dataset.item));
    setAddonsList(addonsArr);
  };

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      return;
    }
    updateAddons();
  }, [addonsList]);
  useEffect(() => {
    toggleAddons();
  }, []);
  useEffect(() => {
    if (slc.addonsName.length > 0) {
      slc.addonsName.forEach((name) => {
        document.querySelectorAll('.addon-name').forEach((ele) => {
          if (ele.textContent === name) {
            ele.closest('div').previousElementSibling.checked = true;
            ele.closest('div').previousElementSibling.classList.add('checked');
          }
        });
      });
    }
  }, []);

  return (
    <div className="step">
      <h2>Pick add-ons</h2>
      <p>Add-ons help enhance your gaming experience</p>
      <fieldset style={style}>
        {(() => {
          let items = [];
          for (let i = 0; i < addons.name.length; i++) {
            items.push(
              <Addon
                key={i}
                name={addons.name[i]}
                features={addons.features[i]}
                price={addonCost[i]}
                type={addonType}
                item={i}
                toggleAddons={toggleAddons}
                curr={curr}
              />
            );
          }
          return items;
        })()}
      </fieldset>
    </div>
  );
};

export default FormStep3;

const Addon = ({ name, features, price, type, item, toggleAddons, curr }) => {
  const handleChange = (e) => {
    if (e.target.checked) {
      e.target.classList.add('checked');
      e.target.closest('.addon').classList.add('selected-plan');
    } else {
      e.target.classList.remove('checked');
      e.target.closest('.addon').classList.remove('selected-plan');
    }
    toggleAddons();
  };

  return (
    <label>
      <div className="addon">
        <input
          type="checkbox"
          className="addon-chkbox"
          onChange={(e) => handleChange(e, item)}
          data-item={item}
        />
        <div className="addon-info">
          <h3 className="addon-name">{name}</h3>
          <p className="addon-features">{features}</p>
        </div>
        <div className="addon-pricing-box">
          <h3 className="addon-pricing">
            {curr}
            {price}/{type}
          </h3>
        </div>
      </div>
    </label>
  );
};
