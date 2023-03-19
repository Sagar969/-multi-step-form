import React, { useContext, useEffect } from 'react';
import { MainContext } from '../contexts/DataProvider';

const BtnsChangeSteps = () => {
  const con = useContext(MainContext);
  const curr = con.curr;

  useEffect(() => {
    const prevBtn = document.querySelector('.btn-left');
    const nextBtn = document.querySelectorAll('.btn-right')[0];
    const payBtn = document.querySelector('#rzp-pay-btn');
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    payBtn.style.display = 'none';
    if (con.curStep === 1) prevBtn.style.display = 'none';
    if (con.curStep === 4) {
      nextBtn.style.display = 'none';
      payBtn.style.display = 'block';
    }
    if (con.curStep === 5) {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
    }
  }, [con.curStep]);

  const prevStep = () => {
    con.setCurStep((cur) => cur - 1);
  };

  const nextStep = () => {
    if (con.curStep === 1) {
      if (con.checkInputs()) con.setCurStep((cur) => cur + 1);
    } else con.setCurStep((cur) => cur + 1);
  };

  return (
    <div className="btns-change-steps">
      <button className="btn-left btn-steps" onClick={prevStep}>
        Go Back
      </button>
      <button type="submit" className="btn-right btn-steps" onClick={nextStep}>
        Next Step
      </button>
      <button type="submit" className="btn-right btn-steps" id="rzp-pay-btn" onClick={con.handlePayment}>
        Pay {curr}
        {con.payAmt}
      </button>
    </div>
  );
};

export default BtnsChangeSteps;

// const rzPay = (con, Razorpay) => {

//   const options = {
//     key: 'rzp_test_UO0Rw0dD07KztN',
//     amount: con.payAmount,
//     currency: 'INR',
//     name: 'Acme Corp',
//     description: 'Test Transaction',
//     image: 'https://example.com/your_logo',
//     order_id: 'order_LS8oGgBKT8idnV',
//     handler: (res) => {
//       console.log(res);
//     },
//     prefill: {
//       name: con.userName,
//       email: con.userEmail,
//       contact: con.userPhone,
//     },
//     notes: {
//       address: 'Razorpay Corporate Office',
//     },
//     theme: {
//       color: '#3399cc',
//     },
//   };

//   const rzpay = new Razorpay(options);
//   rzpay.open();
// };

// const rzPay = (totalCost, name, email, phone) => {
//   var options = {
//     "key": "rzp_test_UO0Rw0dD07KztN", // Enter the Key ID generated from the Dashboard
//     "amount": totalCost, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//     "currency": "INR",
//     "name": "Subscription Plan", //your business name
//     "description": "Test Transaction",
//     "image": "https://example.com/your_logo",
//     "order_id": "order_LS8oGgBKT8idnV", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//     "handler": function (response){
//         // alert(response.razorpay_payment_id);
//         // alert(response.razorpay_order_id);
//         // alert(response.razorpay_signature)
//     },
//     "prefill": {
//         "name": name, //your customer's name
//         "email": email,
//         "contact": phone
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#3399cc"
//     }
//   };
//   var rzp1 = new Razorpay(options);
//   rzp1.on('payment.failed', function (response){
//         // alert(response.error.code);
//         // alert(response.error.description);
//         // alert(response.error.source);
//         // alert(response.error.step);
//         // alert(response.error.reason);
//         // alert(response.error.metadata.order_id);
//         // alert(response.error.metadata.payment_id);
//         console.log('failed')
//         alert(`Payment failed !!! ${response.error.description} !!! Try again`);
//   });
//   btnPay.onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
//   }
// }
