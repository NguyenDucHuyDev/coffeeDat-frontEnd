//Import library
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { NavLink, useOutletContext } from 'react-router-dom';
import { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

//Import api
import apiAxiosUser from '@/utils/api/user'

//Import propTypes
import { userInfoPropTypes } from '@/utils/propTypes';

//Import word
import { validateFieldLib } from '@/library/messages/validateLib';

// Import Redux slice
import { setUserInfo } from "@/redux/features/user/userSlice";

//Import name router
import { ROUTES } from '@/config';

//Import function
import { TotalHeaderHeight } from '@/components/headers/TotalHeaderHeight';
import { checkAvatarUser } from '@/utils/checkImage';
import { Notification } from '@/components/notification';


const ProfilePage = () => {
  
  const {userInfo} = useOutletContext();
  const [changePasswordForm] = Form.useForm();

  const [btnDisable, setBtnDisable] = useState(false)  
  const dispatch = useDispatch()
  const { contextHolder, openNotificationWithIcon} = Notification()
  const openEditAddress = useRef(null)
  const avatarRef = useRef(null)

  const [modal2Open, setModal2Open] = useState(false);
  const [changeAddress,setChangeAddress] = useState("")

  const handleEditAddress = () =>{
    openEditAddress.current.style.display = `block`
  }

  const handleAvatar = (event) =>{
    setBtnDisable(true)
    const fileImgAvatar = event.target.files[0];
    const formData = new FormData();
    formData.append("avatar", fileImgAvatar);
    apiAxiosUser.post("update-avatar", formData).then(res =>{
      dispatch(setUserInfo(res.user)),
      openNotificationWithIcon("success", "Success", "Update successful")
    }).finally(()=>{
      setBtnDisable(false)
    })
  }

  const handleSubmitAvatar = async () => {
    avatarRef.current.click();
  }

  const onFinishChangePersonalInfo = (values) => {
    setBtnDisable(true)
    const {email, ...remaining} = values
    apiAxiosUser.put("update-user-info", remaining)
      .then( res =>{
        if(res.error) return openNotificationWithIcon("error", "Fail", res.error)
        dispatch(setUserInfo(res.user)),
        openNotificationWithIcon("success", "Success", "Update successful")
      }).catch((error)=>{
        openNotificationWithIcon("error", "Fail", error.response.data.error)
      }).finally(()=>{
        setBtnDisable(false)
      })
  }

  const onFinishChangePassword = (values) =>{
    setBtnDisable(true)
    const {confirm, ...remaining} = values
    apiAxiosUser.put("change-password", remaining)
      .then(res =>{
        if(res.error) return openNotificationWithIcon("error", "Fail", res.error)
        openNotificationWithIcon("success", "Success", res.message)
        changePasswordForm.resetFields()
      }).finally(()=>{
        setBtnDisable(false)
      })
  }

  const onFinishAddAddress = (values) =>{
    setBtnDisable(true)
    apiAxiosUser.post("add-new-address", values)
      .then(res=>{
        if(res.error) return openNotificationWithIcon("error", "Fail", res.error)
        dispatch(setUserInfo(res.user)),
        openNotificationWithIcon("success", "Success", "Update successful")
      }).finally(()=>{
        setBtnDisable(false)
      })
  }

  const handleDeleteAddress = (addressId) => {
    setBtnDisable(true)
    apiAxiosUser.delete("delete-address/"+addressId)
      .then(res=>{
        if(res.error) return openNotificationWithIcon("error", "Fail", res.error)
        dispatch(setUserInfo(res.user)),
        openNotificationWithIcon("success", "Success", "Update successful")
      }).finally(()=>{
        setBtnDisable(false)
      })
  }

  const handleSetDefaultAddress = (addressId) => {
    setBtnDisable(true)
    apiAxiosUser.put("set-default-address/"+addressId)
      .then(res=>{
        if(res.error) return openNotificationWithIcon("error", "Fail", res.error)
        openNotificationWithIcon("success", "Success", "Update successful"),
        dispatch(setUserInfo(res.user))
      }).finally(()=>{
        setBtnDisable(false)
      })
  }

  const handleChangeAddress = (addressId, address, index) => {
    setChangeAddress({
      addressId: addressId,
      address: address,
      index: index
    })
    setModal2Open(true)
  }

  const handleChangeAddressSuccess = (values) => {
    setBtnDisable(true)
    apiAxiosUser.put("update-address/"+changeAddress.addressId, values)
      .then(res =>{
        console.log(res)
        if(res.error) return openNotificationWithIcon("error", "Fail", res.error)
        dispatch(setUserInfo(res.user)),
        openNotificationWithIcon("success", "Success", "Update successful")
      }).finally(()=>{
        setBtnDisable(false)
      })
  }

  return (
    <div className="profile absolute inset-0 z-10">
      {contextHolder}
      <div className="profile__main">
        <div className="flex min-h-screen bg-white">

          <div className="profile_menu border-r-2 fixed top-0 left-0 bottom-0 w-64">
            <TotalHeaderHeight />
            <div className="avatar w-2/4 mx-auto py-5">
              <img
                src={checkAvatarUser(userInfo?.avatar)}
                className="w-full h-full rounded-full mb-5" 
              />
              <div className="text-center">{userInfo?.name}</div>
            </div>

            <div className="w-64">
              <NavLink
                to={ROUTES.PROFILE}
                className={({isActive}) => 
                  isActive ? "bg-[#F9C06A] block p-3 " : "p-3"
                }
              >
                <div className="flex gap-3 items-center">
                  <UserOutlined />
                  Profile
                </div>
              </NavLink>
            </div> 
          </div>

          <div className="main_view flex flex-1 bg-[#FFFEFC]">
            <div className="w-64"></div>
            <div className="flex-1">
              <TotalHeaderHeight />
              <div className="avatar mx-auto py-5 max-w-[8rem] cursor-pointer">

                <div className="flex flex-col gap-5 justify-center items-center">
                  <img 
                    src={checkAvatarUser(userInfo?.avatar)}
                    className="w-full h-full rounded-full" 
                    onClick={handleSubmitAvatar}
                  />
                  <div onClick={handleSubmitAvatar}>Choose Image</div>
                  <input 
                    type="file" 
                    className="hidden"
                    onChange={handleAvatar}
                    ref={avatarRef}
                    accept="image/*"
                  />
                </div>

              </div>

              <div className="changePersonalInfo flex flex-col gap-5 max-w-4xl mx-auto mt-5 mb-10 px-5">
                <div className="text-xl font-bold">Change Personal Information</div>
                <Form 
                  layout="vertical"
                  className="bg-[#f6f6f6] py-5 px-8 shadow-md"
                  onFinish={onFinishChangePersonalInfo}
                  initialValues={{
                    ["email"]: userInfo && userInfo.email,
                    ["phone"]: userInfo && userInfo.phone,
                    ["name"] : userInfo && userInfo.name
                  }}
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
                  </div>
                
                  <div className="flex justify-center">
                    <Button 
                      className="bg-green-500 text-white font-bold inline-block" 
                      size="large"
                      type="ghost"
                      htmlType="submit"
                      disabled={btnDisable}
                      loading={btnDisable}
                    >Update
                    </Button>
                  </div>
                </Form>
              </div>

              <div className="changePassword flex flex-col gap-5 max-w-4xl mx-auto mt-5 mb-10 px-5">
                <div className="text-xl font-bold">Change Password</div>
                <Form 
                  layout="vertical"
                  form={changePasswordForm}
                  className="bg-[#f6f6f6] py-5 px-8 shadow-md"
                  onFinish={onFinishChangePassword}
                >
                  <div className="flex items-center">
                    <Form.Item
                      name="oldPassword"
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
                      name="newPassword"
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
                            if (!value || getFieldValue('newPassword') === value) {
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
                
                  <div className="flex justify-center">
                    <Button 
                      className="bg-green-500 text-white font-bold inline-block" 
                      size="large"
                      type="ghost"
                      htmlType="submit"
                      disabled={btnDisable}
                      loading={btnDisable}
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
                        onFinish={onFinishAddAddress}
                      >
                        <Form.Item
                          name="address"
                          className="w-2/4"
                          rules={[
                            {
                              required: true,
                              message: validateFieldLib.address_empty
                            },
                            {
                              min: 6,
                              message: validateFieldLib.min_6
                            }
                          ]}
                        >
                          <Input placeholder={validateFieldLib.address_placeholder} />
                        </Form.Item>
                        <Button 
                          className="bg-green-500 text-white font-bold inline-block" 
                          size="large"
                          type="ghost"
                          htmlType="submit"
                          disabled={btnDisable}
                          loading={btnDisable}
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
                            {userInfo?.address.map( (item, index) =>{
                              return(
                                item.isDefault
                                && <Fragment key={item._id}>
                                  <th className="text-left text-base font-normal py-2 mx-2">Address 1: {item?.address}</th>
                                  <th 
                                    className="text-left text-base font-normal py-2 mx-2"
                                  >
                                    Default
                                  </th>
                                  <th 
                                    className="text-left text-base font-normal py-2 mx-2"
                                    onClick={() => handleChangeAddress(item?._id, item?.address, index + 1)}
                                  >
                                    Change
                                  </th>
                                  <th 
                                    className="text-left text-base font-normal py-2 mx-2 cursor-pointer"
                                    onClick={()=>{handleDeleteAddress(item._id)}}
                                  >
                                    Delete
                                  </th>
                                </Fragment>
                              )
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {userInfo?.address.map( (item, index)=>{
                            return(
                              !item.isDefault
                              && <Fragment key={item._id}>
                                <tr>
                                  <td className="py-2 mx-2">Address {index + 1}: {item?.address}</td>
                                  <td 
                                    className="py-2 mx-2 cursor-pointer"
                                    onClick={()=>{handleSetDefaultAddress(item?._id)}}
                                  >
                                    Setup Default
                                  </td>
                                  <td 
                                    className="py-2 mx-2"
                                    onClick={() => handleChangeAddress(item?._id, item?.address, index + 1)}
                                  >
                                    Change
                                  </td>
                                  <td 
                                    className="py-2 mx-2 cursor-pointer" 
                                    onClick={()=>{handleDeleteAddress(item?._id)}}
                                  >
                                    Delete
                                  </td>
                                </tr>
                              </Fragment>
                            )
                          })}
                        </tbody>
                      </table>
                      <Modal
                        title={"Change The Address " + changeAddress.index}
                        centered
                        open={modal2Open}
                        onOk={() => setModal2Open(false)}
                        onCancel={() => setModal2Open(false)}
                        okButtonProps={{ className: "hidden" }}
                        cancelButtonProps={{ className: "hidden" }}
                      >
                        <Form
                          className="mt-5"
                          onFinish={handleChangeAddressSuccess}
                        >
                          <Form.Item
                            name="address"
                          >
                            <Input placeholder={validateFieldLib.address_placeholder} className="py-2" />
                          </Form.Item>
                          <div className="text-center">
                            <Button 
                              className="bg-[#F9C06A] text-white font-bold shadow-lg"
                              size="large"
                              type="ghost"
                              htmlType="submit"
                              disabled={btnDisable}
                              loading={btnDisable}
                            >Change
                            </Button>
                          </div>
                        </Form>
                      </Modal>
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

ProfilePage.propTypes = userInfoPropTypes;
