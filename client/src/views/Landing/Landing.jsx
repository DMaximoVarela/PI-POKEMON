import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import Logo from "../../assets/images/Logo Pokemon.png";

const Landing = () => {
  return (
    <>
      <div className={style.container}>
        <img src={Logo} alt="Logo Pokemon" className={style.img} />
        <h1 className={style.wc}>Welcome To My PI Pokemon</h1>
        <Link to={"/home"}>
          <button className={style.btn}>START</button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
