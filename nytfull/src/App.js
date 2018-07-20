import React, { Component } from 'react';
import './App.css';
import axios from "axios"

class App extends Component {

  state = {
    searchTerm: "",
    beginYear: "",
    endYear: "",
    results: [],
    saved: []
}

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value });
  };

  getArticles = (x,y,z) => {
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=f7e0a1ac9968401ea68df4308d0b720e&q=${x}&begin_date=${y}&end_date=${z}`
    let result = []
    if (this.state.searchTerm === "") {
      alert("Please enter a search query")
    } else if (this.state.beginYear === "") {
      alert("Please enter a beginning year")
    } else if (this.state.endYear === "") {
      alert("Please enter a ending year")
    } else {
      axios.get(url)
      .then(res => {
        console.log(res.data.response.docs)
       for (var i = 0; i < res.data.response.docs.length; i++) {
         
            let obj = {
             title: res.data.response.docs[i].headline.main,
             date: res.data.response.docs[i].pub_date,
             url: res.data.response.docs[i].web_url,
             snippet: res.data.response.docs[i].snippet
           }
           result.push(obj)
           this.setState({ results: result }) 
       }
      })
    }
  }

  arr = []
  id;
  savedArticles = (a, b, c, d) => {

    let obj = {
      id: this.id,
      title: a,
      snippet: b,
      url: c,
      date: d
      }
      this.arr.push(obj)
      this.id = this.arr.indexOf(obj)
    this.setState({ saved: this.arr })
    console.log(this.state.saved)
  }

  removeArticle = (x) => {
    let index = x - 1
    console.log(this.state.saved)
    this.state.saved.splice(index)
  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
            <h1 className="App-title">New York Times Article Search</h1>
          </header>
          <p className="App-intro">
            Search For and Save Your favorite New York Times Articles
          </p>
          <form className="search">
            <div className="form-group">
              <label htmlFor="story">News Story:</label>
              <input
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                name="searchTerm"
                list="articles"
                type="text"
                className="form-control"
                placeholder="Search for articles"
                id="article"
              />
            </div>
        </form>
        <form className="search">
            <div className="form-group">
              <label htmlFor="story">Begin Year:</label>
              <input
                value={this.state.beginYear}
                onChange={this.handleInputChange}
                name="beginYear"
                list="begin"
                type="text"
                className="form-control"
                placeholder="Format: YYYYMMDD"
                id="begin"
              />
            </div>
        </form>
        <form className="search">
            <div className="form-group">
              <label htmlFor="story">End Year:</label>
              <input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                list="end"
                type="text"
                className="form-control"
                placeholder="Format: YYYYMMDD"
                id="end"
              />
            </div>
        </form>

  <button type="submit" onClick={() => {this.getArticles(this.state.searchTerm, this.state.beginYear, this.state.endYear)}}>Search</button>

<div class="container">
  <div class="row">
    <div class="col-md-6">
          <br />
          <div>
            <strong>
              <h2>
                SEARCH RESULTS:
              </h2>
            </strong>
          </div>
              <ul>
                {this.state.results.map(data => 
                <p key={data.url}> <strong>Title:</strong> {data.title} <br /> <strong>Article Snippet:</strong> {data.snippet} <br /> <strong>URL:</strong> {data.url} <br /> <strong>Publication Date:</strong> {data.date} <br /> <button type="submit" onClick={() => {this.savedArticles(data.title, data.snippet, data.url, data.date)}}>Save Article</button> <br /></p>
                )}
                
              </ul>
     </div>

    <div class="col-md-6">
    <div>
            <strong>
              <h2>
                SAVED ARTICLES:
              </h2>
            </strong>
          </div>
              <ul>
                {this.state.saved.map(data => 
                <p key={data.url}> <strong>Title:</strong> {data.title} <br /> <strong>Article Snippet:</strong> {data.snippet} <br /> <strong>URL:</strong> {data.url} <br /> <strong>Publication Date:</strong> {data.date} <br /> <button type="submit" onClick={() => {this.removeArticle(data.id)}}>Delete Article</button> <br /></p>
                )}
              </ul>
    </div>
    </div>
</div>
      </div>
    );
  }
}

export default App;
