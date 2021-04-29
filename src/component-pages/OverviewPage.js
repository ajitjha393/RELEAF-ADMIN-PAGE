import React from "react";
import { Container, Grid, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import db from "../assets/firebase";
import firebase from "firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const OverviewPage = () => {
  const additionalProps = {
    required: true,
    variant: "outlined",
    fullWidth: true,
  };

  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("updates")
      .add({
        Heading: heading,
        Content: content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(toast.success("Uploaded!"))
      .catch((err) => toast.error(err));

    setContent("");
    setHeading("");
  };
  return (
    <OverviewContainer>
      <AddContainer>
        <h1>Add Update</h1>
        <AddForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Heading"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
          <FormBtn>Submit</FormBtn>
        </AddForm>
      </AddContainer>
    </OverviewContainer>
  );
};

export default OverviewPage;
const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddContainer = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 760px) {
    padding: 10px;
  }
`;

const AddForm = styled.form`
  width: 90%;
  padding: 20px;
  /* margin: 0 auto; */

  @media screen and (max-width: 760px) {
    padding: 10px 0px;
    width: 100%;
  }
`;

const FormBtn = styled.button`
  display: flex;
  width: 300px;
  cursor: pointer;
  font-size: 20px;
  outline: none;
  border: none;
  padding: 5px;
  margin: 10px auto;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
