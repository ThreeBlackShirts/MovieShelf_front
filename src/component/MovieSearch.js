import React from "react"
import PropTypes from "prop-types"

import 'style/listpage.css';

function Movie({title, poster}) {
    return (
        <div className="listpage-content-result-item">
            <a href="/detail/{title}">
                <div className="listpage-content-result-item-pic"><img src={poster}/></div>
                <div className="listpage-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
}
  
export default Movie
