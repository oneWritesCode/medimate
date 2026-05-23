import React from "react";

function Lines(): React.ReactElement {
    return (
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
                <pattern id="blueGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#9c9c9c" stroke-width="0.3" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueGrid)" />
        </svg>
    )
}

export default Lines

