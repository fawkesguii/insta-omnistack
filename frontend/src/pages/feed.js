import React, { Component } from 'react';
import io from 'socket.io-client';

// Services imports
import api from '../services/api';

// CSS Imports
import '../assets/css/feed.css';

// Imagens Impors
import more from '../assets/images/more.svg';
import like from '../assets/images/like.svg';
import comment from '../assets/images/comment.svg';
import send from '../assets/images/send.svg';

export default class pages extends Component {
    state = {
        feed:[],
    };

    async componentDidMount() {
        this.registerToSocket();
        console.log(api.defaults.baseURL);
        const response = await api.get('posts/list');

        this.setState({feed: response.data});
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        // mensagens retornadas [posts,likes]
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ... this.state.feed ]});
        });

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost? likedPost: post)
            });
        });
    }

    handleLike = id => {
        api.post(`posts/${id}/like`);
    }

    render() {
        return (
            <section id="post-list">
                {this.state.feed.map(post =>(
                    
                        <article key={ post._id }>
                            <header>
                                <div className="user-info">
                                    <span> { post.author } </span>
                                    <span className="place"> { post.place } </span>
                                </div>
                                
                                <img src={ more } alt="Mais" />
                            </header>
                            
                            <img src={`http://localhost:3333/files/${post.image}`} alt=""/>

                            <footer>
                                <div className="actions">
                                    <button type="button" onClick={ () => this.handleLike(post._id) }>
                                        <img src={like} alt=""/>
                                    </button>
                                    <img src={comment} alt=""/>
                                    <img src={send} alt=""/>
                                </div>

                                <strong> { post.likes } curtidas</strong>

                                <p> 
                                    { post.description }
                                    <span> { post.hashtags } </span>
                                </p>
                            </footer>
                        </article>

                ))}
            </section>
        );
    }
}
