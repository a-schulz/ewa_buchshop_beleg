import {useEffect, useState} from "react";
import {Search} from "./search";
import {useCartStore} from "../store/cartStore.js";
import {useNavigate} from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState("");
    const books = useCartStore(state => state.books);
    const [sumAmount, setSumAmount] = useState(0);

    useEffect(() => {
        setSumAmount(Object.values(books).reduce((a, b) => a + b, 0));
    }, [books]);

    const updateTime = () => {
        setTime(new Date().toLocaleDateString("de-DE") + " " + new Date().toLocaleTimeString());
    }

    useEffect(() => {
        setInterval(updateTime, 1000);
    }, []);

    return (<nav className="navbar sticky-top navbar-light bg-light"
                 style={{border: "1px solid #b1b1b1", borderRadius: "5px", padding: "5px"}}>
            <div className="container-fluid">
                <button className="navbar-brand btn btn-text"
                        onClick={() => {
                            navigate('/');
                        }}
                >Start
                </button>
                {/*<span>{time}</span>*/}
                <Search/>
                <button id="offcanvascontrol" className="btn btn btn-outline-secondary" type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">🛒
                    {sumAmount > 0 ? <span className="badge bg-danger">{sumAmount}</span> : null}
                </button>
            </div>
        </nav>)
}