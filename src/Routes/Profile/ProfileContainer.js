import React from 'react';
import { gql } from "apollo-boost";
import { withRouter } from 'react-router-dom';
import ProfilePresenter from "./ProfilePresenter";
import { useMutation, useQuery } from 'react-apollo-hooks';


const SEEUSER_QUERY = gql`
    query seeUser($username: String!) { 
        seeUser(username: $username) {
            user{
                id
                avatar
                username
                fullName
                IsFollowing
                IsSelf
                bio
                followingCount
                followersCount
                postsCount
                posts {
                    id
                    files {
                        url
                    }
                    likeCount
                    commentCount
                }
            }
        }
    }
`;

// export const LOG_OUT = gql`
//     mutation logUserOut {
//         logUserOut @client
//     }
// `;

export default withRouter(props => {

    const logOut = () => {
        console.log("눌럿다")
        localStorage.removeItem("token");
        window.location = "/";   //모든 캐시를 없애기를 원해
        return null;
    }

    const username = props.match.params.username;
    const { data, loading } = useQuery(SEEUSER_QUERY, {variables:{username}});
    // const logOut = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
})
