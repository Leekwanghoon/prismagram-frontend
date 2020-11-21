export default (props) => {
    // console.log(props);
    const specificUsername  = props.match.params.username;
    return(
    <div>{specificUsername}</div>
    );
};