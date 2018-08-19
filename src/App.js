import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import { cards } from './data';
import Fuse from 'fuse.js';

const Wrapper = styled.div`
margin:0;
width:100%;
height: 100vh;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards,
      searchString: ''
    };
  }

  componentDidMount() {

    const options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      findAllMatches: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "productName",
        "shops",
        "productFamily",
        "brand"
    ]
    };

    this.searchIndex = new Fuse(cards, options);
    
  }

  handleSearch = (searchText) => {
    if(searchText) {
      this.setState({
        cards: this.searchIndex.search(searchText)
      });
    } else {
      this.setState({
        cards
      });
    }

  }
  render() {
    return (
      <Wrapper>
        <div className="header">
          <div className="header-container">
            <h2>Plastic-Free</h2>
            <div className="search-container">
            <label htmlFor="search"></label>
            <input type="text" id="search" onChange={(event) => this.handleSearch(event.target.value)}/>
            <button className="search"></button>
            </div>
            
          </div>
          <button className="menu__item">Home</button>
          <button className="menu__item">About</button>
          <button className="menu__item">Info</button>
        </div>
        <div className="container">
          {this.state.cards.map((card,i) => {
            return (
              <div className="card" key={i}>
                <img className="card__img" src={card.img} alt={card.productName} />
                <div className="card__details">
                  <h3 className="product__title">{card.productName}</h3>
                  <p className="card__family">{card.productFamily}</p>
                  <p className="card__brand">{card.brand}</p>
                  <p className="card__brand">{card.shops&& card.shops.join(', ')}</p>
                </div>
              </div>
            );
          })}
        </div>
        <footer className="footer">
          <p className="footer-text">
            Plastic-Free is a free and open source{" "}
            <a href="https://github.com/niloomotita" className="link">
              {" "}
              (github){" "}
            </a>
            service that helps you pick plastic-free packaging while shopping
            <a
              href="https://github.com/niloomotita/"
              target="blank"
              className="link"
            >
              {" "}
              Niloo
            </a>{" "}
            and{" "}
            <a href="https://github.com/omidfi" target="blank" className="link">
              Omid.
            </a>{" "}
          </p>
        </footer>
      </Wrapper>
    );
  }
}

export default App;
