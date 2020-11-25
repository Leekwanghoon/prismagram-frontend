import React from 'react';
import style from "styled-components";
import Button from "../Button";

export default ({ IsFollowing, onClick }) => (
    <Button onClick={onClick} text={IsFollowing ? "Unfollow" : "Follow"} />
)