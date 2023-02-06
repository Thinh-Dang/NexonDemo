import { Spin } from 'antd';
import styleScss from './Spinning.module.scss';

const Spinning = (props: any) => {
  return (
    <Spin
      className={styleScss.spinning}
      tip={!props?.noTip && 'Loading...'}
    ></Spin>
  );
};

export default Spinning;
