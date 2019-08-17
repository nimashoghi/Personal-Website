import {graphql, useStaticQuery} from "gatsby"
import React from "react"
import Fade from "react-reveal/Fade"
import {CardContainer} from "../components/Card"
import Project from "../components/Project"
import Section from "../components/Section"
import Triangle from "../components/Triangle"

const Background = () => (
    <div>
        <Triangle
            color="secondary"
            height={["80vh", "80vh"]}
            width={["100vw", "100vw"]}
            invertX
        />

        <Triangle
            color="background"
            height={["50vh", "20vh"]}
            width={["50vw", "50vw"]}
            invertX
        />

        <Triangle
            color="primaryDark"
            height={["25vh", "40vh"]}
            width={["75vw", "100vw"]}
            invertX
            invertY
        />
    </div>
)

const fallbackLogo = "https://i.imgur.com/JnneNxj.png"

const Projects = () => {
    const {contentfulAbout} = useStaticQuery(graphql`
        query TechnicalPapersQuery {
            contentfulAbout {
                technicalPapers {
                    id
                    name
                    description {
                        childMarkdownRemark {
                            rawMarkdownBody
                        }
                    }
                    url
                    publishedDate(formatString: "YYYY")
                    type
                    typeColor
                }
            }
        }
    `)
    const technicalPapers = contentfulAbout.technicalPapers.map(
        ({
            description: {
                childMarkdownRemark: {rawMarkdownBody},
            },
            ...paper
        }) => ({
            ...paper,
            descriptionMarkdown: rawMarkdownBody,
        }),
    )

    return (
        <Section.Container id="technical-papers" Background={Background}>
            <Section.Header
                name="Technical Papers"
                icon="📝"
                label="notebook"
            />
            <CardContainer minWidth="350px">
                {technicalPapers.map((p, i) => (
                    <Fade bottom delay={i * 200} key={p.id}>
                        <Project fallbackLogo={fallbackLogo} {...p} />
                    </Fade>
                ))}
            </CardContainer>
        </Section.Container>
    )
}

export default Projects
