import React from "react";
import { auth, provider } from "../../assets/firebase";
import styled from "styled-components";
import logo from "../../assets/img/releaf.jpg";
import { Button } from "@material-ui/core";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <LoginContainer>
        <Logo src={logo} />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  margin: 0 auto;
  width: 60%;
  height: 50%;
  padding: 10px;
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
