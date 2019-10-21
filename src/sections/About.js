import {graphql, useStaticQuery} from "gatsby"
import React from "react"
import ReactMarkdown from "react-markdown"
import Fade from "react-reveal/Fade"
import {Box, Flex, Image} from "rebass"
import styled from "styled-components"
import markdownRenderer from "../components/MarkdownRenderer"
import Section from "../components/Section"

const ProfilePicture = styled(Image)`
    border-radius: 50%;
    transition: all 0.25s ease-out;

    &:hover {
        border-radius: 20%;
    }
`

const About = ({...props}) => {
    const {
        contentfulAbout: {aboutMe, profile},
    } = useStaticQuery(graphql`
        query AboutMeQuery {
            contentfulAbout {
                aboutMe {
                    childMarkdownRemark {
                        rawMarkdownBody
                    }
                }
                profile {
                    title
                    image: resize(width: 450, quality: 100) {
                        src
                    }
                }
            }
        }
    `)

    return (
        <Section.Container id="about" {...props}>
            <Section.Header
                name="About me"
                icon="🙋‍♂️"
                label="person"
                color="secondaryDark"
            />
            <Flex
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                mb={65}>
                <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
                    <Fade bottom>
                        <ReactMarkdown
                            source={aboutMe.childMarkdownRemark.rawMarkdownBody}
                            renderers={markdownRenderer}
                        />
                    </Fade>
                </Box>

                <Box
                    width={[1, 1, 2 / 6]}
                    style={{maxWidth: "300px", margin: "auto"}}>
                    <Fade right>
                        <ProfilePicture
                            src={profile.image.src}
                            alt={profile.title}
                            mt={[4, 4, 0]}
                            ml={[0, 0, 1]}
                        />
                    </Fade>
                </Box>
            </Flex>
        </Section.Container>
    )
}

export default About
