import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Container from "../Container/Container";
import './Main.scss'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useRef} from "react";

export default function Main() {
  const aboutProject = useRef();

  const handleClickLearnMore = () => {
    if (aboutProject.current) {
      window.scrollTo({
        top: aboutProject.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <Header variant="primary"/>
      <main className="main">
        <section className="main__promo">
          <Container>
            <Promo onClickLearnMore={handleClickLearnMore}/>
          </Container>
        </section>
        <section className="main__about-project" ref={aboutProject}>
          <Container>
            <AboutProject/>
          </Container>
        </section>
        <section className="main__techs">
          <Container>
            <Techs/>
          </Container>
        </section>
        <section className="main__about-me">
          <Container>
            <AboutMe/>
          </Container>
        </section>
        <section className="main__portfolio">
          <Container>
            <Portfolio/>
          </Container>
        </section>
      </main>
      <Footer/>
    </>
  );
}
