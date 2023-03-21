import React, { createContext, useState, useEffect } from 'react';

const MainContext = createContext();

const MainContextProvider = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [curStep, setCurStep] = useState(1);
  const [isYearly, setIsYearly] = useState(true);
  const [payAmt, setPayAmt] = useState(0);
  const [curr, setCurr] = useState('₹');
  const [currCode, setCurrCode] = useState('INR');
  const [currRate, setCurrRate] = useState(1);
  const [currData, setCurrData] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('err');
  const [popupClr, setPopupClr] = useState('red');
  const [isClicked, setIsClicked] = useState(false);

  const nextStep = () => {
    setCurStep((prev) => prev + 1);
  };

  const showPopup = (msg) => {
    setErrorMsg(msg);
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 2800);
  };

  const checkInputs = () => {
    let errorMsg;
    const nameReg = /^[a-zA-Z]+[a-zA-Z ]+$/;
    const isName = nameReg.test(userName);
    const emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z0-9]+$/;
    const isEmail = emailReg.test(userEmail);
    const phoneReg = /^[\+1-9]+[ 0-9]{9,}$/;
    const isPhone = phoneReg.test(userPhone);
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
      key: 'rzp_test_UO0Rw0dD07KztN',
      amount: payAmt * 100,
      currency: currCode,
      name: 'Loremepsum Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      handler: (res) => {
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
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzpay = window.Razorpay(options);
    rzpay.on('payment.failed', (response) => {
      showPopup('something went wrong');
    });
    rzpay.open();
  };

  const fetchJson = async (url) => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      showPopup("Couldn't fetch api request");
      setTimeout(() => {
        showPopup('Please refresh the page');
      }, 2800);
    }
  };

  const fetchCurr = async () => {
    const data = await fetchJson(
      'https://api.ipdata.co?api-key=4ead58129a0ec5de8bde7ef876c90aed984131d567e236d7ebb652be&fields=currency'
    );
    setCurrCode(data.currency.code);
    setCurr(data.currency.native);
  };
  const fetchCurrRate = async () => {
    const data = await fetchJson(
      `https://v6.exchangerate-api.com/v6/20c878c70c0997016de1fd50/latest/${currCode}`
    );
    setCurrData(data);
    return await data;
  };

  useEffect(() => {
    fetchCurrRate()
    fetchCurr();
  }, []);
  useEffect(() => {
    if (currCode != 'INR') {
      setCurrRate(currData.conversion_rates[currCode]);
    }
  }, [currCode]);

  const value = {
    curStep,
    setCurStep,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPhone,
    setUserPhone,
    isYearly,
    setIsYearly,
    payAmt,
    setPayAmt,
    curr,
    isError,
    errorMsg,
    checkInputs,
    handlePayment,
    popupClr,
    currRate,
    isClicked, setIsClicked
  };

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
