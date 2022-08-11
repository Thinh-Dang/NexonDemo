import { CSSProperties } from 'react';
import styleCss from './EnterPhone.module.scss';

import { Label, Input, Button, TitleText } from '../../components';

export const EnterPhone = ({ formik }: IFormikConfigContainer) => {
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
    <section className={styleCss.enterPhone}>
      <form
        className={styleCss.enterPhone__container}
        onSubmit={formik.handleSubmit}
      >
        <article className={styleCss.enterPhone__item}>
          <TitleText
            text="Enter"
            textColor=" Phone"
            color="orange"
            style={cssTitleText}
          />
        </article>
        <article className={styleCss.enterPhone__item}>
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
        <article className={styleCss.enterPhone__item}>
          <Button
            type="submit"
            id="form-submit"
            name="form-submit"
            content="Enter"
            style={cssButton}
          />
        </article>
      </form>
    </section>
  );
};
