import image from "./assets/Image.jpg";
import About from "./About.jsx";

function Card() {

    return (
        <div className="card">

            <p>What I am passionate about</p>
            <img className="card-image" src={image} alt="Yatin Patil" height="400" width="340"></img>
            {/* <h2>Yatin Patil</h2> */}
            <p className="card-title">Developer & Data Analyst</p>
            <button className="button" onClick={About}>Know More</button>

        </div>

    );
}

export default Card