//Import library
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Spin } from 'antd';

//Import path api axios
import apiAxiosAuth from '../../utils/api/auth';

//Import name routes
import { ROUTES } from '../../config';

//Import word
import { authSlugLib } from '@/library/retrievePasswordPage/authSlugLib';

//Import validate
import { validateFieldLib } from '@/library/messages/validateLib';

//Import function
import PageNotFound from '../error';
import { Notification } from '@/components/notification';

// Handle and export
const AuthSlug = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { contextHolder, openNotificationWithIcon} = Notification()
  const [checkUser, setCheckUser] = useState("init")
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token")
  const userID = searchParams.get("id")
  
  useEffect(() =>{
    apiAxiosAuth.post("user/verify-reset-password-token",{
      token:token,
      userID:userID
    }).then(res=>{
      if(res.error) return setCheckUser("fail")
      setCheckUser("success")
    })
  },[token, userID])

  const onFinishChangePassword = (values) =>{
    // eslint-disable-next-line no-unused-vars
    const {confirm_password, password} = values
    apiAxiosAuth.post("user/reset-password", {
      userID : userID,
      "token": token,
      "newPassword": password,
    }).then(res=>{
      if (res.error) return openNotificationWithIcon("error", "Fail", res.error);
      navigate(ROUTES.LOGIN)
    })  
  }

  return (
    <div className="passwordAuth flex-1 bg-[#FFFEFC]">
      {contextHolder}
      <div className="passwordAuth__main">
        <div className="pageWrapper p-5 flex flex-col items-center justify-center min-h-[45rem]">
          {checkUser === "init" 
          && 
          <Spin tip="Loading" size="large">
            <div className="content pl-10"/>
          </Spin>
          }
          {checkUser === "fail" && <PageNotFound /> }
          {checkUser ===  "success"
          &&
          <div className="min-w-full md:min-w-[25rem] bg-white shadow-xl rounded-2xl p-5">
            <div className="my-5">
              <span className="text-2xl text-[#603809] font-bold">
                {authSlugLib.word_resetPassword}
              </span>
            </div>

            <Form 
              layout="vertical"
              onFinish={onFinishChangePassword}
            >
              <Form.Item
                name="password"
                label={authSlugLib.word_newPassword}
                rules={[
                  {
                    required: true,
                    message: validateFieldLib.password_empty
                  },
                  {
                    min: 6,
                    message: validateFieldLib.min_6,
                  },
                  {
                    max: 20,
                    message: validateFieldLib.max_20,
                  }
                ]}
              >
                <Input.Password
                  placeholder={authSlugLib.placeholder_password}
                  className="py-2"
                />
              </Form.Item>

              <Form.Item
                name="confirm_password"
                label={authSlugLib.word_enterNewPassword}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(validateFieldLib.password_notMatch)
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder={authSlugLib.placeholder_password}
                  className="py-2"
                />
              </Form.Item>

              <div className="flex flex-col justify-center py-2">
                <Button
                  className="bg-[#F9C06A] text-white font-bold shadow-lg"
                  size="large"
                  type="ghost"
                  htmlType="submit"
                >
                  {authSlugLib.word_confirm}
                </Button>
              </div>
            </Form>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AuthSlug