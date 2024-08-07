import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export default function Button(props) {
    
    const className = [props.className];
    if (props.isPrimary) className.push("btn-primary");
    if (props.isWarning) className.push("btn-warning");
    if (props.isSuccess) className.push("btn-success");
    if (props.isInfo) className.push("btn-info");
    if (props.isDanger) className.push("btn-danger");
    if (props.isSecondary) className.push("btn-secondary");
    if (props.isLighter) className.push("btn-light");
    if (props.isLight) className.push("light");
    if (props.isLarge) className.push("btn-lg");
    if (props.isSmall) className.push("btn-sm");
    if (props.isBlock) className.push("btn-block");
    if (props.hasShadow) className.push("btn-shadow");
    if (props.isRounded) className.push("btn-rounded");

    if(props.isDisabled || props.isLoading) {
        if(props.isDisabled) className.push("disabled");
        return (
            <span className={className.join(" ")} style={props.style}>
                {props.isLoading ? (
                    <>
                    <span className="spinner-border spinner-border-sm mx-5"></span>
                    <span className="sr-only">Loading...</span>
                    </>
                ) : (
                    props.children
                )}
            </span>
        )
    }

    if(props.type === "link"){
        if(props.isExternal) {
            return (
                <a
                href={props.href}
                className={className.join(" ")}
                style={props.style}
                target={props.target === "_blank" ? "_blank" : undefined}
                rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
                >
                    {props.children}
                </a>
            );
        } else {
            return (
                <Link
                    to={props.href}
                    className={className.join(" ")}
                    style={props.style}
                    onClick={props.onClick}
                >
                    {props.children}
                </Link>
            );
        }
    }
    
    return (
        <button 
        className={`btn ${className.join(" ")}`} 
        style={props.style} 
        id={props.id}
        aria-label={props.ariaLabel}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}>
            {props.children}
        </button>
    );
}

Button.propTypes = {
    type: propTypes.oneOf(["button", "link"]),
    onClick:  propTypes.func,
    href: propTypes.string,
    id: propTypes.string,
    target: propTypes.string,
    ariaLabel: propTypes.string,
    className: propTypes.string,
    isPrimary: propTypes.bool,
    isSecondary: propTypes.bool,
    isInfo: propTypes.bool,
    isWarning: propTypes.bool,
    isSuccess: propTypes.bool,
    isDanger: propTypes.bool,
    isLight: propTypes.bool,
    isLighter: propTypes.bool,
    isDisabled: propTypes.bool,
    isLoading: propTypes.bool,
    isSmall: propTypes.bool,
    isLarge: propTypes.bool,
    isBlock: propTypes.bool,
    isExternal: propTypes.bool,
    hasShadow: propTypes.bool,
    isRounded: propTypes.bool,
    onMouseEnter: propTypes.func,
    onMouseLeave: propTypes.func,

};