import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import style from "./Error404.module.css";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>ERROR 404</h1>
      <h3 className={style.text}>You will be redirected to the home page.</h3>
    </div>
  );
};

export default Error404;
