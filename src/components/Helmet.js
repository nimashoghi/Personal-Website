import {graphql, StaticQuery} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ReactHelmet from "react-helmet"
import {withTheme} from "styled-components"

const Helmet = ({theme = {}}) => (
    <StaticQuery
        query={graphql`
            query HelmetQuery {
                contentfulAbout {
                    name
                    description
                    favicon {
                        favicon16: resize(width: 16) {
                            src
                        }
                        favicon32: resize(width: 32) {
                            src
                        }
                        bigIcon: resize(width: 192) {
                            src
                        }
                        appleIcon: resize(width: 180) {
                            src
                        }
                    }
                }
            }
        `}
        render={data => {
            const {name, description, favicon} = data.contentfulAbout
            const title = `${name}'s Portfolio`

            return (
                <ReactHelmet htmlAttributes={{lang: "en"}}>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <link
                        rel="shortcut icon"
                        href={`https:${favicon.favicon32.src}`}
                    />
                    <meta name="theme-color" content={theme.background} />
                    <meta
                        name="image"
                        content={`https:${favicon.favicon32.src}`}
                    />
                    <meta itemProp="name" content={title} />
                    <meta itemProp="description" content={description} />
                    <meta
                        itemProp="image"
                        content={`https:${favicon.favicon32.src}`}
                    />
                    <meta name="og:title" content={title} />
                    <meta name="og:description" content={description} />
                    <meta
                        name="og:image"
                        content={`https:${favicon.bigIcon.src}`}
                    />
                    <meta name="og:site_name" content={title} />
                    <meta name="og:locale" content="en_US" />
                    <meta name="og:type" content="website" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta
                        name="twitter:image"
                        content={`https:${favicon.bigIcon.src}`}
                    />
                    <meta
                        name="twitter:image:src"
                        content={`https:${favicon.bigIcon.src}`}
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href={`https:${favicon.appleIcon.src}`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href={`https:${favicon.favicon32.src}`}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href={`https:${favicon.favicon16.src}`}
                    />
                </ReactHelmet>
            )
        }}
    />
)

Helmet.propTypes = {
    // eslint-disable-next-line
    theme: PropTypes.object,
}

export default withTheme(Helmet)
