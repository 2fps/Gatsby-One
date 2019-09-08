import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="load">
                <button className="load-more" onClick={ this.props.triggerHandle }>load more</button>
            </div>
        );
    }
}


export default Footer;