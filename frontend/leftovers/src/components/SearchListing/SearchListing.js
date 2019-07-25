import React from 'react';
// import classNames from 'classnames';
import Listing from '../Listing/Listing';
import SearchBar from './SearchBar/SearchBar';
import './SearchListing.css';

function getAllListings() {
  return [
    {
      imageUrl: "airpods.jpeg",
      location: "8F",
      title: "airpods",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
    },
    {
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51z376z5iBL._SL1200_.jpg",
      location: "8F",
      title: "airpods",
      description: "These are MY headphones!",
    },
  ]
}

class SearchListing extends React.Component {
  allListings = [];

  constructor (props) {
    super(props);
    this.allListings = getAllListings();
  }

  render () {
    return (
      <div className="page-container">
        <div className="search-bar">
          <SearchBar />
        </div>
  
        {this.allListings.map((listing, index) => {
          return <Listing 
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
