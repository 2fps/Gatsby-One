import React from 'react';

import './pagination.scss';

export default class Pagination extends React.Component {
    render() {
        let {
            currentPage,
            numPages,
        } = this.props;

        let min = currentPage - 2,
            max = currentPage + 2;

        // 计算分页的最大范围，保证分页显示中间5页
        if (min <= 0) {
            max += 1 - min;
            min = 1;
        }
        if (max > numPages) {
            max = numPages;
        }

        return (
            <div className="pagination">
                <ul className="page-lists">
                    <li className="page-list">
                        <a href="/">
                            &lt;
                        </a>
                    </li>
                    {
                        (new Array(max - min + 1)).fill().map((val, ind) => {
                            if (min + ind === currentPage) {
                                return (
                                    <li className="page-list active" key={ ind }>
                                        <a href={ '/' + (min + ind === 1 ? '' : 'page/' + (min + ind) + '/') }>
                                            { min + ind }
                                        </a>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="page-list" key={ ind }>
                                        <a href={ '/' + (min + ind === 1 ? '' : 'page/' + (min + ind) + '/') }>
                                            { min + ind }
                                        </a>
                                    </li>
                                );
                            }
                        })
                    }
                    <li className="page-list">
                        <a href={ numPages }>
                            &gt;
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
