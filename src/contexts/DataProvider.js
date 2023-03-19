import React, { createContext, useState, useEffect } from "react";

const MainContext = createContext();

const DataProvider = (props) => {
    const [userName, setUserName] = useState('Sagar Mavai');
    const [userEmail, setUserEmail] = useState('sagarmavai2002@gmail.com');
    const [userPhone, setUserPhone] = useState('9667270622');
    const [curStep, setCurStep] = useState(1);
    const [plan, setPlan] = useState(0);
    const [planName, setPlanName] = useState('ok')
    const [isYearly, setIsYearly] = useState(true);
    const [finalPlanCost, setFinalPlanCost] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState(['ooooo', 'ppppp']);
    const [selectedAddonsCost, setSelectedAddonsCost] = useState([1, 2]);
    const [payAmt, setPayAmt] = useState(0);
    const [curr, setCurr] = useState('₹');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('err');

    const showError = (msg) => {
        setErrorMsg(msg);
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 2800);
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
          showError(errorMsg);
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
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        handler: (res) => {
          console.log(res);
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
      rzpay.open();
    };

    useEffect(() => {
      const createOrder = async () => {
        const res = await fetch('https://api.razorpay.com/v1/orders/amount=500,currency=INR');
        console.log(res);
        const data = res.json();
        console.log(data);
      }
      // createOrder();
    }, [payAmt, curr])

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
        showError, checkInputs,
        handlePayment
    }

    return (
        <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
    );
};

export { MainContext, DataProvider }