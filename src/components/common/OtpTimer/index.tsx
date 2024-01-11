import React, { useState, useEffect } from 'react';
import { STRING } from '../../../constants/String';

const OtpTimer = ({ expiryTimeInSeconds, onResend }: any) => {
    const [seconds, setSeconds] = useState(expiryTimeInSeconds);
    useEffect(() => {
        let interval: any;
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds: any) => prevSeconds - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [seconds]);

    const handleResend = async () => {
        await onResend();
        setSeconds(expiryTimeInSeconds);
    };

    const formatTime = (time: any) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    return (
        <div>

            {seconds === 0 ? (
                <span onClick={handleResend} className='text-main cursor-pointer underline' >
                    {STRING.RESEND_OPT}
                </span>
            ) : <p>{STRING.TIME_REMAINING}<span className="text-main">{formatTime(seconds)}</span></p>
            }
        </div>
    );
};

export default OtpTimer;
