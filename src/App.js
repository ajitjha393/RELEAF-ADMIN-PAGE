import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import db, { auth } from "./assets/firebase";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ExpertPage from "./component-pages/ExpertPage";
import ChatPage from "./component-pages/ChatPage";
import firebase from "firebase";
import Loader from "./components/Loader";
import MeditationPage from "./component-pages/MeditationPage";
import ChatroomPage from "./component-pages/ChatroomPage";
const engine = new Styletron();

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          displayName: "Releaf Support",
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/help-releaf.appspot.com/o/releaf.jpg?alt=media&token=ad62568e-f7fa-4660-951d-93995eeb2a40",
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loader />;

  if (!user) return <Login />;

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="App">
          <BrowserRouter>
            <Sidebar />
            <Switch>
              <Route exact path="/experts" component={ExpertPage} />
              <Route exact path="/messages" component={ChatPage} />
              <Route exact path="/meditation" component={MeditationPage} />
              <Route exact path="/chatroom" component={ChatroomPage} />
              <Route exact path="/chatroom/:id" component={ChatroomPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
