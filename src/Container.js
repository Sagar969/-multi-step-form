import React from 'react';
import './styles/style.css';

import Sidebar from './components/Sidebar';
import FormFrame from './components/FormFrame';
import ErrorBox from './components/ErrorBox';
import BtnsChangeSteps from './components/BtnsChangeSteps';
import FooterCredits from './components/FooterCredits';

const Container = () => {
  return (
      <div className="container">
        <Sidebar />
        <section>
          <FormFrame />
          <ErrorBox />
          <BtnsChangeSteps />
        </section>
        <FooterCredits />
      </div>
  );
};

export default Container;
