import React, { Component } from 'react';
import Flippy , {FrontSide, BackSide} from 'react-flippy';

import './App.css';
import api from '../../services/api';
import img from '../img/card1.jpg';
const FlippyStyle = {
  maxWidth: '300px',  
  height: '360px',
  color: '#000',
  fontFamily: 'sans-serif',
  fontSize: '30px',
  justifyContent: 'center',
  textAlign: 'center',
  display:'flex',  
  margin: '20px auto 0',
  
}

export default class Main extends Component {   
  state = {
      data :{}, 
      films :[], filmsAux: []
    };
  
  componentDidMount(){
    const rd = Math.floor(Math.random() * 61)+1;
    this.loadPlanets(rd);
  }
  
  loadPlanets = async (id) => {
    const response = await api.get('/planets/'+ id);
    
    this.setState({data: response.data, films: response.data.films });
    
    if(this.state.data.films.length!== 0){
      this.loadFilms();
    }else{
      this.setState({filmsAux: response.data.films});
    }
    
    setTimeout(this.flippy.toggle(),1800);
  };
  loadFilms = async () => {   
    for(var i=0;i<=this.state.films.length-1;i++){
      const filme = await api.get(this.state.films[i]);
      //console.log(filme.data.title);
      this.state.films[i] = filme.data.title;
    }
    this.setState({filmsAux: this.state.films});
  } 
  next = () => {
    const random = Math.floor(Math.random() * 61)+1;
    this.loadPlanets(random);
  }

  render(){
    return (
      <div>
      <Flippy      
      flipOnHover={true}
      flipOnClick={false} 
      flipDirection="horizontal" // horizontal or vertical
      
      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
      
      style={FlippyStyle}
      >
    <FrontSide
      animationDuration={1000}
      style={{backgroundColor: 'orangered', borderRadius: '5px', padding:'5px'}}
    >
    <img src={img} />
    </FrontSide>
     <BackSide
     animationDuration={1000}
      style={{ backgroundColor: '#175852',borderRadius: '5px', border: '5px solid orangered' }}>    
      {      
        <article key={this.state.data.url}>
          <h2>{this.state.data.name}</h2>
          <p><strong>Population: {this.state.data.population}</strong></p>
          <p><strong>Climate: {this.state.data.climate}</strong></p>
          <p><strong>Terrain: {this.state.data.terrain}</strong></p>
          <div ><strong>Films: </strong>
          {this.state.filmsAux.map((query, i) => (
            <li key={query + i}>{query}</li>           
          ))}
          </div>
        </article> 
      }
    </BackSide>    
  </Flippy>
  <div className="btncontent">
     <a onClick={this.next}>Toggle Me!</a>
  </div>
  </div>  
    );
  }
}