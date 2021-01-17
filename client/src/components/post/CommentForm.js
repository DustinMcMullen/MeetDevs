import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../actions/post';

const CommentForm = ({addComment, postId}) => {
    const [text, setText] = useState("");
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={e => {
                e.preventDefault();
                addComment({text}, postId);
                setText("");
            }} >
                <textarea
                    onChange={e => setText(e.target.value)}
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                    value={text}
                ></textarea>
            <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth,
    postId: state.post.post._id
});

export default connect(mapStateToProps, {addComment})(CommentForm);