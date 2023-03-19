import React, { useContext } from 'react'
import FormStep1 from './steps/FormStep1'
import FormStep2 from './steps/FormStep2'
import FormStep3 from './steps/FormStep3'
import FormStep4 from './steps/FormStep4'
import Thanking from './steps/Thanking'

import { MainContext } from '../contexts/DataProvider'

const FormFrame = () => {
  const con = useContext(MainContext);
  return (
    <div className='form-frame'>
      {(() => {
        switch(con.curStep) {
          case 1: return <FormStep1 />
          case 2: return <FormStep2 />
          case 3: return <FormStep3 />
          case 4: return <FormStep4 />
          case 5: return <Thanking />
        }
      })()}
    </div>
  )
}

export default FormFrame