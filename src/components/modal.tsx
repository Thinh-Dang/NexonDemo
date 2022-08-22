// import React, { Children, useCallback, useRef } from 'react'
// import { Card } from './Card/Card';

// const Modal = ({props}:HTMLElement) => {
//     const cardRef = useRef<HTMLDivElement>(null);
//     const overlayRef = useRef<HTMLDivElement>(null);

//   const onOverlayClick = useCallback(() => {
//     if (cardRef.current && overlayRef.current) {
//       const card = cardRef.current;
//       const overlay = overlayRef.current;

//       card.classList.remove('popup');
//       overlay.classList.remove('overlay-show');

//       setTimeout(() => {
//         card.hidden = true;
//         overlay.hidden = true;
//       }, 1000);
//     }
//   }, []);

//   const openPopUp = useCallback(() => {
//     if (cardRef.current && overlayRef.current) {
//       const card = cardRef.current;
//       const overlay = overlayRef.current;

//       card.hidden = false;
//       overlay.hidden = false;

//       setTimeout(() => {
//         overlay.classList.add('overlay-show');
//         card.classList.add('popup');
//       }, 10);
//     }
//   }, []);
//   return (
//     <>
//     <Card
//         hasCloseBtn={true}
//         onCloseCard={onOverlayClick}
//         height={'93vh'}
//         ref={cardRef}
//     >
//           {props.children}
//       </Card>
//       <div
//       className='overlay'
//         hidden
//         onClick={onOverlayClick}
//         ref={overlayRef}
//       ></div>
//     </>
//   )
// }

// export default Modal
