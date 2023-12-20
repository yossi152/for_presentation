import {Link } from "react-router-dom";


export function IsExternal({ backTo, external }) {
    console.log(external)
    return !external ? (
      <button className="btn"><Link to={"/"+backTo} className="text-dark">חזור</Link></button>
    ) : (
      <button className="btn text-dark" onClick={() => window.location.reload(true)}>חזור</button>
    );
  }