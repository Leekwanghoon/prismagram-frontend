import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

const PostContainer = ({
    id,
    location,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    caption,
    createdAt
}) => {

    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const comment = useInput("");
    const slide = () => {
        // const totalFiles = files.length;
        const totalFiles = 3;
        if(currentItem === totalFiles -1) {
            setTimeout(() => setCurrentItem(0),3000);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1),3000);
        }
    };

    useEffect(() => {
        slide();
    },[currentItem])

    console.log(currentItem);
 
    return <PostPresenter 
    user={user}
    files={files}
    likeCount={likeCountS}
    isLiked={isLikedS}
    newComment={comment}
    createdAt={createdAt}
    setIsLiked={setIsLiked}
    setLikeCount={setLikeCount}
    location={location}
    caption={caption}
    />
}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string,
                username: PropTypes.string
            }).isRequired,
        })
    ).isRequired,
    location:PropTypes.string,
    caption:PropTypes.string.isRequired,
    createdAt: PropTypes.string
}

export default PostContainer;