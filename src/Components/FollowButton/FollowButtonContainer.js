import React,{ useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from "./FollowButtonPresenter";

//현재 IsFollowing false
const FollowButtonContainer = ({IsFollowing, id}) => {
    
    const [followMutation] = useMutation(FOLLOW, {variables: {id}});
    const [unfollowMutation] = useMutation(UNFOLLOW , {variables: {id}});
    const [IsFollowingS, setIsFollowingS] = useState(IsFollowing);
    

    

    const onClick = () => {
        if(IsFollowingS === false) {
            followMutation();
            setIsFollowingS(true);
        } else {
            unfollowMutation();
            setIsFollowingS(false);
        }
    }
    

    return(
        <FollowButtonPresenter onClick={onClick} IsFollowing={IsFollowingS} />
    );
}

FollowButtonContainer.propTypes = {
    IsFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
}


export default FollowButtonContainer;