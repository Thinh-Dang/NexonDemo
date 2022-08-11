import { CSSProperties } from 'react';
import styleCss from './SignUp.module.scss';

import Link from 'next/link';
import { Label, Col, Input, Button, TitleText } from '../../components';

export const SignUp = ({ formik }: IRegisterContainer) => {
  const cssTitleText: CSSProperties = {
    margin: '0',
  };
  const cssLabel: CSSProperties = {
    color: '#02203A',
    fontSize: '1.3rem',
    fontWeight: '600',
  };
  const cssInputRadio: CSSProperties = {
    width: '1.3rem',
    height: '1.3rcem',
    color: '#0091EB',
    marginRight: '1rem',
  };
  const cssButton: CSSProperties = {
    width: '100%',
  };

  return (
    <section className={styleCss.signup}>
      <form
        className={styleCss.signup__container}
        onSubmit={formik.handleSubmit}
      >
        <article className={styleCss.signup__item}>
          <TitleText
            text="Sign"
            textColor=" Up"
            color="orange"
            style={cssTitleText}
          />
        </article>
        <article className={styleCss.signup__item}>
          <Label htmlFor="name" content="Name" style={cssLabel} />
          <Input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            placeholder="Type your name here"
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger mt-2">
              <b>{formik.errors.name}</b>
            </div>
          )}
        </article>
        <article className={styleCss.signup__item}>
          <Label htmlFor="email" content="Email" style={cssLabel} />
          <Input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            placeholder="Type your email here"
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger mt-2">
              <b>{formik.errors.email}</b>
            </div>
          )}
        </article>
        <article className={styleCss.signup__item}>
          <Label htmlFor="birthday" content="Birthday" style={cssLabel} />
          <Input
            type="text"
            id="birthday"
            name="birthday"
            value={formik.values.birthday}
            placeholder="Type your birthday here"
            onChange={formik.handleChange}
          />
          {formik.errors.birthday && formik.touched.birthday && (
            <div className="alert alert-danger mt-2">
              <b>{formik.errors.birthday}</b>
            </div>
          )}
        </article>
        <article className={styleCss.signup__item}>
          <Label
            htmlFor="gender"
            content="Choose your gender"
            style={cssLabel}
          />
          <div className="row">
            <Col
              column={6}
              content={
                <>
                  <Input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="Male"
                    required
                    style={cssInputRadio}
                    onChange={formik.handleChange}
                  />
                  <Label htmlFor="gender" content="Male" style={cssLabel} />
                </>
              }
            />
            <Col
              column={6}
              content={
                <>
                  <Input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="Female"
                    required
                    style={cssInputRadio}
                    onChange={formik.handleChange}
                  />
                  <Label htmlFor="gender" content="Female" style={cssLabel} />
                </>
              }
            />
            <Col
              column={12}
              content={
                <>
                  <Input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="Other"
                    required
                    style={cssInputRadio}
                    onChange={formik.handleChange}
                  />
                  <Label htmlFor="gender" content="Other" style={cssLabel} />
                </>
              }
            />
          </div>
        </article>
        <article className={styleCss.signup__item}>
          <Button
            type="submit"
            id="form-submit"
            name="form-submit"
            content="Sign Up"
            style={cssButton}
          />
        </article>

        <article className={styleCss.signup__item}>
          <div className={styleCss.signup__footer}>
            <span className={styleCss.signup__text}>
              Already have an account?{' '}
            </span>
            <Link href="/auth/login" className={styleCss.signup__link}>
              <a> Login</a>
            </Link>
          </div>
        </article>
      </form>
    </section>
  );
};
