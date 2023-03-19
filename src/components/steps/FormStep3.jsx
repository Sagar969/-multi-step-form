import React, { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../../contexts/DataProvider';

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const addons = {
  name: ['Online Service', 'Larger Storage', 'Customizable Profile'],
  features: ['Access to multiplayer games', 'Extra 1TB of cloud save', 'Custom theme on your profile'],
  priceMonthly: [1, 2, 2],
  priceYearly: [10, 20, 20],
}

const FormStep3 = () => {
  const con = useContext(MainContext);

  const [addonType, setAddonType] = useState(con.isYearly ? 'yr' : 'mo');
  const [addonCost, setAddonCost] = useState(con.isYearly ? addons.priceYearly : addons.priceMonthly);
  const [addonsList, setAddonsList] = useState([]);
  const rendered = useRef(false);
  const curr = con.curr;


  const updateAddons = () => {
    const names = [];
    const cost = [];
    addonsList.forEach(item => {
      names.push(addons.name[item]);
      cost.push(addonCost[item]);
    })
    con.setSelectedAddons(names);
    con.setSelectedAddonsCost(cost);
  }
  const toggleAddons = () => {
    const checked = document.querySelectorAll('.checked');
    let addonsArr = [];
    checked.forEach(chk => addonsArr.push(+chk.dataset.item));
    setAddonsList(addonsArr);
  }

  useEffect(() => {
    if(!rendered.current) {
      rendered.current = true;
      return;
    }
    updateAddons();
  },[addonsList])
  useEffect(() => {
    toggleAddons();
  }, [])

  return (
    <div className="step">
      <h2>Pick add-ons</h2>
      <p>Add-ons help enhance your gaming experience</p>
      <fieldset style={style}>
        {(() => {
          let items = [];
          for(let i = 0; i < 3; i++) {
            items.push(<Addon key={i} name={addons.name[i]} features={addons.features[i]} price={addonCost[i]} type={addonType} item={i} toggleAddons={toggleAddons} curr={curr} />)
          }
          return items;
        })()}
      </fieldset>
    </div>
  );
};

export default FormStep3;

const Addon = ({ name, features, price, type, item, toggleAddons, curr}) => {
  const handleChange = (e) => {
    if(e.target.checked) {
      e.target.classList.add('checked');
      e.target.closest('.addon').classList.add('selected-plan');
    }
    else {
      e.target.classList.remove('checked');
      e.target.closest('.addon').classList.remove('selected-plan');
    }
    toggleAddons();
  }

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
          <h3 className="addon-pricing">{curr}{price}/{type}</h3>
        </div>
      </div>
    </label>
  );
};
