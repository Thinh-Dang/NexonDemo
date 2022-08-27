import { Spin } from 'antd';
import styleScss from './Spinning.module.scss';

const Spinning = () => {
  return <Spin className={styleScss.spinning} tip="Loading..."></Spin>;
};

export default Spinning;
