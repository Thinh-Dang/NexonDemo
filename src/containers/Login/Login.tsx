import { CSSProperties } from 'react';
import styleCss from './Login.module.scss';

import Link from 'next/link';
import { Label, Input, Button, TitleText } from '../../components';

import { signIn, signOut } from 'next-auth/react';

export const Login = ({ formik, session }: ILoginContainer) => {
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
    <section className={styleCss.login}>
      <form
        className={styleCss.login__container}
        onSubmit={formik.handleSubmit}
      >
        <article className={styleCss.login__item}>
          <TitleText
            text="Login"
            textColor=" User"
            color="orange"
            style={cssTitleText}
          />
        </article>
        <article className={styleCss.login__item}>
          <Label htmlFor="phone" content="Phone" style={cssLabel} />
          <Input
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            placeholder="Please enter phone"
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger mt-2">
              <b>{formik.errors.phone}</b>
            </div>
          )}
        </article>
        <article className={styleCss.login__item}>
          <Button
            type="submit"
            id="form-submit"
            name="form-submit"
            content="Login"
            style={cssButton}
          />
        </article>

        <article className={styleCss.login__item}>
          <div className={styleCss.login__footer}>
            <span className={styleCss.login__text}>
              Do you have an account?
            </span>
            <Link href="/auth/register">
              <a className={styleCss.login__link}>Register</a>
            </Link>
          </div>
        </article>

        {!session && (
          <article className={styleCss.login__item}>
            <Button
              type="button"
              id="form-submit"
              name="form-submit"
              content="Login with Google"
              style={cssButton}
              onClick={() => signIn('google', { redirect: false })}
            />
          </article>
        )}

        {!session && (
          <article className={styleCss.login__item}>
            <Button
              type="button"
              id="form-submit"
              name="form-submit"
              content="Login with Facebook"
              style={cssButton}
              onClick={() => signIn('facebook', { redirect: false })}
            />
          </article>
        )}

        {session && (
          <article className={styleCss.login__item}>
            <Button
              type="button"
              id="form-submit"
              name="form-submit"
              content="Logout"
              style={cssButton}
              onClick={() => signOut()}
            />
          </article>
        )}
      </form>
    </section>
  );
};
