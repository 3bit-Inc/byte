import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchDropdown from './SearchDropdown.jsx';

const Search = (props) => (
  <div className="search">
  <form>
    <div className="search-title">So, what's in your pantry today?</div><br/>
    <ReactTags tags={props.tags}
      handleDelete={props.handleTagDelete}
      handleAddition={props.handleTagAdd}
    />
    <Button className="search-button" onClick={props.clickHandler}>Search</Button>
   </form>
  </div>
)




export default Search;
