import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";
import { useQuery } from 'react-apollo-hooks';
import { ME } from "../../SharedQueries";
// import { toast } from "react-toastify";



const PostContainer = ({
    id,
    location,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    caption,
    createdAt,
}) => {

   

    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    const { data: meQuery } = useQuery(ME); 
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });

    
    const slide = () => {
        // const totalFiles = files.length;
        const totalFiles = files.length;
        if(currentItem === totalFiles -1) {
            setTimeout(() => setCurrentItem(0),3000);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1),3000);
        }
    };

    useEffect(() => {
        slide();
    },[])

    const toggleLike = async () => {
        toggleLikeMutation();
        if(isLikedS === true) {
            setIsLiked(false);
            setLikeCount(likeCountS-1)
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS+1)
        }
    }


    //현재 comment에 database는 들어가나 graphql non-null error 발생// 가상더미로 넣어놓기는 했지만 해결해야함.. 힝구 missingField//현재 comment에 database는 들어가나 graphql non-null error 발생//
    const onKeyPress = async (e) => {
        if(e.which === 13) {
            e.preventDefault();
            comment.setValue("");
            // const data = await addCommentMutation();
            setSelfComments([
                ...selfComments, 
                {
                    id: Math.random()*100, 
                    text: comment.value, 
                    user: { username: meQuery.me.username } 
                }
            ]);
            // try {
            //     console.log(data,"Data For addComment");
            // } catch(err) {
            //     console.log(err,"error For Comment")
            //     toast.error("Can't send Comment")
            // }
        }
    };
 
    return <PostPresenter 
    user={user}
    files={files}
    likeCount={likeCountS}
    isLiked={isLikedS}
    comments={comments}
    createdAt={createdAt}
    newComment={comment}
    setIsLiked={setIsLiked}
    setLikeCount={setLikeCount}
    location={location}
    caption={caption}
    currentItem={currentItem}
    toggleLike={toggleLike}
    onKeyPress={onKeyPress}
    selfComments={selfComments}
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