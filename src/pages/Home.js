import {Link } from "react-router-dom";
import {ProgressBar} from "../generalComponents/ProgressBar";

export function Home({ pageNum }){
    return (
    <>
    <ProgressBar pageNum={pageNum} />

    <div className="mb-3">
    <button className="btn btn-success"><Link to="/pick/Conditions" className="text-light">המשך</Link></button>
    </div>
    </>

    );
}
