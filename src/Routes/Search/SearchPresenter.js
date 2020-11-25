import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
    height: 80vh;
`;

const Section = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, 160px);
    grid-template-rows: 160px;
    grid-auto-rows: 160px;
`;

const PostSecion = styled(Section)`
    grid-template-columns: repeat(4, 160px);
    grid-template-rows: 160px;
    grid-auto-rows: 160px;
`;


const SearchPresenter = ({ searchTerm, loading, data }) => {
    if(searchTerm === undefined ) {
        return(
        <Wrapper>
            <FatText text="Search for something" />
        </Wrapper>
        );
    } else if( loading === true ) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if( data && data.searchUser && data.searchPost) {
        return (
            <Wrapper>
                <Section>
                {data.searchUser.length === 0 ? (<FatText text="No users found" />) : (data.searchUser.map((user,index) => <UserCard 
                    username={user.username}
                    IsFollowing={user.IsFollowing}
                    url={user.avatar}
                    IsSelf={user.IsSelf}
                    key={index}
                    id={user.id}
                />))}
                </Section>
                <PostSecion>
                    {data.searchPost.length === 0 ? (<FatText text="No posts found" />) : (data.searchPost.map((post,index) => 
                        <SquarePost
                            key={post.id}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            file={post.files[0]}
                        />
                    ))}
                </PostSecion>
            </Wrapper>
        );
    }
}

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
}




export default SearchPresenter;