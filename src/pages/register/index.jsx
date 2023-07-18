//Import Library
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

//Import path api
import apiAxiosAuth from '@/utils/api/auth'

//Import name router
import { ROUTES } from '@/config'

//Import library
import { registerLib } from '@/library/registerPage/registerLib'
import { validateFieldLib } from '@/library/messages/validateLib';

//Import image
import img_logoGoogle from '@/assets/images/logo_google.png'
import img_logoFacebook from '@/assets/images/logo_facebook.png'
import img_logoZalo from '@/assets/images/logo_zalo.png'

//Import function
import { Notification } from '@/components/notification';

const RegisterPage = () => {

  const navigate = useNavigate()
  const { contextHolder, openNotificationWithIcon} = Notification()
  const onFinishRegister = (values) => {
    // eslint-disable-next-line no-unused-vars
    const {confirm_password, ...dataRegister} = values 
    apiAxiosAuth.post("user/signup", dataRegister)
      .then(res => {
        if(res.error) return openNotificationWithIcon('error', 'Fail', res.error)
        if(res.user) {
          localStorage.setItem("user_id", res.user._id),
          navigate(ROUTES.VERIFY_EMAIL)
        }
      })
  } 
  return(
    <div className="registerPage bg-[#FFFEFC] flex-1">
      {contextHolder}
      <div className="registerPage__main py-5">
        <div className="md:bg-banner-login pageWrapper min-h-[38rem] rounded-2xl bg-cover flex flex-col justify-center items-center md:p-5">
          <div className="min-w-full md:min-w-[35rem] bg-white min-h-[30rem] shadow-lg rounded">
            <div className="text-center mt-6 font-bold text-2xl text-green-500">{registerLib.word_register}</div>
            <Form
              layout="vertical"
              className="px-5 py-3"
              onFinish={onFinishRegister}
            >
              <div className="flex md:flex-row flex-col md:items-center flex-wrap">
                <Form.Item
                  name="email"
                  label={validateFieldLib.email}
                  className="px-2 md:w-2/4"
                  rules={[
                    {
                      required: true, 
                      message: validateFieldLib.email_empty,
                    },
                    {
                      type: 'email',
                      message: validateFieldLib.email_incorrect,
                    },
                  ]}
                >
                  <Input placeholder={validateFieldLib.email_placeholder} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={validateFieldLib.phone}
                  className="px-2 md:w-2/4"
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.phone_empty
                    },
                    {
                      pattern: /^(\+84|0)\d{9,10}$/,
                      message: validateFieldLib.phone_incorrect
                    }
                  ]}
                >
                  <Input placeholder={validateFieldLib.phone_placeholder} />
                </Form.Item>
              </div>
                  
              <div className="flex md:flex-row flex-col md:items-center flex-wrap">
                <Form.Item
                  name="password"
                  className="px-2 md:w-2/4"
                  label={validateFieldLib.password}
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
                  <Input.Password placeholder={validateFieldLib.password_placeholder} />
                </Form.Item>

                <Form.Item
                  name="confirm_password"
                  label={validateFieldLib.password_enter}
                  className="px-2 md:w-2/4"
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.password_empty
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(validateFieldLib.password_notMatch));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder={validateFieldLib.password_placeholder} />
                </Form.Item>
              </div>
                
              <div className="flex md:flex-row flex-col md:items-center flex-wrap">
                <Form.Item
                  name="name"
                  className="px-2 md:w-2/4"
                  label={validateFieldLib.name}
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.name_empty
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
                  <Input placeholder={validateFieldLib.name_placeholder} />
                </Form.Item>

                <Form.Item
                  name="address"
                  className="px-2 md:w-2/4"
                  label={validateFieldLib.address}
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.address_empty
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
                  <Input placeholder={validateFieldLib.address_placeholder} />
                </Form.Item>

              </div>
              
              <div className="mb-6 text-center">
                <Button 
                  className="bg-green-500 text-white font-bold inline-block" 
                  size="large"
                  type="ghost"
                  htmlType="submit"
                >{registerLib.word_register}
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="h-[0.1rem] bg-slate-200"></div>
                <div className="absolute top-0 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white z-10 px-5">OR</div>
              </div>
              
              <div className="flex items-center gap-10 justify-center mb-6">
                <img src={img_logoGoogle} alt="" width={36} height={36} />
                <img src={img_logoFacebook} alt="" width={36} height={36} />
                <img src={img_logoZalo} alt="" width={36} height={36} />
              </div>
              
              <div className="flex items-center gap-1 justify-center">
                <span>{registerLib.word_haveAccount}</span>
                <Link to={ROUTES.LOGIN}><span className="text-green-500 cursor-pointer">{registerLib.word_login}</span></Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage