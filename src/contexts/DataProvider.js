import arcadeIcon from '../assets/images/icon-arcade.svg';
import advancedIcon from '../assets/images/icon-advanced.svg';
import proIcon from '../assets/images/icon-pro.svg';
import { MainContext } from './MainContextProvider';
import { useContext, createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = (props) => {
  const con = useContext(MainContext);
  const rate = con.currRate;

  const [plan, setPlan] = useState(0);
  const [planName, setPlanName] = useState('Arcade');
  const [planCost, setPlanCost] = useState();
  const [addonsName, setAddonsName] = useState([]);
  const [addonsCost, setAddonsCost] = useState([]);

  let prevAddonsName = [];
  let prevAddonsCost = [];

  const prevValue = (ent) => {
    if(ent === addonsName) {
      if(addonsName !== []) {
        prevAddonsName = addonsName;
        return addonsName;
      }
      return prevAddonsName;
    }
    if(ent === addonsCost) {
      if(addonsCost !== []) {
        prevAddonsCost = addonsCost;
        return addonsCost;
      }
      return prevAddonsCost;
    }
  }

  const changeRates = (arr) => {
    if(rate === 1) return arr;
    return arr.map(n => (n * rate).toFixed(2));
  }

  const plans = {
    name: ['Arcade', 'Advanced', 'Pro'],
    priceMonthly: changeRates([200, 400, 700]),
    priceYearly: changeRates([2000, 4000, 7000]),
    icon: [arcadeIcon, advancedIcon, proIcon],
    freePeriod: '2 months',
  };
  const addons = {
    name: ['Online Service', 'Larger Storage', 'Customizable Profile'],
    features: [
      'Access to multiplayer games',
      'Extra 1TB of cloud save',
      'Custom theme on your profile',
    ],
    priceMonthly: changeRates([80, 120, 120]),
    priceYearly: changeRates([800, 1200, 1200]),
  };
  const selected = {
    planNum: plan,
    planName: planName,
    planCost: planCost,
    addonsName: prevValue(addonsName),
    addonsCost: prevValue(addonsCost)
  }
 
  const states = { plan, setPlan, planName, setPlanName, planCost, setPlanCost, addonsName, setAddonsName, addonsCost, setAddonsCost }

  const value = {
    plans,
    addons,
    selected,
    states
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
