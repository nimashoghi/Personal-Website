import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Layout from "../components/Layout"
import About from "../sections/About"
import Landing from "../sections/Landing"
import Projects from "../sections/Projects"
import TechnicalPapers from "../sections/TechnicalPapers"
import Writing from "../sections/Writing"

const IndexPage = () => (
    <Layout>
        <Header />
        <Landing />
        <About />
        <Projects />
        <TechnicalPapers />
        <Writing />
        <Footer />
    </Layout>
)

export default IndexPage
