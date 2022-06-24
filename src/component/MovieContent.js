import React from "react"
import PropTypes from "prop-types"

import 'style/listpage.css';

function setLocation(title) {
    localStorage.setItem('target', title)
    location.href = '/detail'
}

function Movie({title, poster}) {
    return (
        <div className="listpage-content-result-item">
            <a onClick={() => setLocation(title)}>
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
