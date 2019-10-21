import PropTypes from "prop-types"
import React from "react"
import Slide from "react-reveal/Slide"
import {Section} from "react-scroll-section"
import {Heading} from "rebass"
import styled from "styled-components"
import LinkAnimated from "./LinkAnimated"

const SectionContainer = styled.div`
    min-height: ${props => (props.fullPage ? "100vh" : "0")};
    min-width: 320px;
    max-width: 1366px;
    display: flex;
    margin: auto;
    flex: 0 1 auto;
    flex-direction: column;
    justify-content: center;
    padding: 5em 1em;
    scroll-behavior: smooth;
`

const Container = ({id, children, color, fullPage}) => (
    <Section
        id={id}
        style={{position: "relative", ...(color ? {background: color} : {})}}>
        <SectionContainer fullPage={fullPage}>{children}</SectionContainer>
    </Section>
)

Container.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    fullPage: PropTypes.bool,
}

const Header = ({name, icon = "", label = "", color = "secondaryLight"}) => (
    <Slide left>
        <Heading color={color} mb={4}>
            <LinkAnimated selected>
                {name}
                {icon && (
                    <span
                        role="img"
                        aria-label={label}
                        style={{marginLeft: "10px"}}>
                        {icon}
                    </span>
                )}
            </LinkAnimated>
        </Heading>
    </Slide>
)

Header.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
}

export default {Container, Header}
