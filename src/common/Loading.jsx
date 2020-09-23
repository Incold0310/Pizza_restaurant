import React from "react";
import loading from '../assets/images/loading.png';

function Loading() {
    return (
        <div className="d-flex flex-fill align-items-center justify-content-center">
            <img src={loading} alt="Loading" id="loading" />
        </div>
    )
}

export default Loading;