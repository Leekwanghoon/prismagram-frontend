import React from "react";





export default(props) => {
    //term
    const Search = props.location.search;
        //?term=
        const SearchLength = Search.length;
        const SearchData = Search.slice(6, SearchLength);




    return (<div>{SearchData}</div>);
}