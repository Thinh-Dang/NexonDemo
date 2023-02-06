import { IMatchingPage } from '@/@type/page';
import { IMatchingFriend } from '@/@type/services';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import { deleteUserLikeStacks } from '@/redux/slice/userLikeStackSlice';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import HeartContainer from './components/heart-container';
import users from '@/assets/data/users.data.json';

const MatchPage: FC<IMatchingPage> = ({
  matching,
  matchingRef,
  openMatchPagePopUp,
  closeMatchPagePopUp,
  friendId,
}) => {
  const dispatch = useAppDispatch();
  const [greetMessage, setGreetMessage] = useState('');
  const [matchedFriends, setMatchedFriends] = useState<IMatchingFriend[]>([]);
  const handleOnChange = (e: any) => {
    setGreetMessage(e.target.value);
  };
  const handleSkip = () => {
    dispatch(deleteUserLikeStacks({ ids: [matchedFriends[0]?.id] }));
    if (matchedFriends.length < 2) {
      return;
    }
    const arr = matchedFriends.filter((el) => el.id !== matchedFriends[0].id);
    setMatchedFriends(arr);
  };

  useEffect(() => {
    if (matching?.length) {
      setMatchedFriends(matching);
      openMatchPagePopUp();
    }
  }, [matching]);

  return (
    <>
      <div className="matchingFrame" ref={matchingRef}>
        <div className="matchingFrame-closeBtn" onClick={closeMatchPagePopUp}>
          <Image
            src="/assets/images/CloseBtn.svg"
            alt="Close icon"
            width="15px"
            height="15px"
          />
        </div>
        <HeartContainer
          matchedFriend={
            users && users.filter((friend) => friend.id === friendId)
          }
        />
        <div className="matchingFrame-content">
          <h2 className="matchingFrame-content-title">IT&apos;S A MATCH</h2>
          <p className="matchingFrame-content-message">
            Đừng để người ấy phải đợi, <br />
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
    </>
  );
};

export default MatchPage;
