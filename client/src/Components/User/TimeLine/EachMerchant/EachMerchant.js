import React, { useEffect, useState } from 'react'

export default function EachMerchant(props) {

    // console.log(props.duration);
    // console.log(props.time);
    // console.log(+props.duration - Math.floor((new Date(props.time) / 1000 / 60) % 60))

    const calculateTimeLeft = () => {
        const uploadTime = new Date(props.time)
        uploadTime.setMinutes(uploadTime.getMinutes() + 300)
        const difference = +uploadTime - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft
    };

    // componentDidMount() {
    //     fetch('/timeline')
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res)

    //         })
    // }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];


    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });


    return (
        <>
            {
                timerComponents.length ? <div key={props.index}>
                    <h1>{props.children}</h1> {timerComponents}</div> : null
            }
        </>
    )
}