import Layout from "../layouts/Main";
import Link from "next/link";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import { userService } from "../services";
import { useForm } from "react-hook-form";
import {
  commonMsg,
  validateAplhabetsOnly,
  validateEmail,
  validatePassword,
} from "common";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "store/reducers/user";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { RootState } from "store";
import IcCloseRed from "../assets/icons/IcCloseRed";
import Lottie from "lottie-react";
import SpinningAnimation from "../assets/json/Spinning.json";
import CheckboxCustom from "components/shared/checkbox-custom";
import StorageApi from "services/storage.service";
import ButtonCustom from "components/shared/button-custom";

const REACT_APP_SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY || "";
type Register = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  token: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [tokenError, setTokenError] = useState<boolean>(false);
  const { storeData } = useSelector((state: RootState) => state.store);
  const [loading, setLoading] = useState<boolean>(false);

  const isreCaptcha =
    storeData.preferencesSetting &&
    storeData?.preferencesSetting.value &&
    storeData?.preferencesSetting.value.enable_google_recaptcha_login;
  const recaptchaRef = useRef<any>(null);

  const dispatch = useDispatch();
  const onSubmit = async (data: Register) => {
    const token: any = isreCaptcha && recaptchaRef.current.getValue();
    if (!token && isreCaptcha) {
      setTokenError(true);
    } else {
      setLoading(true);
      userService
        .signUp({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          token: isreCaptcha ? token : "",
        })
        .then((data) => {
          setLoading(false);
          if (data) {
            dispatch(
              setUserData({
                user: data.data.user_info,
              })
            );
            setLoading(false);
            toast.notify(data.message, {
              type: "success",
              autoDismiss: true,
            });
            if (isreCaptcha) {
              recaptchaRef.current.reset(); // here
            }
            router.push("/");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.notify(err.message, {
            type: "error",
            autoDismiss: true,
          });
          if (isreCaptcha) {
            recaptchaRef.current.reset(); // here
          }
          StorageApi.removeItem("user_details");
        });
    }
  };

  return (
    <Layout>
      <section className="form-page auth-page">
        <div className="pp-container">
          <div className="form-block">
            <div className="form-block__title">
              <h2>Sign Up</h2>
            </div>

            <form
              className="form"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete={"off"}
            >
              <div className="form__input-row">
                <span className="input-label">First Name</span>
                <input
                  className="form__input"
                  placeholder="Enter your first name"
                  type="text"
                  name="first_name"
                  ref={register({
                    required: commonMsg.Fname,
                    maxLength: 50,
                    pattern: validateAplhabetsOnly(commonMsg.validFname),
                  })}
                />
                {errors.first_name && errors.first_name.message && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {errors.first_name && errors.first_name.message}
                  </p>
                )}
                {errors.first_name &&
                  errors.first_name.type === "maxLength" && (
                    <p className="message message--error">
                      <IcCloseRed />
                      {commonMsg.fnamelength}
                    </p>
                  )}
              </div>

              <div className="form__input-row">
                <span className="input-label">Last Name</span>
                <input
                  className="form__input"
                  placeholder="Enter your last name"
                  type="text"
                  name="last_name"
                  ref={register({
                    required: commonMsg.Lname,
                    maxLength: 50,
                    pattern: validateAplhabetsOnly(commonMsg.validLname),
                  })}
                />
                {errors.last_name && errors.last_name.message && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {errors.last_name && errors.last_name.message}
                  </p>
                )}
                {errors.last_name && errors.last_name.type === "maxLength" && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {commonMsg.lnamelength}
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <span className="input-label">Email</span>
                <input
                  className="form__input"
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  ref={register({
                    required: commonMsg.email,
                    maxLength: 100,
                    minLength: 6,
                    pattern: validateEmail(commonMsg.validEmail),
                  })}
                />
                {errors.email && errors.email.message && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {errors.email && errors.email.message}
                  </p>
                )}
                {errors.email && errors.email.type === "maxLength" && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {commonMsg.emailMaxLimit}
                  </p>
                )}
                {errors.email && errors.email.type === "minLength" && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {commonMsg.emailMinLimit}
                  </p>
                )}
              </div>

              <div className="form__input-row">
                <span className="input-label">Password</span>
                <input
                  className="form__input"
                  type="Password"
                  placeholder="Enter your password"
                  name="password"
                  ref={register({
                    required: commonMsg.password,
                    maxLength: 32,
                    minLength: 6,
                    pattern: validatePassword(commonMsg.passwordmixedValid),
                  })}
                />
                {errors.password && errors.password.message && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {errors.password && errors.password.message}
                  </p>
                )}

                {errors.password && errors.password.type === "maxLength" && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {commonMsg.passwordMaxLimit}{" "}
                  </p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="message message--error">
                    <IcCloseRed />
                    {commonMsg.passwordMinLimit}{" "}
                  </p>
                )}
              </div>

              <div className="form__info">             
                <Link href={"#"}>
                  By proceeding, you agree to the Terms and Conditions
                </Link>
              </div>

              {isreCaptcha && (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  // size="invisible"
                  sitekey={REACT_APP_SITE_KEY}
                  onChange={() => {
                    setTokenError(false);
                  }}
                />
              )}

              {tokenError && (
                <p className="message message--error">
                  <IcCloseRed />
                  Captcha is Required
                </p>
              )}
              <ButtonCustom type="submit" fullwidth loading={loading}>
                Sign up
              </ButtonCustom>

              <ButtonCustom
                href="/login"
                variant="red--underline"
                className="mt-40 justify-content-center"
                textTransform="capitalize"
              >
                Are you already a member?
              </ButtonCustom>
              <ButtonCustom
                href="/"
                className="mt-30 justify-content-center"
                variant="black--underline"
                textTransform="none"
              >
                Return to Store
              </ButtonCustom>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
