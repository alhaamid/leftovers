import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import './SearchBar.css';

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
    }

    enterPressed (event) {
        const code = event.keyCode || event.which;
        const searchQuery = event.target.value;
        if(code === 13 && searchQuery != '') { 
            this.props.onSearch(searchQuery);
        } 
    }
    
    render () {
        return (
            <div>
                <Paper className="root">
                    <InputBase
                        className="input"
                        placeholder="Search Lost and Found"
                        onKeyPress={this.enterPressed.bind(this)}
                    />
                    <IconButton className="iconButton" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
        )
    }
}

export default SearchBar;