import React from 'react';
import Image from 'next/image';

interface IProps {
  onCloseCard: () => void;
}

const CloseBtn = (props: IProps) => {
  return (
    <div className="closeModal-btn">
      <img
        alt="close icon"
        src="/assets/images/closeModal.svg"
        onClick={props.onCloseCard}
      />
    </div>
  );
};

export default CloseBtn;
