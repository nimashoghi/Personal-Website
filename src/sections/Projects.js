import {graphql, useStaticQuery} from "gatsby"
import React from "react"
import Fade from "react-reveal/Fade"
import {CardContainer} from "../components/Card"
import Project from "../components/Project"
import Section from "../components/Section"

const GitHubProjectsQuery = graphql`
    query GitHubProjectsQuery {
        github {
            viewer {
                repositories(
                    first: 100
                    ownerAffiliations: OWNER
                    privacy: PUBLIC
                    isLocked: false
                    isFork: false
                ) {
                    nodes {
                        id
                        name
                        description
                        createdAt
                        url
                        homepageUrl
                        primaryLanguage {
                            name
                            color
                        }
                        stargazers {
                            totalCount
                        }
                        object(expression: "master:README.md") {
                            ... on GitHub_Blob {
                                text
                            }
                        }
                    }
                }
            }
        }
    }
`

const Projects = ({...props}) => {
    const {
        github: {
            viewer: {repositories},
        },
    } = useStaticQuery(GitHubProjectsQuery)
    const projects = repositories.nodes
        .map(
            ({
                id,
                name,
                createdAt,
                description,
                url,
                homepageUrl,
                primaryLanguage,
                stargazers: {totalCount},
                object,
            }) => {
                const readmePath =
                    object && object.text
                        ? `${url}/blob/master/README.md`
                        : undefined
                const typeInfo = primaryLanguage || {name: "", color: ""}

                return {
                    id,
                    name,
                    description,
                    publishedDate: `${new Date(createdAt).getFullYear()}`,
                    url,
                    projectUrl: homepageUrl || readmePath || undefined,
                    projectUrlTooltip: "See project README",
                    type: typeInfo.name,
                    typeColor: typeInfo.color,
                    stars: totalCount,
                }
            },
        )
        .filter(({description}) => !!description)
        .sort(({stars: lhs}, {stars: rhs}) => rhs - lhs)

    return (
        <Section.Container id="projects" {...props}>
            <Section.Header
                name="Projects"
                icon="💻"
                label="notebook"
                color="secondaryLight"
            />
            <CardContainer minWidth="350px">
                {projects.map((p, i) => (
                    <Fade bottom delay={i * 200} key={p.id}>
                        <Project {...p} />
                    </Fade>
                ))}
            </CardContainer>
        </Section.Container>
    )
}

export default Projects
