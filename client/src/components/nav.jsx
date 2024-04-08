import { Outlet, Link } from "react-router-dom";

function Nav({ query, charList, queryHandler, cardHandler }) {
    return (
        <>
            <nav className="navbar navbar-expand-md bg-primary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Cloud Computing
                    </Link>
                    <div className="navbar-nav">
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to="/new"
                        >
                            New post
                        </Link>
                    </div>
                    <div className="position-relative">
                        <form action="/" className="d-flex" role="search">
                            <input
                                type="search"
                                className="form-control me-2"
                                placeholder="Search a character"
                                onChange={(e) => {
                                    queryHandler(e.target.value);
                                }}
                            />
                            <button
                                className="btn btn-outline-light"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                        <div
                            className="list-group position-absolute w-100"
                            style={{ zIndex: "2" }}
                        >
                            <Results
                                query={query}
                                charList={charList}
                                cardHandler={cardHandler}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

function Results({ query, charList, cardHandler }) {
    if (query == "") {
        return [];
    }
    const elements = [];
    charList.forEach((char, index) => {
        if (char.toLowerCase().indexOf(query) > -1) {
            const element = (
                <a
                    className="list-group-item list-group-item-action cursor-pointer"
                    key={index}
                    onClick={() => cardHandler(index)}
                >
                    {char}
                </a>
            );
            elements.push(element);
        }
    });
    // return [...elements];
    return elements;
}

export default Nav;
