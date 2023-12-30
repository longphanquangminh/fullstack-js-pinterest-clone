import { IonContent, IonPage } from "@ionic/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PostPage() {
  const { user } = useSelector((state: any) => {
    return state.userSlice;
  });
  return (
    <IonPage>
      <IonContent fullscreen>
        {user && user.token ? (
          <div>PostPage</div>
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
