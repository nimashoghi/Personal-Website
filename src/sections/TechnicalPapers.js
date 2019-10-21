import {graphql, useStaticQuery} from "gatsby"
import React from "react"
import Fade from "react-reveal/Fade"
import {CardContainer} from "../components/Card"
import Project from "../components/Project"
import Section from "../components/Section"

const fallbackLogo = "https://i.imgur.com/JnneNxj.png"

const Projects = ({...props}) => {
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
        <Section.Container id="technical-papers" {...props}>
            <Section.Header
                name="Technical Papers"
                icon="📝"
                label="notebook"
                color="secondaryLight"
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
