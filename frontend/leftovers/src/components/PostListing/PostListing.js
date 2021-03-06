import React from 'react';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import findController from '../../services/findController';
import { storage } from '../../firebase';
import Snackbar from '@material-ui/core/Snackbar';

import './PostListing.css';

const ColorButton = withStyles(theme => ({
  root: {
    backgroundColor: "#d32323",
    '&:hover': {
      backgroundColor: red[900],
    },
  },
}))(Button);

export default class PostListing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFile: '',
      open: false,
      title: '',
      description: ''
    }

    this.findController = new findController();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleInputChange(event) {
    this.setState({
        title: event.target.value
    })
  }

  handleDescriptionInputChange(event) {
    this.setState({
        description: event.target.value
    })
  }

  cleanFormInputFields() {
      this.setState({
          title: '',
          description: '',
      })
  }

  updateFile = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  uploadFile = () => {
    return new Promise((resolve, reject) => {
      const file = this.state.selectedFile;
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
          reject(error);
        },
        (complete) => {
          storage.ref('images').child(file.name).getDownloadURL()
            .then(url => {
              resolve(url);
            })
            .catch(err => reject(err))
        })
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    let object = {};
    this.uploadFile()
      .then(url => {
        object['imageUrl'] = url;

        data.forEach((value, key) => { object[key] = value });
        this.findController.postListing(object)
          .then(newListing => {
            // alert('Posted!!')
            this.cleanFormInputFields();
            this.setState({open: true});
          })
      })
      .catch(err => {
        console.log(err);

        data.forEach((value, key) => { object[key] = value });
        this.findController.postListing(object)
          .then(newListing => {
            this.cleanFormInputFields();
            this.setState({open: true});
          })
      })
  }

  handleClose(event, reason) {
    this.setState({open: false});
  }

  render() {
    return (
      <div className="page-container">
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h1" variant="h5">
              Post a New Listing
          </Typography>
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
                    value={this.state.title} 
                    onChange={this.handleTitleInputChange.bind(this)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description e.g. location found"
                    name="description"
                    multiline={true}
                    rows={4}
                    rowsMax={8}
                    value={this.state.description} 
                    onChange={this.handleDescriptionInputChange.bind(this)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={this.updateFile}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      style={{ marginBottom: '15px' }}
                    >
                      Upload Image
                  </Button>
                  </label>
                </Grid>
              </Grid>
              <ColorButton 
                type="submit"
                fullWidth
                variant="contained" color="primary">
                Post
              </ColorButton>
            </form>
          </div>
        </Container>


        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose.bind(this)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>Posted</span>}
          color="green"
        />

      </div>
    );
  }
};