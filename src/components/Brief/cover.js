import React from "react";
import { Link } from "gatsby";

const Cover = ({ path, cover}) => {
  return (
        <Link className="thumbnail-wrapper" to={ path }>
            <div className="thumbnail-img">
                <img src={ cover } alt="" width="300" height="181" />
            </div>
        </Link>
    )
};

export default Cover;