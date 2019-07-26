import React from 'react';
import classNames from 'classnames';
import './Menu.css';

const appName = 'Leftovers';
const postListingUrl = '/post';
const searchListingUrl = '/search';

function Menu() {
  return (
    
    <div id="header">
      <div id="titleContainer">
        <div id="titleContent">
          <h2> {appName} </h2>
        </div>
      </div>

      <div id="navbarContainer">
        <div id="navbarContent">

          <div className={classNames('flat')}>
            <div title="Search Listings" className={classNames('linkBox')}>
              <h3><a href={searchListingUrl}>Search Listings</a></h3>
            </div>

            <div title="Post Listing" className={classNames('linkBox')}>
              <h3><a href={postListingUrl}>Post Listing</a></h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Menu;