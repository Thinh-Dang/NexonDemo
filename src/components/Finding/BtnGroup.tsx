import React, { useState } from 'react';
import Image from 'next/image';
import Spinning from '../Spinning/Spinning';

interface IProps {
  userId: string;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onCloseModal: () => void;
}

const BtnGroup = ({ userId, onLike, onDislike, onCloseModal }: IProps) => {
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isDislikeLoading, setIsDislikeLoading] = useState(false);
  return (
    <div className="btnGroup">
      <div
        className="btnGroup-btn"
        onClick={() => {
          setIsDislikeLoading(true);
          setTimeout(() => {
            onDislike(userId);
            setIsDislikeLoading(false);
            onCloseModal();
          }, 2000);
        }}
      >
        {!isDislikeLoading ? (
          <Image
            src="/assets/images/Close.svg"
            alt="close"
            width={'23px'}
            height={'23px'}
          />
        ) : (
          <Spinning noTip />
        )}
      </div>
      <div
        className="btnGroup-btn"
        onClick={() => {
          setIsLikeLoading(true);
          setTimeout(() => {
            onLike(userId);
            setIsLikeLoading(false);
            onCloseModal();
          }, 2000);
        }}
      >
        {!isLikeLoading ? (
          <Image
            src="/assets/images/Union.svg"
            alt="heart"
            width={'23px'}
            height={'23px'}
          />
        ) : (
          <Spinning noTip />
        )}
      </div>
    </div>
  );
};

export default BtnGroup;
