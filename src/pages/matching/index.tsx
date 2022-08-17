import { url } from 'inspector';
import React, { useState } from 'react';
import HeartContainer from './components/heart-container';

const MatchPage = () => {
  const [greetMessage, setGreetMessage] = useState('');
  const handleOnChange = (e: any) => {
    setGreetMessage(e.target.value);
    console.log(greetMessage);
  };
  return (
    <div className="matchingFrame">
      <a href="#">
        <img
          className="matchingFrame-btnClose"
          src="./assets/images/CloseBtn.svg"
          alt=""
        />
      </a>
      <HeartContainer />
      <div className="matchingFrame-content">
        <h2 className="matchingFrame-content-title">IT'S A MATCH</h2>
        <p className="matchingFrame-content-message">
          Đừng để cô ấy phải đợi, <br />
          gửi lời chào ngay!
        </p>
      </div>
      <div className="matchingFrame-handle">
        <form action="" className="matchingFrame-handle-form">
          <input
            className="matchingFrame-input"
            type="text"
            onChange={handleOnChange}
            value={greetMessage}
            placeholder="Gửi lời chào"
          />
          <button
            style={{ backgroundImage: `url('./assets/images/send.svg')` }}
            type="submit"
            className="matchingFrame-input-send"
          ></button>
        </form>
        <button className="matchingFrame-skip">Skip</button>
      </div>
    </div>
  );
};

export default MatchPage;
