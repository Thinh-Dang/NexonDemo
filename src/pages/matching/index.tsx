import { url } from 'inspector';
import React, { useEffect, useState } from 'react';
import HeartContainer from './components/heart-container';
export interface IMatchedFriends {
  id: string;
  imgUrl: string;
}
const MatchPage = () => {
  const [greetMessage, setGreetMessage] = useState('');
  const [matchedFriends, setMatchedFriends] = useState([
    { id: '1', imgUrl: './assets/images/avatar/avatar1.jpg' },
    { id: '2', imgUrl: './assets/images/avatar/avatar2.jpg' },
    { id: '3', imgUrl: './assets/images/avatar/avatar3.jpg' },
    { id: '4', imgUrl: './assets/images/avatar/avatar4.jpg' },
    { id: '5', imgUrl: './assets/images/avatar/avatar5.jpg' },
    { id: '6', imgUrl: './assets/images/avatar/avatar6.jpg' },
    { id: '7', imgUrl: './assets/images/avatar/avatar7.jpg' },
    { id: '8', imgUrl: './assets/images/avatar/avatar8.jpg' },
    { id: '9', imgUrl: './assets/images/avatar/avatar9.jpg' },
    { id: '10', imgUrl: './assets/images/avatar/avatar10.jpg' },
  ]);
  const handleOnChange = (e: any) => {
    setGreetMessage(e.target.value);
    console.log(greetMessage);
  };
  const handleSkip = () => {
    const arr = [...matchedFriends];

    if (arr.length < 2) {
      window.location.href = './chat';
      return;
    }

    arr.shift();
    setMatchedFriends(arr);
    console.log(matchedFriends);
  };
  return (
    <div className="matchingFrame">
      <a href="./chat">
        <img
          className="matchingFrame-btnClose"
          src="./assets/images/CloseBtn.svg"
          alt=""
        />
      </a>
      <HeartContainer matchedFriend={matchedFriends && matchedFriends[0]} />
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
        <button onClick={handleSkip} className="matchingFrame-skip">
          Skip
        </button>
      </div>
    </div>
  );
};

export default MatchPage;
