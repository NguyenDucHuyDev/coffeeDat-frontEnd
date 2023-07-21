//Import library
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

//Import name routes
import { ROUTES } from '@/config';

//Import word
import { contactUsLib } from '@/library/contactUsPage/contactUsLib';
import { validateFieldLib } from '@/library/messages/validateLib';

//Import path api
import apiAxiosAuth from '@/utils/api/auth';

//Import function
import { Notification } from '@/components/notification';

const ContactUsPage = () => {
  const navigate = useNavigate()
  const { contextHolder, openNotificationWithIcon} = Notification()
  const onFinishContactUs = (dataContactUs) => {
    apiAxiosAuth.post("user/add-contact", dataContactUs).then((res) => {
      if (res.error)
        return openNotificationWithIcon("error", "Fail", res.error);
      if (res.message)
        navigate(ROUTES.CONTACT_US+"/success")
    });
  };

  return (
    <>
      {contextHolder}
      <div className="ContractUsPage bg-[#FFFEFC] flex-1 overflow-hidden">
        <div className="ContractUsPage__main">
          <div className="pageWrapper px-5 min-h-[45rem] flex flex-col items-center justify-center">
            <div className="min-w-full md:min-w-[25rem] bg-white min-h-[30rem] shadow-lg rounded p-5">
              <div className="text-center my-5">
                <span className="text-xl text-[#603809] font-bold">{contactUsLib.word_contactUs}</span>
              </div>

              <Form layout="vertical" onFinish={onFinishContactUs}>
                <Form.Item
                  name="email"
                  label={validateFieldLib.email}
                  className="px-2"
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
                  className="px-2"
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.phone_empty
                    },
                    {
                      pattern:"^[0-9]*$",
                      message: validateFieldLib.phone_incorrect
                    }
                  ]}
                >
                  <Input placeholder={validateFieldLib.phone_placeholder} />
                </Form.Item>

                <Form.Item
                  name="name"
                  label={validateFieldLib.name}
                  className="px-2"
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.name_empty
                    },
                    {
                      max: 64,
                      message: validateFieldLib.max_64,
                    }
                  ]}
                >
                  <Input placeholder={validateFieldLib.name_placeholder} />
                </Form.Item>

                <Form.Item 
                  name="note" 
                  label={validateFieldLib.note} 
                  className="px-2"
                  rules={[
                    {
                      required: true,
                      message: validateFieldLib.note_placeholder
                    },
                    {
                      min: 6,
                      message: validateFieldLib.min_6,
                    },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <div className="flex justify-center">
                  <Button
                    className="bg-[#F9C06A] text-white font-bold mb-6"
                    size="large"
                    type="ghost"
                    htmlType="submit"
                  >
                    {contactUsLib.btn_sendRequire}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
