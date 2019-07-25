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
        this.setState({
          allListings: this.findController.search(query)
        });
    }
  }

  render () {
    return (
      <div className="page-container">
        <div className="search-bar">
          <SearchBar search={this.search} />
        </div>
  
        {this.state.allListings.map((listing, index) => {
          return <Listing
            key={index}
            imageUrl={listing.imageUrl}
            title={listing.title}
            location={listing.location}
            description={listing.description}
          />
        })}
      </div>
    );
  }
}

export default SearchListing;
