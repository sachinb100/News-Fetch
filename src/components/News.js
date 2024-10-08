import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    constructor(){
    super();
    console.log("News constructor");
    this.state={
      articles:[],
      loading:false,
      page:1
    }
    Document.title=`${this.capitalizeFirstLetter(this.props.category)}`-News;
    console.log(this.state.articles);
    }
    async updateNews(pageNo){
      this.props.setProgress(10);
    let url=`https://newsapi.org/v2//top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState("loading:true");
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData=(await data).json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
}
  
  async componentDidMount(){
    this.updateNews();
  }

  handlePrevClick=async()=>{
    this.setState({
      page:this.state.page-1,
    });
    this.updateNews();
  }
  handleNextClick=async()=>{
    this.setState({
      page:this.state.page+1,
    });
    this.updateNews();
  }
  fetchMoreData=async()=>{
    this.setState({
      page:this.state.page+1,
    });
    let url=`https://newsapi.org/v2//top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=(await data).json();
    console.log(parsedData);
    this.setState({articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
    })

  }
  
render() {
    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px'}}>News-Top {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll 
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<Spinner/>}
            >
              <div className='container'>
                  <div className='row'>
                    {this.state.articles && this.state.articles.map((element)=>{

                    return  <div className='col-md-4' key={element.url}>
                      <NewsItem title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,88):''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                            </div>
                      })}
                  </div>
              </div>
            
        </InfiniteScroll>
      </>
    )
  }
}
export default News