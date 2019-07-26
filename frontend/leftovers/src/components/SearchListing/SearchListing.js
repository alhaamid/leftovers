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

    this.findController = new findController();

    this.state = {
      allListings: [],
      query: '',
    };

    this.refreshListings();
  }

  refreshListings () {
    this.findController.getAvailableListings()
    .then(listings => {
      this.setState({
        allListings: listings,
      })
    })
  }

  componentDidMount () {
    this.refreshListings();
  }

  search (query) {
    this.setState({
      query: query,
    });
    if (query == '') {
      this.refreshListings();
    } else {
      this.findController.search(query)
      .then(result => {
        this.setState({
          allListings: result,
        });
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

  render () {
    return (
      <div className="page-container">
        <div className="search-bar">
          <SearchBar search={this.search} />
        </div>
  
        {this.state.allListings.map((listing, index) => {
          return (
            <Listing
              key={index}
              _id={listing._id}
              imageUrl={listing.imageUrl}
              title={listing.title}
              location={listing.location}
              description={listing.description}
              claim={this.claim}
            />
          )
        })}
      </div>
    );
  }
}

export default SearchListing;
