import { IonContent, IonPage } from "@ionic/react";
import { Avatar, List, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { API_URL_IMG, DEFAULT_IMG } from "../constants/variables";
import { Archive, BookUser, CircleUser, LogOut } from "lucide-react";
import { setLogin } from "../redux/userSlice";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function SettingPage() {
  const { user } = useSelector((state: any) => {
    return state.userSlice;
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    message.success("Contribute successfully!");
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(setLogin(null));
    message.success("Logout successfully!");
    history.push("/");
  };

  const data = [
    {
      title: "Your feed",
      info: "Your detail information",
      logo: <CircleUser />,
      onClick: () => history.push(`/users/${user.nguoiDungId}`),
    },
    {
      title: "Profile",
      info: "Edit information, upload avatar, change password...",
      logo: <BookUser />,
      onClick: () => history.push(`/profile`),
    },
    {
      title: "Contribution",
      info: "Send ideas to Picturest",
      logo: <Archive />,
      onClick: () => showModal(),
    },

    {
      title: "Logout",
      info: "Exit account",
      logo: <LogOut />,
      onClick: logout,
    },
  ];
  return (
    <IonPage>
      <IonContent fullscreen>
        {isModalOpen && (
          <Modal title='Contribution' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className='space-y-6'>
              <>
                <Editor
                  apiKey='yj0g9clfg2pxo1f5xv6jrjvou0u2xj3lhi3uu4c2nl2sgya7'
                  initialValue=''
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </>
            </div>
          </Modal>
        )}
        {user && user.token ? (
          <div className='mx-auto w-[95%] py-6 space-y-6'>
            <div className='flex justify-center items-center'>
              <img
                className='mx-auto w-48 h-48 object-cover rounded-full'
                src={user && user?.anhDaiDien !== "" ? `${API_URL_IMG}/${user?.anhDaiDien}` : DEFAULT_IMG}
                alt=''
                onError={(e: any) => (e.target.src = DEFAULT_IMG)}
              />
            </div>
            <p className='text-center font-bold text-2xl'>{user.hoTen ?? "User"}</p>
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item onClick={item.onClick} className='cursor-pointer hover:bg-gray-300 duration-300 rounded-lg'>
                  <List.Item.Meta className='p-3' avatar={item.logo} title={<a href='https://ant.design'>{item.title}</a>} description={item.info} />
                </List.Item>
              )}
            />
          </div>
        ) : (
          <div className='w-[95%] mx-auto w-full h-[calc(100vh-56px)] flex justify-center items-center'>
            <div className='space-y-12'>
              <Link to='/'>
                <img
                  alt='logo'
                  src='https://media.discordapp.net/attachments/1026660684739653674/1189943300061397082/picturest_logo.png'
                  className='w-56 mx-auto'
                />
              </Link>
              <p className='text-3xl font-bold'>Please login to use this feature!</p>
              <div className='flex justify-center items-center'>
                <Link className='text-center text-[#ec4899]' to='/login'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
