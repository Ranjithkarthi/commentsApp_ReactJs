import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  nameInput = event => {
    this.setState({name: event.target.value})
  }

  commentInput = event => {
    this.setState({comment: event.target.value})
  }

  submitingForm = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroudClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: v4(),
      name,
      comment,
      isLiked: false,
      date: new Date(),
      initialBgColor: initialBackgroudClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  changeLikeSts = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(comment => {
        if (id === comment.id) {
          return {...comment, isLiked: !comment.isLiked}
        }
        return comment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        changeLikeSts={this.changeLikeSts}
        deleteComment={this.deleteComment}
      />
    ))
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="bg-container">
        <div className="comment-and-img-container">
          <div>
            <h1 className="heading">Comments</h1>
            <p className="desc">Say something about 4.o Technologies</p>
            <form
              onSubmit={this.submitingForm}
              className="comment-section class-form"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="name-input"
                value={name}
                onChange={this.nameInput}
              />
              <br />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                rows="6"
                onChange={this.commentInput}
                value={comment}
              />
              <br />
              <button type="submit" className="btn">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="cover-img"
          />
        </div>
        <hr className="hr-line" />
        <p className="comment-Heading">
          <span className="commentCounter">{commentsList.length}</span> Comments
        </p>
        <ul>{this.renderCommentsList()}</ul>
      </div>
    )
  }
}

export default Comments
