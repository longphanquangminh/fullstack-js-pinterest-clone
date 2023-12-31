import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import { DatePicker, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { userServ } from "../api/api";

export default function UserPage() {
  const { userId } = useParams<any>();
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };
  const history = useHistory();
  const onFinish = async (values: any) => {
    try {
      const processValues = {
        ...values,
        tuoi: new Date().getFullYear() - new Date(values.birthday).getFullYear(),
      };
      delete processValues.birthday;

      await userServ.signup(processValues);

      message.success("Register successfully, please login!");
      history.push("/login");
    } catch (err: any) {
      console.error("Error:", err);
      message.error(err.response.data.message);
    }
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='w-[95%] mx-auto py-6'>
          <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
              <Form.Item
                name='hoTen'
                label='Name'
                tooltip='Your full name'
                rules={[
                  {
                    required: true,
                    message: "Please type your full name",
                    whitespace: true,
                  },
                  {
                    pattern: new RegExp(/^[\p{L}\s'-]+$/u),
                    message: "Your name does not have right format",
                  },
                ]}
              >
                <Input placeholder='Input name here' />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: "Please type your email!",
                  },
                  {
                    type: "email",
                    message: "Invalid email format",
                  },
                ]}
              >
                <Input placeholder='example@gmail.com' />
              </Form.Item>
              <Form.Item
                label='Password'
                name='matKhau'
                rules={[
                  {
                    required: true,
                    message: "Please type your password!",
                  },
                  {
                    min: 6,
                    message: "Password must have at least 6 characters",
                  },
                ]}
              >
                <Input.Password placeholder='********' />
              </Form.Item>
              <Form.Item
                name='birthday'
                label='Birthday'
                rules={[
                  {
                    required: true,
                    message: "Please select your birthday!",
                  },
                ]}
              >
                <DatePicker className='w-full' placeholder='Choose date' format='DD-MM-YYYY' />
              </Form.Item>
            </div>
            <div className='mt-9'>
              <button
                type='button'
                onClick={() => form.submit()}
                className='cursor-pointer text-white w-full bg-pink-500 hover:bg-pink-700 duration-300 px-6 py-2 rounded-lg'
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      </IonContent>
    </IonPage>
  );
}
