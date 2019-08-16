import PropTypes from "prop-types"
import React from "react"
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
    width: ${props =>
        props.hasImage ? `calc(100% - ${CARD_HEIGHT})` : "100%"};

    ${MEDIA_QUERY_SMALL} {
        width: ${props =>
            props.hasImage ? `calc(100% - ${CARD_HEIGHT / 2})` : "100%"};
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

const Project = ({
    name,
    description,
    projectUrl,
    repositoryUrl,
    type,
    publishedDate,
    logo,
}) => (
    <Card p={0}>
        <Flex style={{height: CARD_HEIGHT}}>
            <TextContainer hasImage={!!logo}>
                <span>
                    <Title my={2} pb={1}>
                        {name}
                    </Title>
                </span>
                <Text width={[1]} style={{overflow: "auto"}}>
                    {description}
                </Text>
            </TextContainer>

            {logo && (
                <ImageContainer>
                    <ProjectImage src={logo.image.src} alt={logo.title} />
                    <ProjectTag>
                        <Flex
                            style={{
                                float: "right",
                            }}>
                            <Box mx={1} fontSize={5}>
                                <SocialLink
                                    name="Check repository"
                                    fontAwesomeIcon="github"
                                    url={repositoryUrl}
                                />
                            </Box>
                            <Box mx={1} fontSize={5}>
                                <SocialLink
                                    name="See project"
                                    fontAwesomeIcon="globe"
                                    url={projectUrl}
                                />
                            </Box>
                        </Flex>
                        <ImageSubtitle
                            bg="primary"
                            color="white"
                            y="bottom"
                            x="right"
                            round>
                            {type}
                        </ImageSubtitle>
                        <Hide query={MEDIA_QUERY_SMALL}>
                            <ImageSubtitle bg="backgroundDark">
                                {publishedDate}
                            </ImageSubtitle>
                        </Hide>
                    </ProjectTag>
                </ImageContainer>
            )}
        </Flex>
    </Card>
)

Project.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    projectUrl: PropTypes.string.isRequired,
    repositoryUrl: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    logo: PropTypes.shape({
        image: PropTypes.shape({
            src: PropTypes.string,
        }),
        title: PropTypes.string,
    }),
}

export default Project