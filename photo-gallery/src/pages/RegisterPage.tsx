import { DatePicker, Form, Input, Select, message, ConfigProvider } from "antd";
import { Link, useHistory } from "react-router-dom";
import { userServ } from "../api/api";
import viVN from "antd/locale/vi_VN";
import { IonContent, IonPage } from "@ionic/react";

export default function RegisterPage() {
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };
  const history = useHistory();
  const onFinish = (values: any) => {
    const processValues = { ...values, gender: values.gender === "male" ? true : false };
    userServ
      .signup(processValues)
      .then(() => {
        message.success("Register successfully, please login!");
        history.push("/login");
      })
      .catch(err => {
        message.error(err.response.data.content);
      });
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='flex flex-col min-h-[calc(100vh-56px)] bg-image bg-center bg-cover bg-no-repeat bg-fixed relative'>
          <div className='flex flex-1 justify-center items-center'>
            <div className='p-6 m-2 bg-white rounded-lg w-2/3 space-y-3'>
              <div>
                <Link to='/'>
                  <img
                    alt='logo'
                    src='https://media.discordapp.net/attachments/1026660684739653674/1189943300061397082/picturest_logo.png'
                    className='w-20 mx-auto'
                  />
                </Link>
              </div>
              <h1 className='font-bold text-2xl text-center text-pink-500'>Register</h1>
              <ConfigProvider locale={viVN}>
                <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <Form.Item
                      name='name'
                      label='Tên người dùng'
                      tooltip='Họ tên của bạn'
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng ghi họ tên!",
                          whitespace: true,
                        },
                        {
                          pattern: new RegExp(/^[\p{L}\s'-]+$/u),
                          message: "Họ tên nhập chưa đúng!",
                        },
                      ]}
                    >
                      <Input placeholder='Điền tên vào đây...' />
                    </Form.Item>
                    <Form.Item
                      label='Email'
                      name='email'
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                        {
                          type: "email",
                          message: "Không đúng định dạng email!",
                        },
                      ]}
                    >
                      <Input placeholder='example@gmail.com' />
                    </Form.Item>
                    <Form.Item
                      name='phone'
                      label='Số điện thoại'
                      rules={[
                        {
                          pattern: new RegExp(/^0(?!0)\d{9}$/g),
                          message: "Không đúng định dạng số điện thoại!",
                        },
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                      ]}
                    >
                      <Input placeholder='0903 123 123' />
                    </Form.Item>
                    <Form.Item
                      label='Mật khẩu'
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu phải có tối thiểu 6 kí tự!",
                        },
                      ]}
                    >
                      <Input.Password placeholder='********' />
                    </Form.Item>
                    <Form.Item
                      name='gender'
                      label='Giới tính'
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn giới tính!",
                        },
                      ]}
                    >
                      <Select placeholder='Chọn giới tính'>
                        <Select.Option value='male'>Nam</Select.Option>
                        <Select.Option value='female'>Nữ</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name='birthday'
                      label='Ngày sinh'
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày sinh!",
                        },
                      ]}
                    >
                      <DatePicker className='w-full' placeholder='Chọn ngày sinh' format='DD-MM-YYYY' />
                    </Form.Item>
                  </div>
                  <div className='mt-9'>
                    <button className='cursor-pointer text-white w-full bg-pink-500 hover:bg-pink-700 duration-300 px-6 py-2 rounded-lg'>
                      Register
                    </button>
                  </div>
                </Form>
              </ConfigProvider>
              <p className='text-center'>
                <Link to='/login' className='font-bold text-pink-500 hover:text-pink-700 duration-300'>
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
