import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchDropdown from './SearchDropdown.jsx';

const Search = (props) => (
  <div className="search">
  <form>
    <div className="search-title">So, what's in your pantry today?</div><br/>
    {/* <ReactTags tags={[{id: 1, text: "hello"}, {id: 2, text:"goodbye"}]}
      suggestions={null}
      handleDelete={null}
      handleAddition={null}
      handleDrag={null}/> */}
      <SearchDropdown title={props.appState.searchMode} setStore={props.setStore} className="search-dropdown" />
    <FormControl type="text" className="search-input" type="text" onChange={(e) => {props.setStore({query: e.target.value})}} />
    <Button inverse className="search-button" onClick={props.clickHandler}>Search</Button>
   </form>
  </div>
)




export default Search;
