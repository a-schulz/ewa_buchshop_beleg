import {useEffect, useState} from "react";

export const NavBar = () =>{
    const [time, setTime] = useState("");

    const updateTime = () => {
        setTime(new Date().toLocaleDateString("de-DE") + " " + new Date().toLocaleTimeString());
    }

    useEffect(() => {
        setInterval(updateTime, 1000);
    }, []);

    return(
        <div id="navbar" className="container">
            <nav className="navbar sticky-top navbar-light bg-light" style={{border: "1px solid #b1b1b1", borderRadius: "5px", padding: "5px"}}>
                <a className="navbar-brand" href="/">Katalog</a>
                <div>{time}</div>
            </nav>
        </div>
    )
}