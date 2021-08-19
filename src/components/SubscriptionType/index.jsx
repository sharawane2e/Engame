import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

const SubscriptionType = ({ data, toolId }) => {
  const [state] = useState(data);
  const [subscription, setSubscription] = useState("");
  const [type, setType] = useState("");
  const [base, setBase] = useState(0);
  const [price, setPrice] = useState(base);
  const handleChange = (e) => {
    setSubscription(e.target.value);
  };

  const handleCalculatePrice = (e) => {
    let value = e.target.value * base;
    setPrice(value);
  };
  // console.log(subscription);
  useEffect(() => {
    if (subscription == 1) {
      setBase(10);
      setType("Days");
    } else if (subscription == 2) {
      setType("Hits");
      setBase(5);
    } else {
      setType("");
      setBase(0);
    }
  }, [
    handleChange,
    subscription,
    setSubscription,
    type,
    setType,
    price,
    base,
    setBase,
  ]);
  return (
    <>
      <div className="subscription-type">
        <select onChange={handleChange}>
          <option value="">---Select---</option>
          <option value="1">Number of days</option>
          <option value="2">Number of hits</option>
        </select>

        <div className="subscription-type__iner">
          <div className="subscription-type__days">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="subscription-type__inputbox"
              onChange={handleCalculatePrice}
            />
            <div className="subscription-type__text">{type}</div>
          </div>
          <div className="subscription-type__amount  subscription-type__amount-text ">
            ${price}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionType;
