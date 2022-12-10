import {Component} from 'react';
import PropTypes from 'prop-types';
import {SearchFormStyled,SearchFormButtonStyled} from './SearchForm.styled';
import SearchFormInput from './SearchFormInput/SearchFormInput';
import {FiSearch} from "react-icons/fi";

class SearchForm  extends Component{
    state={
      text:'', 
    };

handleChange = event =>{
    this.setState({text:event.currentTarget.value});
}
handleSubmit =event=>{
    event.preventDefault();
    this.props.onSubmit(this.state.text);
}
 render(){
    return(
        <SearchFormStyled onSubmit={this.handleSubmit}>
        <SearchFormButtonStyled type="submit">
        <FiSearch size="28" />
        </SearchFormButtonStyled>
        <SearchFormInput
          onChange={this.handleChange}
          value={this.state.text}
        />
      </SearchFormStyled>
    )
 }
}
export default SearchForm;

SearchForm.propType={
    text: PropTypes.string.isRequired,
    onSubmit:PropTypes.func.isRequired,
}