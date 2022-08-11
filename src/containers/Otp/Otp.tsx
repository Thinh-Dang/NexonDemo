import { CSSProperties } from 'react';
import styleCss from './Otp.module.scss';

import { Label, Input, Button, TitleText } from '../../components';

export const Otp = ({ formik }: ITokenContainer) => {
  const cssTitleText: CSSProperties = {
    margin: '0',
  };
  const cssLabel: CSSProperties = {
    color: '#02203A',
    fontSize: '1.3rem',
    fontWeight: '600',
  };
  const cssButton: CSSProperties = {
    width: '100%',
  };

  return (
    <section className={styleCss.otp}>
      <form className={styleCss.otp__container} onSubmit={formik.handleSubmit}>
        <article className={styleCss.otp__item}>
          <TitleText
            text="Check"
            textColor=" OTP"
            color="orange"
            style={cssTitleText}
          />
        </article>
        <article className={styleCss.otp__item}>
          <Label htmlFor="verificationCode" content="OTP" style={cssLabel} />
          <Input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={formik.values.verificationCode}
            placeholder="Please enter OTP"
            onChange={formik.handleChange}
          />
          {formik.errors.verificationCode && formik.touched.verificationCode && (
            <div className="alert alert-danger mt-2">
              <b>{formik.errors.verificationCode}</b>
            </div>
          )}
        </article>
        <article className={styleCss.otp__item}>
          <Button
            type="submit"
            id="form-submit"
            name="form-submit"
            content="Check"
            style={cssButton}
          />
        </article>
      </form>
    </section>
  );
};
