import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationItems from "./NavigationItems";

import "./sidebar.css";

function Sidebar(props: any) {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    function getPath(path: string) {
        if (path.charAt(0) !== "/") {
            return  "/" + path;
        }
        return path;
    }

    useEffect(()=> {
        const activeItem = NavigationItems.findIndex(item => getPath(location.pathname).includes(getPath(item.route)))
        setActiveIndex(activeItem);
    }, [location]);

    return <div className="sidebar">
        {
            NavigationItems.map((e, idx) => (
                <div key={idx} className={`sidebar-item ${idx === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(idx)}>
                    <Link key={`link_${idx}`} to={e.route}>
                        {e.name}
                    </Link>
                </div>
            ))
        }
    </div>
}

export default Sidebar;