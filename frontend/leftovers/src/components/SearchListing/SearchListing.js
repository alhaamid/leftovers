import React from 'react';
import findController from '../../services/findController';
import Listing from '../Listing/Listing';
import SearchBar from './SearchBar/SearchBar';

import './SearchListing.css';

class SearchListing extends React.Component {

  constructor (props) {
    super(props);
    this.search = this.search.bind(this);

    this.findController = new findController();

    this.state = {
      allListings: [],
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

  }

  render () {
    return (
      <div className="page-container">
        <div className="search-bar">
          <SearchBar search={this.search} />
        </div>
  
        {this.state.allListings.map((listing, index) => {
          return (
            <div>
              <Listing
                key={index}
                id={listing._id}
                imageUrl={listing.imageUrl}
                title={listing.title}
                location={listing.location}
                description={listing.description}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

export default SearchListing;
