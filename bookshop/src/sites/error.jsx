import {Link, useLocation} from "react-router-dom";

export const Error = () => {
    const location = useLocation();
    return (
        <div className={"container"}>
                <h1>Oops! You seem to be lost.</h1>
                No match found for <code>{location.pathname}</code>
                <p>Here are some helpful links:</p>
                <Link to='/'>Home</Link>
        </div>
    );
};