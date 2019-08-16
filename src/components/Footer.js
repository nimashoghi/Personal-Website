import {graphql, StaticQuery} from "gatsby"
import React from "react"
import Fade from "react-reveal/Fade"
import {Box, Flex, Link, Text} from "rebass"
import styled from "styled-components"
import SocialLink from "./SocialLink"

const FooterContainer = styled.footer`
    min-width: 320px;
    max-width: 1366px;
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: auto;
`

const TextFooter = styled(Text)`
    color: ${props => props.theme.colors.background};

    & a {
        color: ${props => props.theme.colors.background};
    }
`

const Footer = () => (
    <StaticQuery
        query={graphql`
            query FooterQuery {
                contentfulAbout {
                    name
                    roles
                    socialLinks {
                        id
                        url
                        name
                        fontAwesomeIcon
                    }
                }
            }
        `}
        render={data => {
            const {name, socialLinks} = data.contentfulAbout

            return (
                <Box p={3} backgroundColor="primaryDark">
                    <FooterContainer>
                        <Fade left>
                            <TextFooter fontSize={[2, 3]}>
                                <span>{`${name}'s Portfolio - Powered by `}</span>
                                <Link href="https://www.gatsbyjs.org/">
                                    Gatsby
                                </Link>
                                <span> and </span>
                                <Link href="https://www.contentful.com/" mr={1}>
                                    Contentful
                                </Link>
                                <span role="img" aria-label="heart">
                                    ❤️
                                </span>
                            </TextFooter>
                        </Fade>
                        <Flex>
                            <Fade right>
                                {socialLinks.map(({id, ...rest}) => (
                                    <Box mx={[2, 3]} fontSize={[4, 5]} key={id}>
                                        <SocialLink
                                            {...rest}
                                            color="background"
                                        />
                                    </Box>
                                ))}
                            </Fade>
                        </Flex>
                    </FooterContainer>
                </Box>
            )
        }}
    />
)

export default Footer
