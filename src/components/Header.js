import {graphql, useStaticQuery} from "gatsby"
import React, {Fragment} from "react"
import Headroom from "react-headroom"
import Fade from "react-reveal/Fade"
import {SectionLinks} from "react-scroll-section"
import {Flex, Image} from "rebass"
import styled from "styled-components"
import RouteLink from "./RouteLink"

const capitalizeSingle = s => s && s[0].toUpperCase() + s.slice(1)
const capitalize = s =>
    s
        .split("-")
        .map(capitalizeSingle)
        .join(" ")

const HeaderContainer = styled(Headroom)`
    .headroom--pinned {
        background: ${props => props.theme.colors.primaryDark};
    }

    .headroom--unfixed span {
        color: ${props => props.theme.colors.primaryDark};
    }

    position: absolute;
    width: 100%;
`

const formatLinks = allLinks =>
    Object.entries(allLinks).reduce(
        (acc, [key, value]) => {
            const isHome = key === "home"
            return isHome
                ? {
                      ...acc,
                      home: value,
                  }
                : {
                      ...acc,
                      links: [...acc.links, {name: capitalize(key), value}],
                  }
        },
        {links: [], home: null},
    )

const HeaderQuery = graphql`
    query HeaderQuery {
        contentfulAbout {
            favicon {
                file {
                    url
                }
            }
        }
    }
`

const Header = () => {
    const {
        contentfulAbout: {
            favicon: {
                file: {url},
            },
        },
    } = useStaticQuery(HeaderQuery)
    return (
        <HeaderContainer>
            <Fade top>
                <Flex
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    p={3}>
                    <SectionLinks>
                        {({allLinks}) => {
                            const {home, links} = formatLinks(allLinks)

                            const homeLink = home && (
                                <Image
                                    src={url}
                                    width="50px"
                                    alt="Portfolio Logo"
                                    onClick={home.onClick}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                />
                            )
                            const navLinks = links.map(({name, value}) => (
                                <RouteLink
                                    key={name}
                                    onClick={value.onClick}
                                    selected={value.selected}>
                                    {name}
                                </RouteLink>
                            ))

                            return (
                                <Fragment>
                                    {homeLink}
                                    <Flex mr={[0, 3, 5]}>{navLinks}</Flex>
                                </Fragment>
                            )
                        }}
                    </SectionLinks>
                </Flex>
            </Fade>
        </HeaderContainer>
    )
}

export default Header
