import React, { useRef } from "react";
import style from "./join.module.css";
import io from "socket.io-client";

export default function Join({ setChatVisibility, setSocket }) {
  const usernameRef = useRef();
  const HandleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect("http://localhost:3001");
    socket.emit("set_nomedousuario", username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div className={style["join-container"]}>
      <h1>Entrar no chat</h1>
      <input type="text" ref={usernameRef} placeholder="nome de usuario" />
      <button onClick={() => HandleSubmit()}>Entrar</button>
    </div>
  );
}
