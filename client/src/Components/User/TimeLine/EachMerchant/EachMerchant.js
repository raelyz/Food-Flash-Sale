import React, { useEffect, useState } from 'react'

export default function EachMerchant(props) {

    // console.log(props.duration);
    // console.log(props.time);
    // console.log(+props.duration - Math.floor((new Date(props.time) / 1000 / 60) % 60))
    var difference;
    const calculateTimeLeft = () => {

        const uploadTime = new Date(props.time)
        uploadTime.setMinutes(uploadTime.getMinutes() + props.duration)
        difference = +uploadTime - +new Date();

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

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => {
            props.what(timeLeft)
            clearTimeout(timer);
        }
    });

    const timerComponents = [];

    // if (timeLeft !== undefined || timeLeft !== null) {
    // console.log(timeLeft)
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span >
                {timeLeft[interval]} {interval}{" "}
            </span >
        );
    });
    // var live = false
    // if (live === false && !timerComponents.length && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    //     console.log(!timerComponents.length)
    //     live = true
    //     console.log(`turned off`)
    //     fetch('/togglelisting', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ listing_id: props.listing, boolean: false })
    //     })
    //         .then((res) => res.text())
    //         .then((res) => {
    //             console.log(res, `set to OFF`)
    //             props.what(timeLeft, props.merchant_Id)
    //             return timeLeft
    //         })
    // }
    return (
        <>
            {
                timerComponents.length ? <div key={props.index}><div className="col-lg-4 col-sm-6 mb-4">
                    <div className="portfolio-item">
                        <div className="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                        </div>
                        <img class="img-fluid" src="assets/img/portfolio/02-thumbnail.jpg" alt="" />
                        <div className="portfolio-caption">
                            <div className="portfolio-caption-heading">{props.children}</div>
                            <div className="portfolio-caption-subheading text-muted"> {timerComponents} </div>
                        </div>
                    </div>
                </div></div> : null
            }
        </>
    )
}


