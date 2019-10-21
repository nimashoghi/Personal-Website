import {graphql, useStaticQuery} from "gatsby"
import React, {Fragment} from "react"
import {SectionLink} from "react-scroll-section"
import TextLoop from "react-text-loop"
import {Box, Flex, Heading, Text} from "rebass"
import MouseIcon from "../components/MouseIcon"
import Section from "../components/Section"
import SocialLink from "../components/SocialLink"

const centerHorizontally = {marginRight: "auto", marginLeft: "auto"}

const LandingPage = ({...props}) => {
    const {
        contentfulAbout: {name, description, socialLinks, roles},
    } = useStaticQuery(graphql`
        query SiteTitleQuery {
            contentfulAbout {
                name
                description
                roles
                socialLinks {
                    id
                    url
                    name
                    fontAwesomeIcon
                }
            }
        }
    `)

    return (
        <Section.Container id="home" {...props}>
            <Fragment>
                <Heading
                    textAlign="center"
                    as="h2"
                    color="primary"
                    fontSize={[5, 6, 8]}>
                    {`Hello, I'm ${name}!`}
                </Heading>

                <Heading
                    textAlign="center"
                    as="h3"
                    color="secondary"
                    fontSize={[3, 4, 5]}
                    mb={[3, 4, 5]}>
                    {description}
                </Heading>

                <Heading
                    as="h2"
                    color="primary"
                    fontSize={[4, 5, 6]}
                    mb={[3, 5]}
                    textAlign="center"
                    style={centerHorizontally}>
                    <TextLoop interval={5000}>
                        {roles
                            .sort(() => Math.random() - 0.5)
                            .map(text => (
                                <Text width={[300, 500]} key={text}>
                                    {text}
                                </Text>
                            ))}
                    </TextLoop>
                </Heading>

                <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexWrap="wrap">
                    {socialLinks.map(({id, ...rest}) => (
                        <Box mx={3} fontSize={[5, 6, 6]} key={id}>
                            <SocialLink {...rest} />
                        </Box>
                    ))}
                </Flex>
                <SectionLink section="about">
                    {({onClick}) => <MouseIcon onClick={onClick} />}
                </SectionLink>
            </Fragment>
        </Section.Container>
    )
}

export default LandingPage
