// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, changeLikeSts, deleteComment} = props
  const {id, name, comment, isLiked, date, initialBgColor} = commentDetails

  const minsAgo = formatDistanceToNow(date)

  const likeStatus = () => {
    changeLikeSts(id)
  }

  const onClickingDeleteButton = () => {
    deleteComment(id)
  }

  const likeIconResult = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeTextResult = isLiked ? 'like-color' : ''
  return (
    <li className="each-list">
      <div className="comment-align">
        <p className={`initial-align ${initialBgColor}`}>
          {name[0].toUpperCase()}
        </p>
        <div>
          <p className="name">
            {name} <span className="mins-ago">{minsAgo}</span>
          </p>
          <p>{comment}</p>
        </div>
      </div>
      <div className="like-dlt-btn-container">
        <button
          className="like-btn-container"
          onClick={likeStatus}
          type="button"
        >
          <img src={likeIconResult} className="like-dlt-icon-size" alt="like" />
          <span className={likeTextResult}>Like</span>
        </button>

        <button
          type="button"
          className="dlt-btn"
          onClick={onClickingDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}
export default CommentItem
