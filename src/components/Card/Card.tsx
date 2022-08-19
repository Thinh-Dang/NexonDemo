import { ICard } from '@/@type/components';
import React from 'react';
import styleCss from './Card.module.scss';

export const Card = React.forwardRef<HTMLDivElement, ICard>((props, ref) => (
  <div
    className={styleCss.card}
    style={{ height: props.height + 'px' }}
    ref={ref}
    hidden
  >
    {props.children}
  </div>
));

Card.displayName = 'Card';
