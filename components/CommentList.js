import Comment from './Comment'

const CommentList = ({ comments }) => {
  return(
    <>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  )
}

export default CommentList