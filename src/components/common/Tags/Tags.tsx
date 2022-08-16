import { FC } from 'react';
import Image from 'next/image';
import styles from './Tags.module.scss';
const Tags: FC<ITags> = ({
  color,
  icon,
  title,
  bg_color,
  name,
  width,
  height,
}) => {
  return (
    <div className={styles.tags}>
      <Image src={icon} alt={name} width={width} height={height} />
      <p>{title}</p>
    </div>
  );
};

export default Tags;
