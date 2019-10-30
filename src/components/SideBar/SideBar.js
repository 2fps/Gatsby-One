import React from "react";

import SideSearch from './SideSearch';

import './SideBar.scss';

class SideBar extends React.Component {

    render() {
        return (
            <div>
                <SideSearch />
            </div>
        );
    }

}

export default SideBar;