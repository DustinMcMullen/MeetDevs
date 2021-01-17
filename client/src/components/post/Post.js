import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import Spinner from '../layout/Spinner';
import {getPost} from '../../actions/post'

const Post = ({
    getPost,
    post: {post, loading},
    auth,
    match
}) => {
    useEffect( () => {
        getPost(match.params.postId)
    }, [getPost, match.params.postId]);

    return (
        <Fragment>
            {post === null || loading ? <Spinner />
            : (
                <Fragment>
                    <div class="container">

                        <Link to="/posts" class="btn">Back To Posts</Link>

                        <div class="post bg-white p-1 my-1">
                                <div>
                                    <Link to={`/profile/user/${post.user}`}>
                                        <img
                                        class="round-img"
                                        src={post.avatar}
                                        alt=""
                                        />
                                        <h4>{post.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p class="my-1">{post.text}</p>
                                </div>
                        </div>

                        <CommentForm></CommentForm>

                        <div className="comments">
                            {post.comments.map(comment => (
                                <CommentItem key={comment._id} comment={comment} />
                            ))}
                        </div>   
        

                    </div>
                </Fragment>
            
            )}
        </Fragment>
    )
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);