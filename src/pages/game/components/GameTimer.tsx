import styled from "styled-components";
import Flex from "../../../common/components/Flex.tsx";
import {useEffect, useState, useRef} from "react";

export default function GameTimer({timer, start, stop, setEnd}: {
    timer: number;
    start: boolean,
    stop: boolean,
    setEnd: (value: boolean) => void;
}) {
    const [timeLeft, setTimeLeft] = useState(timer);
    const startTimeRef = useRef<number | null>(null);
    const animationFrameIdRef = useRef<number>(0);

    useEffect(() => {
        if (!start) {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            startTimeRef.current = null;
            setTimeLeft(timer);
            return;
        }

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }
            const elapsed = (timestamp - startTimeRef.current) / 1000;
            const remaining = Math.max(timer - elapsed, 0);
            setTimeLeft(remaining);

            if (remaining <= 0) {
                setEnd(true);
                return;
            }

            if (!stop) {
                animationFrameIdRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [start, stop, timer, setEnd]);

    const percentage = (timeLeft / timer) * 100;

    return <TimerWrapper>
        <Pie percentage={percentage}/>
        <TimeText>{Math.ceil(timeLeft)}</TimeText>
    </TimerWrapper>
}

const TimerWrapper = styled(Flex)`
    position: relative;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: center;
`;

const Pie = styled.div<{ percentage: number }>`
    position: absolute;
    width: 76px;
    height: 76px;
    border: solid 2px #00496F;
    border-radius: 50%;
    background: conic-gradient(
        #4D809A ${({percentage}) => 100 - percentage}%,
        #00496F ${({percentage}) => 100 - percentage}%
    );
    transition: background 0.05s linear;
`;

const TimeText = styled.div`
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    color: white;
`;
