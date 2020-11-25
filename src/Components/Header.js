import React from 'react';
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Compass, Insta, Comment, User, HeartEmpty } from './Icons';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../SharedQueries';

const Header = styled.header `
    width:100%;
    background-color: white;
    border: 0;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;
`;

const HeaderWrapper = styled.div `
    width:100%;
    max-width:${props => props.theme.maxWidth};
    display: flex;
    justify-content: center;
`;

const HeaderColumn = styled.div `
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }
    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${props => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 70%;
    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 20px;
    }
`;

export default withRouter((props) => {
    
    const {history} = props;
    const search = useInput("");
    const {data} = useQuery(ME);

    
    //자바스크립트 4 문법인데 data안에.me있니? 물어봐야함 안그러면 데이터 지연되서 property에러발생
    // async await를 생각할 수도 있지만 useQuery는 asyncawait과 작동 안해
    const awaitData = data?.me;
    

    

    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`)
    }

    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <Link to="/">
                        <Insta />
                    </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput value={search.value} onChange={search.onChange} placeholder="Search"/>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass />
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty />
                    </HeaderLink>
                    {!awaitData ? <HeaderLink to="#">
                        <User />
                    </HeaderLink> : <HeaderLink to={data?.me?.username}>
                        <User />
                    </HeaderLink>
                    }
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    );
});