import React from 'react';
import findController from '../../services/findController';
import Listing from '../Listing/Listing';
import SearchBar from './SearchBar/SearchBar';

import './SearchListing.css';

class SearchListing extends React.Component {

  constructor (props) {
    super(props);
    this.search = this.search.bind(this);
    this.claim = this.claim.bind(this);
    this.post_comment = this.post_comment.bind(this);

    this.findController = new findController();

    this.state = {
      allListings: [],
      query: '',
    };

    this.refreshListings();
  }

  mySetState (newState) {
    this.setState(newState);

    this.setState({
      allListings: this.sort_by_key(this.state.allListings, 'dateCreated'),
    })
  }

  refreshListings () {
    this.findController.getAvailableListings()
    .then(listings => {
      this.mySetState({allListings: listings,})
    })
  }

  componentDidMount () {
    this.refreshListings();
  }

  search (query) {
    this.mySetState({query: query,});
    if (query == '') {
      this.refreshListings();
    } else {
      this.findController.search(query)
      .then(result => {
        this.mySetState({allListings: result,});
      })
    }
  }

  claim (listingId) {
    this.findController.putListing(listingId, {
      isClaimed: true,
    })
    .then(__ => {
      this.search(this.state.query);
    })
  }

  sort_by_key (array, key) {
    return array.sort( (a, b) => {
      var x = a[key]; var y = b[key];
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
  }

  prepend(value, array) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
  }

  post_comment(listingId, listingComments, comment) {
    let updatedComments = this.prepend(comment, listingComments);
    
    this.findController.putListing(listingId, {comments: updatedComments})
    .then(_ => {
      this.search(this.state.query)
    })
  }

  render () {
    return (
      <div className="page-container">
        <div className="search-bar">
          <SearchBar search={this.search} />
        </div>
  
        {this.state.allListings.length > 0 && (this.state.allListings.map((listing, index) => {
          return (
            <Listing
              key={index}
              _id={listing._id}
              imageUrl={listing.imageUrl}
              title={listing.title}
              location={listing.location}
              description={listing.description}
              claim={this.claim}
              comments={listing.comments}
              post_comment={this.post_comment}
            />
          )
        }))}

        {this.state.allListings.length == 0 && (
          <h2>
            No available listings
          </h2>
        )}
      </div>
    );
  }
}

export default SearchListing;
