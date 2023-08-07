import React from 'react'

function temp() {
  return (
    <div>
        <div className="card-container" key={post.id}>
                    <div className='card-container1'>
                        <div className='card-upper'>
                            <div className="card-username">{post.createdBy}</div>
                            <div className="card-date">{post.createdAt.toDate().toDateString()}</div>
                        </div>
                        <div className='card-lower'>
                            <div className='card-tex-des-topi'>
                                <div className='title'>{post.title}</div>
                                <div className='text'>{post.description}</div>
                                <div className='topic-like-comment'>
                                    <div className='topic'>{post.topic}</div>
                                    <i className="far fa-thumbs-up">{post.likes?.length}</i>
                                    <i className="far fa-comment">{post.comments?.length}</i>
                                </div>
                            </div>
                            <div className='card-image'>
                                <img
                                src={post.imageUrl}
                                alt="title"
                                style={{ height: 180, width: 180 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className="card-user-info">
                        <div className="card-username">{post.createdBy}</div>
                        <div className="card-date">{post.createdAt.toDate().toDateString()}</div>
                    </div>
                    <div className="card-title-text">
                        <div className="card-title">{post.title}</div>
                        <div className="card-text">
                        {post.description}
                        </div>
                    </div>
                    <div className="card-actions">
                        <div className="card-topic">{post.topic}</div>
                        <div className="card-icons">
                        <i className="far fa-thumbs-up">{post.likes?.length}</i>
                        <i className="far fa-comment">{post.comments?.length}</i>
                        </div>
                    </div>
                    <div className="card-image">
                        <img
                            src={post.imageUrl}
                            alt="title"
                            style={{ height: 180, width: 180 }}
                        />
                    </div> */}
                </div>
    </div>
  )
}

export default temp