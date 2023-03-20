import arcadeIcon from '../assets/images/icon-arcade.svg';
import advancedIcon from '../assets/images/icon-advanced.svg';
import proIcon from '../assets/images/icon-pro.svg';

const data = {
  plans: {
    name: ['Arcade', 'Advanced', 'Pro'],
    priceMonthly: [200, 400, 700],
    priceYearly: [2000, 4000, 7000],
    icon: [arcadeIcon, advancedIcon, proIcon],
    freePeriod: '2 months',
  },
  addons: {
    name: ['Online Service', 'Larger Storage', 'Customizable Profile'],
    features: [
      'Access to multiplayer games',
      'Extra 1TB of cloud save',
      'Custom theme on your profile',
    ],
    priceMonthly: [80, 120, 120],
    priceYearly: [800, 1200, 1200],
  },
};

export default data;
