import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Listing.css';

class Listing extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="listing">
        <div className="image-container">

          <Card className="yp-card">
            <CardActionArea>
              <CardMedia
                component="img"
                image={this.props.imageUrl}
                title={this.props.title}
                className="yp-image"
              />
            </CardActionArea>
            <CardActions>
              <Button size="medium" variant="contained">
                <Typography>
                  Claim as yours
                </Typography>
              </Button>
            </CardActions>
          </Card>

        </div>
        
        <div className="description-container">  
          <Card className="yp-card">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {this.props.title}
                </Typography>
                <Typography component="p" color="textSecondary">
                  Location: {this.props.location}
                </Typography>
                <Typography component="p" color="textSecondary">
                  Description: {this.props.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>

      // <Card className="yp-card">
      //   <CardActionArea>
      //     <CardMedia
      //       component="img"
      //       image={this.props.imageUrl}
      //       title={this.props.title}
      //       className="yp-image"
      //     />
      //     <CardContent>
      //       <Typography gutterBottom variant="h5">
      //         {this.props.title}
      //       </Typography>
      //       <Typography component="p" color="textSecondary">
      //         Location: {this.props.location}
      //       </Typography>
      //       <Typography component="p" color="textSecondary">
      //         Description: {this.props.description}
      //       </Typography>
      //     </CardContent>
      //   </CardActionArea>
      //   <CardActions>
      //     <Button size="medium" variant="contained">
      //       <Typography>
      //         Claim as yours
      //       </Typography>
      //     </Button>
      //   </CardActions>
      // </Card>
    )
  }
}

export default Listing;