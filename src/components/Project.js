import getUrls from "get-urls"
import PropTypes from "prop-types"
import React from "react"
import ReactMarkdown from "react-markdown"
import {Box, Flex, Image, Text} from "rebass"
import styled from "styled-components"
import {Card} from "./Card"
import Hide from "./Hide"
import ImageSubtitle from "./ImageSubtitle"
import SocialLink from "./SocialLink"

const CARD_HEIGHT = "200px"

const MEDIA_QUERY_SMALL = "@media (max-width: 400px)"

const Title = styled(Text)`
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    display: table;
    border-bottom: ${props => props.theme.colors.primary} 5px solid;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: calc(100% - ${CARD_HEIGHT});

    ${MEDIA_QUERY_SMALL} {
        width: calc(100% - ${CARD_HEIGHT / 2});
    }
`

const ImageContainer = styled.div`
    margin: auto;
    width: ${CARD_HEIGHT};

    ${MEDIA_QUERY_SMALL} {
        width: calc(${CARD_HEIGHT} / 2);
    }
`

const ProjectImage = styled(Image)`
    width: ${CARD_HEIGHT};
    height: ${CARD_HEIGHT};
    padding: 40px;
    margin-top: 0px;

    ${MEDIA_QUERY_SMALL} {
        height: calc(${CARD_HEIGHT} / 2);
        width: calc(${CARD_HEIGHT} / 2);
        margin-top: calc(${CARD_HEIGHT} / 4);
        padding: 10px;
    }
`

const ProjectTag = styled.div`
    position: relative;
    height: ${CARD_HEIGHT};
    top: calc(
        -${CARD_HEIGHT} - 3.5px
    ); /*don't know why I have to add 3.5px here ... */

    ${MEDIA_QUERY_SMALL} {
        top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
    }
`
const fallbackImageSrc = "https://i.imgur.com/VZHYihW.png"

const Project = ({
    name,
    description,
    descriptionMarkdown,
    url,
    projectUrl,
    projectUrlTooltip,
    type,
    typeColor,
    publishedDate,
    logo,
    fallbackLogo = fallbackImageSrc,
    stars,
}) => {
    const {image, title} = logo || {
        image: {
            src: fallbackLogo,
        },
        title: name,
    }
    const isGithub = stars !== undefined && url.includes("github.com")
    let projectUrl_ = projectUrl
    if (!projectUrl) {
        const urls = [...getUrls(description || "").values()]
        projectUrl_ = urls.length === 0 ? undefined : urls[0]
    }

    return (
        <Card p={0}>
            <Flex style={{height: CARD_HEIGHT}}>
                <TextContainer>
                    <span>
                        <Title my={2} pb={1}>
                            {name}
                        </Title>
                    </span>
                    <Text width={[1]} style={{overflow: "auto"}}>
                        {description || (
                            <ReactMarkdown
                                source={descriptionMarkdown}
                                disallowedTypes={["paragraph"]}
                                unwrapDisallowed
                            />
                        )}
                    </Text>
                </TextContainer>
                <ImageContainer>
                    <ProjectImage src={image.src} alt={title} />
                    <ProjectTag>
                        <Flex
                            style={{
                                float: "right",
                            }}>
                            {projectUrl_ && (
                                <Box mx={1} fontSize={5}>
                                    <SocialLink
                                        name={
                                            projectUrlTooltip ||
                                            "See project homepage"
                                        }
                                        fontAwesomeIcon="globe"
                                        url={projectUrl_}
                                    />
                                </Box>
                            )}
                            <Box mx={1} fontSize={5}>
                                <SocialLink
                                    name={
                                        isGithub
                                            ? "Check repository"
                                            : "See project"
                                    }
                                    fontAwesomeIcon={
                                        isGithub ? "github" : "globe"
                                    }
                                    badge={
                                        stars === undefined
                                            ? undefined
                                            : `${stars}`
                                    }
                                    url={url}
                                />
                            </Box>
                        </Flex>
                        <ImageSubtitle
                            bg="backgroundDark"
                            color="secondary"
                            y="bottom"
                            x="right"
                            round>
                            {type || ""}
                        </ImageSubtitle>
                        <Hide query={MEDIA_QUERY_SMALL}>
                            <ImageSubtitle bg="backgroundDark" color="primary">
                                {publishedDate}
                            </ImageSubtitle>
                        </Hide>
                    </ProjectTag>
                </ImageContainer>
            </Flex>
        </Card>
    )
}

Project.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    descriptionMarkdown: PropTypes.string,
    url: PropTypes.string.isRequired,
    projectUrl: PropTypes.string,
    projectUrlTooltip: PropTypes.string,
    type: PropTypes.string,
    typeColor: PropTypes.string,
    publishedDate: PropTypes.string.isRequired,
    logo: PropTypes.shape({
        image: PropTypes.shape({
            src: PropTypes.string,
        }),
        title: PropTypes.string,
    }),
    fallbackLogo: PropTypes.string,
    stars: PropTypes.number,
}

export default Project
