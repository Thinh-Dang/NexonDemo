import { IReasonPopUp } from '@/@type/components';
import { Radio } from 'antd';
import { FC } from 'react';
import { ItemReason } from '../ItemReason/ItemReason';
import styleCss from './ReasonPopUp.module.scss';

export const ReasonPopUp: FC<IReasonPopUp> = ({ purposes, userPurposeId }) => {
  const onchange = () => {
    console.log('change');
  };

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
        <ItemReason
          icon="/assets/icons8-cup 1.svg"
          title={'Muốn tâm sự'}
          subTitle={'Tôi muốn hẹn hò, tìm mấy em ghệ.'}
          value={'9ed0b18d-fe01-4f4b-8d46-7d1e1c6c0a55'}
          onChange={onchange}
          checked={true}
        />
        <ItemReason
          icon="/assets/icons8-chat-room 1.svg"
          title={'Muốn hẹn hò'}
          subTitle={'Tôi muốn hẹn hò, tìm mấy em ghệ.'}
          value={'2c2dcfc9-95e7-42c5-b094-8e41c6ccb37e'}
          onChange={onchange}
        />
        <ItemReason
          icon="/assets/icons8-kiss.svg"
          title={'Đang tìm một mối quan hệ mới'}
          subTitle={'Tôi muốn hẹn hò, tìm mấy em ghệ.'}
          value={'0a7a3d9a-cf5c-46a5-b309-60d1dfac6237'}
          onChange={onchange}
        />
      </div>
    </div>
  );
};
