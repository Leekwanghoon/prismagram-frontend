import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';
import FatText from '../FatText';
import { HeartEmpty, HeartFull, Comment } from '../Icons';
import TextareaAutosize from 'react-autosize-textarea';

const Post = styled.div `
    ${props => props.theme.whiteBox};
    width:100%;
    max-width: 600px;
    margin-bottom: 25px;
`;

const Header = styled.div `
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div `
  margin-left: 10px;  
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.img`
    max-width:100%;
    width:100%;
    position: absolute;
    top: 0;
    background-image: url((${props => props.src}));
    background-size: cover;
    background-position: center;
`;

const Button = styled.span`
    cursor: pointer;
`;

const Meta = styled.div`
    padding: 15px;
`;

const Buttons = styled.div`
    ${Button} {
        &:first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const Timestamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const TextArea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;


export default ({ 
    user: {username, avatar}, 
    location, 
    files, 
    isLiked, 
    likeCount,
    createdAt,
    newComment
    }) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
                <FatText text={username} />
                <Location>{location}</Location>
            </UserColumn>
        </Header>
        <Files>
            {files && files.map(file => <File id={file.id} src={file.url} />)}
        </Files>
        <Meta>
            <Buttons>
                <Button>
                {isLiked ? <HeartFull /> : <HeartEmpty />}
                </Button>
                <Button><Comment /></Button>
            </Buttons>
            <FatText text={likeCount === "1" ? "1 like" : `${likeCount} likes`} />
            <Timestamp>{createdAt}</Timestamp>
            <TextArea 
                {...newComment}
                placeholder={"Add a comment..."} 
            />
        </Meta>
    </Post>
)