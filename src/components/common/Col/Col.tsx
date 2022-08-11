import { FC } from 'react';

export const Col: FC<ICol> = ({ column, content, style }) => (
  <div
    className={`col-lg-${column} col-md-${column} col-sm-${column}`}
    style={style}
  >
    {content}
  </div>
);
