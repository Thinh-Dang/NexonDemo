import { IReasonPopUp } from '@/@type/components';
import { Radio } from 'antd';
import { FC } from 'react';
import { ItemReason } from '../ItemReason/ItemReason';
import styleCss from './ReasonPopUp.module.scss';

export const ReasonPopUp: FC<IReasonPopUp> = ({
  purposes,
  userPurposeId,
  onChange,
}) => {
  return (
    <div>
      <div className={styleCss['reasonPopUp-head']}>
        <h4 className={styleCss['reasonPopUp-head-title']}>
          Cho mọi người biết lý do của bạn ở đây?
        </h4>
        <h4 className={styleCss['reasonPopUp-head-subTitle']}>
          Chúng tôi sẽ chia sẻ điều này trên hồ sơ của bạn. Bạn có thể thay đổi
          bất cứ lúc nào
        </h4>
      </div>
      <div className={styleCss['reasonPopUp-reasonItems']}>
        {purposes.map((item) => (
          <ItemReason
            key={item.id}
            icon={item.image}
            title={item.title}
            subTitle={item.description}
            value={item.id}
            onChange={onChange}
            checked={item.id === userPurposeId ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
