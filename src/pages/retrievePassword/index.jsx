//Import library
import { Button, Form, Input, Modal} from 'antd';
import { useState } from 'react';

//Import path api axios
import apiAxiosAuth from '@/utils/api/auth';

//Import word
import { retrievePasswordLib } from '@/library/retrievePasswordPage/retrievePasswordLib';
import { validateFieldLib } from '@/library/messages/validateLib';

//Import image
import img_iconMail from '@/assets/images/icon_mail.png';

//Import function
import { Notification } from '@/components/notification';

// Handle and export
const RetrievePasswordPage = () => {
  const [email, setEmail] = useState("");
  const { contextHolder, openNotificationWithIcon} = Notification()
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(1)
  const onFinishSendReqEmail = (emailValue) => {
    apiAxiosAuth.post("user/forget-password", emailValue).then((res) => {
      if(count > 3) {
        return(
          setCount(0),
          setTimeout(() => {
            setCount(1)
          }, 60000)
        )
      }
      if(res.error == "You can resend OTP after file minutes") setCount(pre => pre += 1 )
      
      if (res.error) return openNotificationWithIcon("error", "Fail", res.error);
      setEmail(emailValue.email);
      setOpenModal(true);
    });
  };

  return (
    <div className="retrievePasswordPage flex-1 bg-[#FFFEFC]">
      {contextHolder}
      <div className="retrievePasswordPage__main">
        <div className="pageWrapper p-5 flex flex-col items-center justify-center min-h-[45rem]">
          <div className="min-w-full md:min-w-[25rem] bg-white shadow-xl rounded-2xl p-5">
            <div className="my-5">
              <span className="text-2xl text-[#603809] font-bold">{retrievePasswordLib.word_resetPassword}</span>
            </div>

            <div className="border-b-2 pb-3 mb-5 border-[#F9C06A]">
              <span className="text-[#F9C06A] cursor-pointer">{retrievePasswordLib.word_email}</span>
            </div>

            <Form layout="vertical" onFinish={onFinishSendReqEmail}>
              <Form.Item
                name="email"
                label={retrievePasswordLib.word_email}
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
                <Input classNames={retrievePasswordLib.placeholder_email} className="py-2" />
              </Form.Item>

              <div className="flex justify-center">
                <Button
                  className="bg-[#F9C06A] text-white font-bold mb-6 shadow-lg"
                  size="large"
                  type="ghost"
                  htmlType="submit"
                  disabled={!count}
                  loading={!count}
                >
                  {retrievePasswordLib.btn_continue}
                </Button>
              </div>
            </Form>
          </div>

          <Modal
            title={
              <div className="">
                <span className="text-xl font-bold">{retrievePasswordLib.word_securityVerification}</span>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-base font-normal my-5">
                    <img src={img_iconMail} alt="" width={16} />
                    <span>{retrievePasswordLib.word_sentEmail} {email}</span>
                  </div>

                  <Button
                    className="bg-[#F9C06A] text-white font-bold shadow-lg"
                    size="large"
                    type="ghost"
                    onClick={() =>{setOpenModal(false)}}
                  >
                    {retrievePasswordLib.word_confirm}
                  </Button>
                </div>
              </div>
            }
            centered
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            okButtonProps={{ className: "hidden" }}
            cancelButtonProps={{ className: "hidden" }}
          ></Modal>

        </div>
      </div>
    </div>
  );
};

export default RetrievePasswordPage;
