import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Layout from "../components/Layout"
import About from "../sections/About"
import Landing from "../sections/Landing"
import Projects from "../sections/Projects"
import TechnicalPapers from "../sections/TechnicalPapers"

const IndexPage = () => (
    <Layout>
        <Header />
        <Landing color="#DCDCDD" fullPage />
        <About color="#C5C3C6" fullPage />
        <Projects color="#46494C" fullPage />
        <TechnicalPapers color="#4C5C68" />
        <Footer color="#1985A1" />
    </Layout>
)

export default IndexPage
