import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/post';

const CommentItem = ({comment: {_id, user, text, name, avatar, date}, auth, post, deleteComment}) => {
    return (
        <div class="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/user/${user}`}>
                <img
                    class="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p class="my-1">{text}</p>
                <p class="post-date"><Moment format="YYYY/MM/DD">{date}</Moment></p>

                {!auth.loading && user === auth.user._id && (
                    <button onClick={e => deleteComment(post._id, _id)} type="button" className="btn btn-danger">
                        <i class="fas fa-times"></i>
                    </button>
                )}

            </div>
        </div>
    );
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth,
    post: state.post.post

});

export default connect(mapStateToProps, {deleteComment} )(CommentItem);
