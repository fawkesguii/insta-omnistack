import React, { Component } from 'react';

// Service Imports
import api from '../services/api';

// CSS Imports
import '../assets/css/new.css';

export default class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('image',this.state.image);
    data.append('author',this.state.author);
    data.append('place',this.state.place);
    data.append('description',this.state.description);
    data.append('hashtags',this.state.hashtags);

    (async () => {
      await api.post('posts/create',data);
    })();
    
    

    this.props.history.push('/');
  }

  handleImage = e => {
    this.setState({ image: e.target.files[0] });
  }

  handleChange = e => {
    this.setState({ [e.target.name]:e.target.value });
  }

  render() {
    return (
        <form id="new-post" onSubmit={ this.handleSubmit }>
          <input type="file" onChange={ this.handleImage }/>

          <input type="text" name="author" 
            placeholder='Autor do Post' 
            onChange={ this.handleChange} 
            value={ this.state.author }/>

          <input type="text" name="place" 
            placeholder='place do Post' 
            onChange={ this.handleChange} 
            value={ this.state.place }/>

          <input type="text" name="description" 
            placeholder='description do Post' 
            onChange={ this.handleChange} 
            value={ this.state.description }/>

          <input type="text" name="hashtags" 
            placeholder='hashtags do Post' 
            onChange={ this.handleChange} 
            value={ this.state.hashtags }/>
          
          <button type="submit">Enviar</button>
        </form>
    );
  }
}
