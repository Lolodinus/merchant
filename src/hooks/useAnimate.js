import React, { useState, useEffect } from "react";


export function useAnimate(event) {
    const [animate, setAnimate] = useState(false);
    const nodegRef = React.useRef(null);

    useEffect(() => {
        setAnimate(true);
    },[event])

    return {
        ref: nodegRef,
        state: animate,
        setState: setAnimate
    }
}