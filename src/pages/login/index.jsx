//Import library
import { Button, Checkbox, Form, Input } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from 'react';

//Import path api
import apiAxiosAuth from "@/utils/api/auth";

//Import name router
import { ROUTES } from "@/config";

//Import word
import { loginLib } from "@/library/loginPage/loginLib";
import { validateFieldLib } from "@/library/messages/validateLib";

//Import features Redux
import { setUserInfo } from "@/redux/features/user/userSlice";
import { checkToken } from "@/redux/features/user/tokenSlice";

//Import function
import { Notification } from "@/components/notification";

//Import image
import img_logoGoogle from '@/assets/images/logo_google.png';

//Handle and export
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [btnDisable, setBtnDisable] = useState(false)
  const { contextHolder, openNotificationWithIcon} = Notification()

  const onFinishLogin = (values) => {
    const {remember, ...dataLogin} = values
    setBtnDisable(true)
    apiAxiosAuth.post("user/sign-in", dataLogin).then((res) => {
      if (res.error)
        return openNotificationWithIcon("error", "Fail", res.error);
      if (res.user) {
        if (!res.user.isVerified) {
          return (
            apiAxiosAuth.post("user/resend-email-verify", {
              userId: res.user._id,
            }),
            localStorage.setItem("user_id", res.user._id),
            navigate(ROUTES.VERIFY_EMAIL)
          );
        }
        dispatch(checkToken(true)),
        dispatch(setUserInfo(res.user)),
        localStorage.removeItem("user_id")
        if(!remember) {
          const exp = new Date(new Date().getTime() + 1000 * 60 * 60 * 24).getTime()
          // const exp = new Date(new Date().getTime() + 1000 * 10).getTime()
          localStorage.setItem("access_token_user_exp", exp)
        }
        localStorage.setItem("access_token_user", res.user.jwt_token);
        navigate(ROUTES.HOME);
      }
    }).finally(()=>{
      setBtnDisable(false)
    });
  };

  return (
    <>
      {contextHolder}
      <div className="loginPage bg-[#FFFEFC] flex-1">
        <div className="loginPage__main py-5">
          <div className="md:bg-banner-login pageWrapper min-h-[38rem] rounded-2xl bg-cover flex flex-col justify-center items-center px-5">
            <div className="md:min-w-[22rem] bg-white min-h-[30rem] shadow-lg rounded">
              <div className="text-center mt-6 font-bold text-2xl text-green-500">
                {loginLib.word_login}
              </div>
              <Form
                layout="vertical"
                className="px-5 py-3"
                onFinish={onFinishLogin}
              >
                <Form.Item
                  name="email"
                  label={validateFieldLib.email}
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.email_empty,
                    },
                    {
                      type: "email",
                      message: validateFieldLib.email_incorrect,
                    },
                  ]}
                >
                  <Input placeholder={validateFieldLib.email_placeholder} />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={validateFieldLib.password}
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.password_empty,
                    },
                    {
                      min: 6,
                      message: validateFieldLib.min_6,
                    },
                    {
                      max: 20,
                      message: validateFieldLib.max_20,
                    },
                  ]}
                >
                  <Input.Password
                    placeholder={validateFieldLib.password_placeholder}
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-6 gap-2">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>{loginLib.word_rememberPassword}</Checkbox>
                  </Form.Item>

                  <Link to={ROUTES.RETRIEVE_PASSWORD} className="text-black">
                    <pre className="text-xs text-black cursor-auto">
                      <i>{loginLib.word_forgotPassword}</i>
                    </pre>
                  </Link>
                </div>

                <Button
                  className="bg-green-500 text-white font-bold w-full mb-6"
                  size="large"
                  type="ghost"
                  htmlType="submit"
                  disabled={btnDisable}
                  loading={btnDisable}
                >
                  {loginLib.btn_login}
                </Button>

                <div className="relative mb-6">
                  <div className="h-[0.1rem] bg-slate-200"></div>
                  <div className="absolute top-0 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white z-10 px-5">
                    OR
                  </div>
                </div>

                <div className="flex items-center gap-10 justify-center mb-6">
                  <Link
                    to={`${import.meta.env.VITE_PATH_URL_SERVER}auth/google`}
                  >
                    <img src={img_logoGoogle} alt="" width={36} height={36} />
                  </Link>
                </div>

                <div className="flex items-center gap-1 justify-center">
                  <span>{loginLib.word_notAccount}</span>
                  <Link to={ROUTES.REGISTER}>
                    <span className="text-green-500 cursor-pointer">
                      {loginLib.word_register}
                    </span>
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
