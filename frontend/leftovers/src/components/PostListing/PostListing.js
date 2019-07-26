import React from 'react';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import findController from '../../services/findController';

import './PostListing.css';

export default class PostListing extends React.Component {

  constructor(props) {
    super(props);

    /*
    this.classes = makeStyles(theme => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#d32323",
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      post_button: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#d32323",
        '&:hover': {
          backgroundColor: red[900],
        },
      },
      upload_button: {
        backgroundColor: "#d32323",
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: red[900],
        },
      },
    }));
    */

    this.findController = new findController();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    var object = {};
    data.forEach((value, key) => { object[key] = value });

    this.findController.postListing(object)
      .then(newListing => {
        alert('Posted!!')
      })

  }

  render() {
    return (
      <div className="page-container">
        <Container component="main" maxWidth="xs">
          {/* <div className={this.classes.paper}> */}
          <div>
            <Typography component="h1" variant="h5">
              Post a New Listing
          </Typography>
            {/* <form className={this.classes.form} onSubmit={this.handleSubmit}> */}
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Listing Description"
                    name="description"
                    multiline={true}
                    rows={4}
                    rowsMax={8}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="raised"
                      component="span"
                      // className={this.classes.upload_button}
                    >
                      Upload Images
                  </Button>
                  </label>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // className={this.classes.post_button}
              >
                Post
            </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
};