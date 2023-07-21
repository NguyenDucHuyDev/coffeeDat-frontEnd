//import library
import { Button, Form, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

//import api axios user
import apiAxiosAuth from '../../utils/api/auth'

//import ROUTES
import { ROUTES } from '../../config';

//import slice redux
import { setUserInfo } from '../../redux/features/user/userSlice';

//Import function
import { Notification } from '@/components/notification';

//handle and export
const VerifyEmailPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { contextHolder, openNotificationWithIcon} = Notification()
  const [btnDisable, setBtnDisable] = useState(false)
  const [count, setCount] = useState(1)
  const userID = localStorage.getItem("user_id")
  if(!userID) return <Navigate to={ROUTES.LOGIN} replace />
  
  const onFinishVerify = (values) => {
    setBtnDisable(true)
    const value = Object.values(values);
    const concatCodeVerify = value.join('');

    apiAxiosAuth.post("user/verify-email", {
      userId:userID,
      OTP: concatCodeVerify
    })
      .then(res => {
        if(res.error) return openNotificationWithIcon('error', 'Fail', res.error)
        localStorage.setItem("access_token_user", res.user.jwt_token)
        dispatch(setUserInfo(res.user))
        navigate(ROUTES.HOME)
        localStorage.removeItem("user_id")
      }).finally(()=>{
        setBtnDisable(false)
      });
  }

  const handleSendOtp = () =>{
    apiAxiosAuth.post("user/resend-email-verify",{
      "userId": userID
    }).then(res =>{
      if(count > 3) {
        return(
          setCount(0),
          setBtnDisable(true),
          setTimeout(() => {
            btnDisable(false)
            setCount(1)
          }, 60000)
        )
      }
      if(res.error == "You can resend OTP after five minutes") setCount(pre => pre += 1 )
      if(res.error) return openNotificationWithIcon('error', 'Fail', res.error)
      openNotificationWithIcon('success', 'Success', res.message)
    })
  }

  return(
    <>
      {contextHolder}
      <div className="verifyEmailPage bg-[#FFFEFC] flex-1">
        <div className="verifyEmailPage__main py-5">
          <div className="md:bg-banner-login pageWrapper min-h-[35rem] rounded-2xl bg-cover flex flex-col justify-center items-center md:p-5">       
           
            <div className="min-w-full md:min-w-[20rem] bg-white shadow-lg rounded p-5">
              <div className="text-center mt-6 font-bold text-2xl text-[#F9C06A] mb-5">Email VerifiCation</div>
              <Form
                onFinish={onFinishVerify}
                className="verifyEmail"
              >
                <p className="mb-5 text-center text-red-500">Please check your email and enter otp</p>

                <div className="flex items-center w-96 mb-5">
                  <Form.Item
                    name="verify_1"
                    className="w-1/6 px-1"
                    style={{margin:0}}
                  >   
                    <InputNumber maxLength={1} className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="verify_2"
                    className="w-1/6 px-1"
                    style={{margin:0}}
                  >   
                    <InputNumber maxLength={1} className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="verify_3"
                    className="w-1/6 px-1"
                    style={{margin:0}}
                  >   
                    <InputNumber maxLength={1} className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="verify_4"
                    className="w-1/6 px-1"
                    style={{margin:0}}
                  >   
                    <InputNumber maxLength={1} className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="verify_5"
                    className="w-1/6 px-1"
                    style={{margin:0}}
                  >   
                    <InputNumber maxLength={1} className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="verify_6"
                    className="w-1/6 px-1"
                    style={{margin:0}}
                  >   
                    <InputNumber maxLength={1} className="w-full" />
                  </Form.Item>
                </div>

                <div className="mb-5 flex justify-center">
                  <Button 
                    type="link"
                    className="cursor-pointer" 
                    style={{border:"0"}}
                    onClick={handleSendOtp}
                    disabled = {!count}
                  >
                    Resend OTP?
                  </Button>
                </div>

                <div className="flex justify-center">
                  <Button 
                    className="bg-[#1677ff] text-white font-bold mb-6" 
                    size="large"
                    type="ghost"
                    htmlType="submit"
                    disabled={btnDisable}
                    loading={btnDisable}
                  >VerifyCation
                  </Button>
                </div>

              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyEmailPage
