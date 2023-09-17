import React from "react"
import errorIcon from "../images/errorIcon.png"

export default function Error() {
    return (
        <div className="errorContainer">
            <img src={errorIcon} className="errorIcon" alt='' />
            <h1>404</h1>
            <p>Looks like you took a wrong turn.</p>
            <p>Use the menu buttons to navigate back to other parts of the app.</p>
        </div>
    )
}
