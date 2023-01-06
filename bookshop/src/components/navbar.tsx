import {useEffect, useState} from "react";
import {Search} from "./search";

export const NavBar = () => {
    const [time, setTime] = useState("");

    const updateTime = () => {
        setTime(new Date().toLocaleDateString("de-DE") + " " + new Date().toLocaleTimeString());
    }

    useEffect(() => {
        setInterval(updateTime, 1000);
    }, []);

    return (
        <nav className="navbar sticky-top navbar-light bg-light"
             style={{border: "1px solid #b1b1b1", borderRadius: "5px", padding: "5px"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Katalog</a>
                {/*<span>{time}</span>*/}
                <Search/>
                <button id="offcanvascontrol" className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Cart
                </button>
            </div>
        </nav>
    )
}