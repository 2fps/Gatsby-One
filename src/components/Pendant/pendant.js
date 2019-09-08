import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { throttle } from '../../utils/utils';

import './pendant.scss';

let scrollFn = null;

class Pendant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBackToTop: false
        };
    }
    componentDidMount() {
        let belowShow = throttle(400);

        // 增加对滚动条的监听
        document.addEventListener('scroll', scrollFn = (e) => {
            belowShow(() => {
                let top = Math.abs( document.body.getBoundingClientRect().y );

                this.setState({
                    showBackToTop: top >= 200 ? true : false
                });
            });
        });
    }
    componentWillUnmount() {
        // 解绑事件
        document.removeEventListener('scroll', scrollFn);
    }
    backToTop = () => {
        document.documentElement.scrollTop = 0;
    }
    render() {
        return (
            <div className="pendant">
                { this.state.showBackToTop && <FontAwesomeIcon icon={faArrowUp} className="float-box" onClick={ this.backToTop } /> }
            </div>
        );
    }
}


export default Pendant;