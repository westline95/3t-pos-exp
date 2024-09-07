import React, {useState} from 'react';
import propTypes from "prop-types";

export default function CategoriesCard(props) {
    const { isActive, title, desc, img,  onClick} = props;

    const imgStyle = {
        background: `url('${img}') center center / contain no-repeat`,
        height: "100%",
    }

    return (
        <div className={`category ${isActive ? "active" : ""}`} onClick={onClick}>
            <div className="category-img-wrap">
                <div className="category-img" style={imgStyle}>
                    {props.children}
                </div>
            </div>
            <div className="category-detail">
                <p className="category-title">{title}</p>
                <p className="category-sub-title">{desc}</p>
            </div>
        </div>
    );
}

CategoriesCard.propTypes = {
    title: propTypes.string,
    desc: propTypes.string,
    isActive: propTypes.bool,
    img: propTypes.string,
    onClick: propTypes.func
}