const contentful = require("contentful")
const manifestConfig = require("./manifest-config")
require("dotenv").config()

const {
    ACCESS_TOKEN,
    SPACE_ID,
    ANALYTICS_ID,
    GITHUB_PERSONAL_ACCESS_TOKEN,
} = process.env

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
})

const getAboutEntry = entry => entry.sys.contentType.sys.id === "about"

const plugins = [
    {
        resolve: "gatsby-source-graphql",
        options: {
            typeName: "GitHub",
            fieldName: "github",
            url: "https://api.github.com/graphql",
            headers: {
                Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
            },
            fetchOptions: {},
        },
    },

    "gatsby-plugin-react-helmet",
    {
        resolve: "gatsby-plugin-web-font-loader",
        options: {
            google: {
                families: ["Cabin", "Open Sans"],
            },
        },
    },
    {
        resolve: "gatsby-plugin-manifest",
        options: manifestConfig,
    },
    "gatsby-plugin-styled-components",
    {
        resolve: "gatsby-source-contentful",
        options: {
            spaceId: SPACE_ID,
            accessToken: ACCESS_TOKEN,
        },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-offline",
]

module.exports = client.getEntries().then(entries => {
    const {mediumUser} = entries.items.find(getAboutEntry).fields

    if (mediumUser) {
        plugins.push({
            resolve: "gatsby-source-medium",
            options: {
                username: mediumUser,
            },
        })
    }

    if (ANALYTICS_ID) {
        plugins.push({
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: ANALYTICS_ID,
            },
        })
    }

    return {
        siteMetadata: {
            isMediumUserDefined: !!mediumUser,
        },
        plugins,
    }
})
