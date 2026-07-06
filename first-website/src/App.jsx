import Footer from "./Footer.jsx";
import Hero from "./Hero.jsx";
import Navbar from "./Navbar.jsx";
import Card from "./Card.jsx"

function App() {

  return (
    <>
      <Navbar></Navbar>
      <div className="hero-space">
        <Hero></Hero>
        <Card></Card>
      </div>
      <Footer></Footer>
    </>
  );

}

export default App;