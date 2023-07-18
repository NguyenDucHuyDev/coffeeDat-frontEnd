//Import library
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Menu, Radio } from 'antd';

//Import function
import { TotalHeaderHeight } from '@/components/headers/TotalHeaderHeight';

//Import image
import avatar from '@/assets/images/avatar_user.gif'
import { validateFieldLib } from '@/library/messages/validateLib';
import { useRef } from 'react';


const ProfilePage = () => {
  const openEditAddress = useRef(null)

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Profile", "profile", <UserOutlined />),
    getItem("Order Statistics", "order-statistics", <ShoppingCartOutlined />),
  ];

  //   const onFinishChangePersonalInfo = (values) =>{

  //   }
  const handleEditAddress = () =>{
    openEditAddress.current.style.display = `block`
  }
  return (
    <div className="profile absolute inset-0 z-10">
      <div className="profile__main">
        <div className="flex min-h-screen bg-white">

          <div className="profile_menu border-r-2 fixed top-0 left-0 bottom-0 w-64">
            <TotalHeaderHeight />
            <div className="avatar w-2/4 mx-auto py-5">
              <img src={avatar} className="w-full h-full rounded-full"/>
            </div>
            <Menu
              style={{
                width: 254,
                border: "none",
                background:"transparent"
              }}
              items={items}
            />
          </div>

          <div className="main_view flex flex-1 bg-[#FFFEFC]">
            <div className="w-64"></div>
            <div className="flex-1">
              <TotalHeaderHeight />
              <div className="avatar mx-auto py-5 max-w-[8rem] cursor-pointer">
                <div className="flex flex-col gap-5 justify-center items-center">
                  <img src={avatar} className="w-full h-full rounded-full"/>
                  <p>Choose image</p>
                </div>
              </div>

              <div className="changePersonalInfo flex flex-col gap-5 max-w-4xl mx-auto mt-5 mb-10 px-5">
                <div className="text-xl font-bold">Change Personal Information</div>
                <Form 
                  layout="vertical"
                  className="bg-[#f6f6f6] py-5 px-8 shadow-md"
                // onFinish={onFinishChangePersonalInfo}
                >
                  <div className="flex items-center">
                    <Form.Item
                      name="email"
                      label={validateFieldLib.email}
                      className="px-2 md:w-2/4"
                    >
                      <Input placeholder={validateFieldLib.email_placeholder} disabled={true} />
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

                  <div className="flex items-center">
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
                      name="birthday"
                      label={validateFieldLib.birthday}
                      className="px-2 md:w-2/4"
                      rules={[
                        {
                          required: true,
                          message: validateFieldLib.birthday_placeholder
                        },
                      ]}
                    >
                      <DatePicker placeholder={validateFieldLib.birthday_placeholder} className="w-full" />
                    </Form.Item>
                  </div>

                  <div className="flex items-center">
                    <Form.Item
                      name="gender"
                      label={validateFieldLib.gender}
                      className="px-2 md:w-2/4"
                    >
                      <Radio.Group defaultValue={0}>
                        <Radio value={0}>Male</Radio>
                        <Radio value={1}>Female</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                
                  <div className="flex justify-center">
                    <Button 
                      className="bg-green-500 text-white font-bold inline-block" 
                      size="large"
                      type="ghost"
                      htmlType="submit"
                    >Update
                    </Button>
                  </div>
                </Form>
              </div>

              <div className="changePassword flex flex-col gap-5 max-w-4xl mx-auto mt-5 mb-10 px-5">
                <div className="text-xl font-bold">Change Password</div>
                <Form 
                  layout="vertical"
                  className="bg-[#f6f6f6] py-5 px-8 shadow-md"
                // onFinish={onFinishChangePersonalInfo}
                >
                  <div className="flex items-center">
                    <Form.Item
                      name="password_old"
                      label={validateFieldLib.password_current}
                      className="px-2 md:w-2/4"
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
                      name="password"
                      label={validateFieldLib.password_news}
                      className="px-2 md:w-2/4"
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
                  </div>

                  <div className="flex items-center">
                    <Form.Item
                      name="confirm"
                      className="px-2 md:w-2/4"
                      label={validateFieldLib.password_news_enter}
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
                      <Input placeholder={validateFieldLib.password_placeholder} />
                    </Form.Item>
                  </div>
                
                  <div className="flex justify-center">
                    <Button 
                      className="bg-green-500 text-white font-bold inline-block" 
                      size="large"
                      type="ghost"
                      htmlType="submit"
                    >Update
                    </Button>
                  </div>
                </Form>
              </div>
                      
              <div className="changePassword flex flex-col gap-5 max-w-4xl mx-auto mt-5 mb-10 px-5">
                <div className="text-xl font-bold">Change Address</div>
                <div
                  className="bg-[#f6f6f6] py-5 px-8 shadow-md"
                >
                  <div className="add_address">
                    <div 
                      className="cursor-pointer mb-5"
                      onClick={handleEditAddress}
                    >+ Add Address Other
                    </div>
                    
                    <div ref={openEditAddress} className="hidden w-full">
                      <Form
                        className="justify-between w-full flex gap-5"
                      >
                        <Form.Item
                          className="w-2/4"
                        >
                          <Input placeholder={validateFieldLib.address_placeholder} />
                        </Form.Item>
                        <Button 
                          className="bg-green-500 text-white font-bold inline-block" 
                          size="large"
                          type="ghost"
                          htmlType="submit"
                        >Update
                        </Button>
                      </Form>
                    </div>

                    <div className="flex flex-col gap-5">
                      <table>
                        <colgroup>
                          <col className="70%" />
                          <col className="10%" />
                          <col className="10%" />
                          <col className="10%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th className="text-left text-base font-normal py-2 mx-2">Address: 15 Nguyen Dinh Hien, Tp Da Nang</th>
                            <th className="text-left text-base font-normal py-2 mx-2">Default</th>
                            <th className="text-left text-base font-normal py-2 mx-2">Change</th>
                            <th className="text-left text-base font-normal py-2 mx-2">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 mx-2">Address 1: 15 Nguyen Dinh Hien, Tp Da Nang</td>
                            <td className="py-2 mx-2">Setup Default</td>
                            <td className="py-2 mx-2">Change</td>
                            <td className="py-2 mx-2">Delete</td>
                          </tr>
                          <tr>
                            <td className="py-2 mx-2">Address 2: 15 Nguyen Dinh Hien, Tp Da Nang</td>
                            <td className="py-2 mx-2">Setup Default</td>
                            <td className="py-2 mx-2">Change</td>
                            <td className="py-2 mx-2">Delete</td>
                          </tr>
                          <tr>
                            <td className="py-2">Address 3: 15 Nguyen Dinh Hien, Tp Da Nang</td>
                            <td className="py-2">Setup Default</td>
                            <td className="py-2">Change</td>
                            <td className="py-2">Delete</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
