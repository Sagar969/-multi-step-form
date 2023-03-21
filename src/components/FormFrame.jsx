import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import FormStep1 from './steps/FormStep1';
import FormStep2 from './steps/FormStep2';
import FormStep3 from './steps/FormStep3';
import FormStep4 from './steps/FormStep4';
import Thanking from './steps/Thanking';

import { DataProvider } from '../contexts/DataProvider';
import { MainContext } from '../contexts/MainContextProvider';

let FormAni = styled.div``;
const zoomAni = `
0% { transform: scale(1); }
50% { transform: scale(0); }
100% { transform: scale(1); }
`

const FormFrame = () => {
  const con = useContext(MainContext);

  useEffect(() => {
    if (con.isClicked) {
      FormAni = styled.div``;
      FormAni = styled.div`
        animation: .5s ${keyframes`${zoomAni}`} 1 linear;
      `;
      con.setIsClicked(false);
    }
  }, [con.isClicked]);

  return (
    <DataProvider>
      <FormAni className="form-frame">
        <div>
          {(() => {
            switch (con.curStep) {
              case 1:
                return <FormStep1 />;
              case 2:
                return <FormStep2 />;
              case 3:
                return <FormStep3 />;
              case 4:
                return <FormStep4 />;
              case 5:
                return <Thanking />;
              default:
                con.showPopup('Refresh the page');
            }
          })()}
        </div>
      </FormAni>
    </DataProvider>
  );
};

export default FormFrame;
