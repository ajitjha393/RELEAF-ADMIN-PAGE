import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import db, { auth } from "./assets/firebase";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import Spinner from "./components/UI/Spinner/Spinner";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ExpertPage from "./component-pages/ExpertPage";
import ChatPage from "./component-pages/ChatPage";
import firebase from "firebase";
const engine = new Styletron();

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          displayName: "Releaf Support",
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (!user) return <Login />;
  if (loading) return <Spinner />;
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="App">
          <BrowserRouter>
            <Sidebar />
            <Switch>
              <Route exact path="/experts" component={ExpertPage} />
              <Route exact path="/messages" component={ChatPage} />
              <Route exact path="/chat/:id" component={ChatPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
