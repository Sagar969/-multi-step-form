import React, { createContext, useState, useEffect } from "react";


const MainContext = createContext();

const DataProvider = (props) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [curStep, setCurStep] = useState(1);
    const [plan, setPlan] = useState(0);
    const [planName, setPlanName] = useState('Arcade')
    const [isYearly, setIsYearly] = useState(true);
    const [finalPlanCost, setFinalPlanCost] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [selectedAddonsCost, setSelectedAddonsCost] = useState([]);
    const [payAmt, setPayAmt] = useState(0);
    const [curr, setCurr] = useState('₹');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('err');
    const [popupClr, setPopupClr] = useState('red');

    useEffect(() => {
      setCurr('₹')
    })

    const nextStep = () => {
      setCurStep(prev => prev + 1);
    }

    const showPopup = (msg) => {
        setErrorMsg(msg);
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 3000);
    }

    const checkInputs = () => {
        let errorMsg;
        const nameReg = /^[a-zA-Z]+[a-zA-Z ]+$/;
        const isName = nameReg.test(userName);
        const emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z0-9]+$/;
        const isEmail = emailReg.test(userEmail);
        const phoneReg = /^[\+1-9]+[ 0-9]{9,}$/;
        const isPhone = phoneReg.test(userPhone);
        console.log(userName, userEmail, userPhone);
        if (!isName || !isEmail || !isPhone) {
          if (!isName) errorMsg = 'Invalid Name';
          if (!isEmail) errorMsg = 'Invalid Email Address';
          if (!isPhone) errorMsg = 'Invalid Phone Number';
          showPopup(errorMsg);
          return false;
        } else {
          return true;
        }
    };

    const handlePayment = () => {
  
      const options = {
        key: "rzp_test_UO0Rw0dD07KztN",
        amount: payAmt * 100,
        currency: "INR",
        name: "Loremepsum Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        handler: (res) => {
          console.log(res);
          setPopupClr('green');
          showPopup('Payment Successful');
          nextStep();
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzpay = window.Razorpay(options);
      rzpay.on('payment.failed', (response) => {
        console.log(response);
        showPopup('something went wrong');
      })
      rzpay.open();
    };

    const value = {
        curStep,
        setCurStep,
        userName, setUserName,
        userEmail, setUserEmail,
        userPhone, setUserPhone,
        plan, setPlan,
        planName, setPlanName,
        isYearly, setIsYearly,
        finalPlanCost, setFinalPlanCost,
        selectedAddons, setSelectedAddons,
        selectedAddonsCost, setSelectedAddonsCost,
        payAmt, setPayAmt,
        curr,
        isError, errorMsg,
        checkInputs,
        handlePayment, popupClr,
    }

    return (
        <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
    );
};

export { MainContext, DataProvider }