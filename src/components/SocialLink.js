import PropTypes from "prop-types"
import React from "react"
import FontAwesomeIcon from "react-fontawesome"
import {Tooltip} from "react-tippy"
import {Link} from "rebass"
import styled from "styled-components"

const IconLink = styled(Link)`
    transition: color 0.5s;
    color: ${props =>
        props.theme.colors[props.color] || props.theme.colors.primary};
    text-decoration: none;

    &:hover {
        color: ${props => props.theme.colors.primaryLight};
    }
`

const Badge = styled.span`
    text-align: center;
    border-radius: 50rem;
    background: red;
    color: white;
    font-size: 1rem;

    display: inline-block;
    height: 20px;
    width: 20px;

    position: relative;
    bottom: 40%;
    right: 25%;
`

const SocialLink = ({fontAwesomeIcon, name, url, color, badge}) => (
    <Tooltip title={name} position="bottom" trigger="mouseenter">
        <IconLink
            href={url}
            target="_blank"
            color={color}
            rel="noreferrer"
            aria-label={name}>
            <FontAwesomeIcon name={fontAwesomeIcon} />
            {badge && <Badge>{badge}</Badge>}
        </IconLink>
    </Tooltip>
)

SocialLink.propTypes = {
    fontAwesomeIcon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    color: PropTypes.string,
    badge: PropTypes.string,
}

export default SocialLink
