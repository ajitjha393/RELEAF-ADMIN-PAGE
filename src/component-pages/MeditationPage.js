import { Container, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as ImIcons from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db from "../assets/firebase";
import Loader from "../components/Loader";
toast.configure();
const MeditationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [img, setImg] = useState("");
  const [rss, setRss] = useState("");
  const [redirect, setRedirect] = useState("");
  const [link, setLink] = useState("");
  const [support, setSupport] = useState("");

  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    db.collection("podcasts").onSnapshot((snapshot) =>
      setPodcasts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  // console.log(podcasts[0].id);

  const additionalProps = {
    required: true,
    variant: "outlined",
    fullWidth: true,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("podcasts")
      .add({
        title,
        description,
        author,
        img,
        rss,
        redirect,
        link,
        support,
      })
      .then(toast.success("Uploaded!"))
      .catch((err) => toast.error(err));
  };

  return (
    <MeditationContainer>
      <AddContainer>
        <h1>Add Podcast</h1>
        <AddForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Image"
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="RSS Link"
                      value={rss}
                      onChange={(e) => setRss(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Redirect"
                      value={redirect}
                      onChange={(e) => setRedirect(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      {...additionalProps}
                      label="Link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      variant="outlined"
                      label="Support"
                      value={support}
                      onChange={(e) => setSupport(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
          <FormBtn>Submit</FormBtn>
        </AddForm>
      </AddContainer>
      <DeleteContainer>
        <h1>Delete Podcast</h1>
        <PodcastWrapper>
          {!podcasts ? (
            <Loader />
          ) : (
            podcasts.map((podcast) => (
              <PodcastContainer>
                <PodcastTile key={podcast.id}>
                  {podcast?.data.title}
                </PodcastTile>
                <DeleteBtn
                  onClick={(event) =>
                    db.collection("podcasts").doc(podcast.id).delete()
                  }
                >
                  <ImIcons.ImCross />
                </DeleteBtn>
              </PodcastContainer>
            ))
          )}
        </PodcastWrapper>
      </DeleteContainer>
    </MeditationContainer>
  );
};

export default MeditationPage;

const MeditationContainer = styled.div`
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

const DeleteContainer = styled.div`
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

const PodcastWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 3px dashed whitesmoke;
  border-radius: 10px;
  overflow-y: scroll;
  @media screen and (max-width: 760px) {
    padding: 10px 0px;
    width: 100%;
  }
`;

const PodcastContainer = styled.div`
  display: flex;
  padding: 10px;
  height: 100px;
  border: 1px solid black;
  margin-bottom: 5px;
  border-radius: 5px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PodcastTile = styled.h3`
  flex: 1;
  font-weight: 100px;
`;

const DeleteBtn = styled.button`
  padding: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  background-color: red;
  border-radius: 50px;
`;
