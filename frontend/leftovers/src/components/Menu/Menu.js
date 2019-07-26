import React from 'react';
import classNames from 'classnames';
import './Menu.css';

const appName = 'Lost & Found';
const postListingUrl = '/post';
const searchListingUrl = '/search';

function Menu() {
  return (
    
    <div id="header">
      <div id="titleContainer">
        <div id="titleContent" >
          <a href="/"><img src="yelp_logo_1.png" alt="logo" /></a>
          <h2><a href="/">{appName} </a> </h2>
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
