import { ICard } from '@/@type/components';
import React from 'react';
import styleCss from './Card.module.scss';
import CloseBtn from './CloseBtn';

export const Card = React.forwardRef<HTMLDivElement, ICard>((props, ref) => (
  <div
    className={styleCss.card}
    style={{ height: props.height }}
    ref={ref}
    hidden
  >
    {props.children}
    {props?.hasCloseBtn && props?.onCloseCard && (
      <CloseBtn onCloseCard={props.onCloseCard} />
    )}
  </div>
));

Card.displayName = 'Card';
