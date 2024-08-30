import React, { Component } from 'react'

export default class NewsItem extends Component {
  articles
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
        
      <div className='my-3'>
        <div className='card'>
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zindex:'1'}}>{source}
          </span>
          </div>
            <img className="card-img-top" src={!imageUrl?"download1.jpg":imageUrl}  alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-muted'>By {!author?"Unknown":author}on{new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target='_blank' className='btn btn-primary'>Read More</a>
            </div>
        </div>
        
      </div>
    )
  }
}
