import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import './SearchBar.css';

function SearchBar (props) {
    return (
        <div>
            <Paper className="root">
                <InputBase
                    className="input"
                    placeholder="Search Lost and Found"
                />
                <IconButton className="iconButton" aria-label="search">
                    <SearchIcon />
                </IconButton>
                {/* <Divider className="divider" /> */}
            </Paper>
        </div>
    )
}

export default SearchBar;