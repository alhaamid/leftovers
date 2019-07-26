import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import './Listing.css';

const ColorButton = withStyles(theme => ({
  root: {
    backgroundColor: "#d32323",
    '&:hover': {
      backgroundColor: red[900],
    },
  },
}))(Button);

class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  claim() {
    this.props.claim(this.props._id);
  }

  enterPressed(event) {
    const code = event.keyCode || event.which;
    const comment = event.target.value;
    if (code === 13) {
      if (comment.length > 0) {
        console.log(comment);
        this.props.post_comment(this.props._id, this.props.comments, comment);
        event.target.value = '';
      }
    }
  }

  render() {
    return (
      // <div className="listing">
      //   <div className="image-container">

      //     <Card className="yp-card1">
      //       <CardActionArea>
      //         <CardMedia
      //           component="img"
      //           image={this.props.imageUrl}
      //           title={this.props.title}
      //           className="yp-image"
      //         />
      //       </CardActionArea>
      //     </Card>

      //   </div>

        
      
      
      
      
      
      
      // <div className="description-container">
        //   <Card className="yp-card">
        //     <CardActionArea>
        //       <CardContent>
        //         <Typography gutterBottom variant="h5">
        //           {this.props.title}
        //         </Typography>
        //         <Typography component="p">
        //           Location: {this.props.location}
        //         </Typography>
        //         <Typography component="p" color="textSecondary">
        //           Description: {this.props.description}
        //         </Typography>
        //       </CardContent>
        //     </CardActionArea>
        //     <CardActions>
        //       <Button size="medium" variant="contained" onClick={this.claim.bind(this)}>
        //         <Typography>
        //           Claim
        //         </Typography>
        //       </Button>
        //     </CardActions>
        //     <InputBase
        //       placeholder="Add a comment"
        //       onKeyPress={this.enterPressed.bind(this)}
        //     />

        //     {this.props.comments.map((comment, index) => {
        //       return (
        //         <div>
        //           <p
        //             key={index}>
        //             {comment}
        //           </p>
        //         </div>
        //       )
        //     })}


      <Card className="yp-card">
        <CardActionArea>
          <CardMedia
            component="img"
            image={this.props.imageUrl}
            title={this.props.title}
            className="yp-image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {this.props.title}
            </Typography>
            {/* <Typography component="p" color="textSecondary">
              Location: {this.props.location}
            </Typography> */}
            <Typography component="p" color="textSecondary">
              Description: {this.props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button size="medium" variant="contained" onClick={this.claim.bind(this)}>
            <Typography>
              Claim as yours
            </Typography>
          </Button> */}
          <ColorButton 
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.claim.bind(this)}>
            Claim as yours
          </ColorButton>
        </CardActions>

        {this.props.comments.length > 0 && (
          <div className="comments-section">
            <InputBase
              placeholder="Add a comment"
              onKeyPress={this.enterPressed.bind(this)}
            />
            {this.props.comments.map((comment, index) => {
              return (
                <p 
                  key={index}>
                  {comment}
                </p>
              )
            })}
          </div>
        )}

        {this.props.comments.length == 0 && (
          <div className="comments-section">
            <InputBase
              placeholder="Add a comment"
              onKeyPress={this.enterPressed.bind(this)}
            />
            <h5>No comments so far. Be the first to comment.</h5>
          </div>
        )}

      </Card>
    )
  }
}

export default Listing;