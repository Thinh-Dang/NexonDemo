import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import iconFB from '../../../public/assets/fb.svg';
import iconGG from '../../../public/assets/gg.svg';
import iconApple from '../../../public/assets/apple-icon.svg';
import logoWelcome from '../../../public/assets/images/img-welcome.svg';
import styleScss from './Welcome.module.scss';

const Welcome = () => {
  const router = useRouter();
  return (
    <main className={styleScss.wrapper}>
      <Image src={logoWelcome} alt="Zodinet" />
      <Content
        classContent={styleScss.wrapper__class_content}
        contentTitle="Đăng Nhập"
        contentText="Vui lòng chọn hình thức đăng nhập để tiếp tục sử dụng"
      />
      <Button
        isHaveIcon={false}
        type="button"
        onClick={() => {
          router.push('/auth/login');
        }}
        btnClass={styleScss.wrapper__btn}
        content="Đăng nhập bằng số điện thoại"
      />
      <p className={styleScss.wrapper__content}>Hoặc đăng nhập với:</p>
      <div className={styleScss.wrapper__group}>
        <Button
          isHaveIcon={false}
          type="button"
          btnClass={styleScss.wrapper__icon}
          content={<Image src={iconFB} alt="Zodinet" />}
          onClick={() =>
            signIn('facebook', { redirect: false, callbackUrl: '/auth/login' })
          }
        />

        <Button
          type="button"
          isHaveIcon={false}
          btnClass={styleScss.wrapper__icon}
          content={<Image src={iconApple} alt="Zodinet" />}
        />

        <Button
          type="button"
          isHaveIcon={false}
          btnClass={styleScss.wrapper__icon}
          content={<Image src={iconGG} alt="Zodinet" />}
          onClick={() =>
            signIn('google', { redirect: false, callbackUrl: '/auth/login' })
          }
        />
      </div>
    </main>
  );
};

export default Welcome;
