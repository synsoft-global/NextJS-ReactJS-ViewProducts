import Layout from "../layouts/Main";
import { useForm } from "react-hook-form";
import { userService } from "../services";
import { toast } from "react-nextjs-toast";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "store/reducers/user";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  commonMsg,
  SUCCESS_LOGIN_MESSAGE,
  validateEmail,
  validatePassword,
} from "common";
import ReCAPTCHA from "react-google-recaptcha";
import IcCloseRed from "assets/icons/IcCloseRed";
import CheckboxCustom from "components/shared/checkbox-custom";
import { getCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import StorageApi from "services/storage.service";
import ButtonCustom from "components/shared/button-custom";
const REACT_APP_SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY || "";
type LoginMail = {
  email: string;
  password: string;
  token: string;
};

export const getServerSideProps = (context) => {
  const token = getCookie("token", { req: context.req, res: context.res });
  const { checkouts } = context.query;
  if (!token) {
    return { props: { login: false } };
  }
  return { props: { login: true } };
};

const LoginPage = ({ login }) => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [tokenError, setTokenError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { storeData } = useSelector((state: RootState) => state.store);
  // const source: any = router.query.source;
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const { query } = router;
  const isCheckouts = "redirect" in query;

  const isreCaptcha =
    storeData.preferencesSetting &&
    storeData?.preferencesSetting.value &&
    storeData?.preferencesSetting.value.enable_google_recaptcha_login;
  const recaptchaRef = useRef<any>(null);

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.id) {
      if (isCheckouts) {
        router.push("/" + query.redirect);
      } else {
        router.push("/");
      }
    }
  }, [user && user.id]);

  useEffect(() => {
    if (!login) {
      dispatch(setUserData({ user: {} }));
      StorageApi.removeItem("token");
      StorageApi.removeItem("user_details");
      deleteCookie("token");
    }
  }, []);

  const dispatch = useDispatch();
  const onSubmit = async (data: LoginMail) => {
    const token: any = isreCaptcha && recaptchaRef.current.getValue();
    if (!token && isreCaptcha) {
      setTokenError(true);
    } else {
      setLoading(true);
      userService
        .logIn({
          email: data.email,
          password: data.password,
          token: isreCaptcha ? token : "",
          remember_me: isChecked,
        })
        .then((data) => {
          dispatch(
            setUserData({
              user: data.data.user_info,
            })
          );
          setLoading(false);
          toast.notify(SUCCESS_LOGIN_MESSAGE, {
            type: "success",
            autoDismiss: true,
          });

          if (isCheckouts) {
            router.push("/" + query.redirect);
          } else {
            router.push("/");
          }

          if (isreCaptcha) {
            recaptchaRef.current.reset(); // here
          }
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
          toast.notify(err.message, {
            type: "error",
            autoDismiss: true,
          });
          StorageApi.removeItem("user_details");
          if (isreCaptcha) {
            recaptchaRef.current.reset(); // here
          }
        });
    }
  };

  return (
    <Layout>
      <section className="form-page auth-page">
        <div className="pp-container">     

          <div className="form-block">
            <div className="form-block__title">
              <h2>Log in</h2>
            </div>
            <form
              className="form"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete={"off"}
            >
              <div className="form__input-row">
                <span className="input-label">Email</span>
                <input
                  className="form__input"
                  placeholder="Email"
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
                    {errors.email.message}
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
                  type="password"
                  placeholder="Password"
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
                    {errors.password.message}
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

              <div className="form__info">            

                <CheckboxCustom
                  id="keepmeloggedin"
                  label="Keep me Logged In"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />              
              </div>

              <ButtonCustom type="submit" loading={loading} fullwidth>
                SIGN IN
              </ButtonCustom>
              <ButtonCustom
                href="/register"
                variant="red--underline"
                className="mt-40 justify-content-center"
                textTransform="capitalize"
              >
                Create Account
              </ButtonCustom>
              <ButtonCustom
                href="/"
                variant="black--underline"
                className="mt-30 justify-content-center"
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

export default LoginPage;
