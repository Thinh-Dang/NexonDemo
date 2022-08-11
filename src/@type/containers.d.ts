// Formik Config
interface IFormikConfigContainer {
  formik: FormikConfig<IFormLoginPage>;
}

// Login Container
interface ILoginContainer {
  formik: FormikConfig<IFormLoginPage>;
  session: any;
}

// Register Container
interface IRegisterContainer {
  formik: FormikConfig<IFormLoginPage>;
}

// OTP Container
interface ITokenContainer {
  formik: FormikConfig<IFormLoginPage>;
}
