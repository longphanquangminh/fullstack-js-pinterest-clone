import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/HomePage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./index.css";
import ImageDetail from "./pages/ImageDetail";
import LoginPage from "./pages/LoginPage";
import { Camera, CircleUser, Cog, Home } from "lucide-react";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import { useSelector } from "react-redux";
import SettingPage from "./pages/SettingPage";
import Profile from "./pages/Profile";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";

setupIonicReact();

const App: React.FC = () => {
  const { user } = useSelector((state: any) => {
    return state.userSlice;
  });
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path='/home'>
              <HomePage />
            </Route>
            <Route exact path='/pictures/:pictureId'>
              <ImageDetail />
            </Route>
            <Route exact path='/login'>
              {user ? <Redirect to='/' /> : <LoginPage />}
            </Route>
            <Route exact path='/register'>
              {user ? <Redirect to='/' /> : <RegisterPage />}
            </Route>
            <Route exact path='/post'>
              <PostPage />
            </Route>
            <Route exact path='/settings'>
              <SettingPage />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/users/:userId'>
              <UserPage />
            </Route>
            <Route exact path='/search/:search'>
              <SearchPage />
            </Route>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='home' href='/home'>
              <Home />
              {/* <IonLabel>Home</IonLabel> */}
            </IonTabButton>
            <IonTabButton tab='post' href='/post'>
              <Camera />
              {/* <IonLabel>Post</IonLabel> */}
            </IonTabButton>
            {!user ? (
              <IonTabButton tab='login' href='/login'>
                <CircleUser />
              </IonTabButton>
            ) : (
              <IonTabButton tab='login' href='/settings'>
                <Cog />
              </IonTabButton>
            )}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
