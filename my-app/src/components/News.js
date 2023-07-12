import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'science',
  }

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }

  constructor(){
    super();
    // console.log("Hello, I am Constructor from News Component")
    this.state = {
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0,
    }
  }

  async componentDidMount(){
    // console.log("cmd")
    // this method run after the render() method is rendered
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8cbc832c4fb04733bc77ad8754a3d4c9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false,});
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8cbc832c4fb04733bc77ad8754a3d4c9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  }

  handleNextClick = async () => {
    console.log("Next");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
      console.log("are ooo bhaiya age page hiii nahi he be..")
    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8cbc832c4fb04733bc77ad8754a3d4c9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  }
  
  render() { 
    return (
      <div className='container my-3'>
          <h2 className='mb-3 text-center'>NewsMonkey - Top Headlines</h2>
          {this.state.loading && <Spinner/>}
          <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                 <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,79):''} imageUrl={element.urlToImage} newsUrl={element.url} />
          </div>
          })}
          </div>
          <div className="container d-flex justify-content-between my-3">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
    )
  }
}

export default News