import {useEffect, useRef, useState} from "react";
import styled, {keyframes, css} from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import ReadyModal from "./components/ReadyModal.tsx";
import FinishModal from "./components/FinishModal.tsx";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import DigitalDisplay from "./components/DigitalDisplay.tsx";

export default function TimeGamePage() {
    const [start, setStart] = useState<boolean>(false);
    const [isClear, setIsClear] = useState<"CLEAR" | "PLAY" | "FALL">("PLAY");
    const [showRemaining, setShowRemaining] = useState<boolean>(false);
    const [showFreeze, setShowFreeze] = useState<boolean>(false);
    const [stopped, setStopped] = useState<boolean>(false);
    const [award, setAward] = useState<number>(0);

    const [targetSeconds, setTargetSeconds] = useState<number>(() => Math.floor(Math.random() * 11) + 5);

    const startRef = useRef<number | null>(null);
    const rafRef = useRef<number>(0);
    const [elapsed, setElapsed] = useState<number>(0);
    const [displayTime, setDisplayTime] = useState<number>(0);

    useEffect(() => {
        if (!start && isClear === "PLAY") {
            const id = setTimeout(() => setStart(true), 3000);
            return () => clearTimeout(id);
        }
    }, [isClear, start]);

    useEffect(() => {
        if (!start) return;
        setShowRemaining(true);
        const id = setTimeout(() => setShowRemaining(false), 3000);
        return () => clearTimeout(id);
    }, [start]);

    // 타이머
    useEffect(() => {
        if (!start || stopped || isClear !== "PLAY") {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            return;
        }

        const tick = (ts: number) => {
            if (startRef.current == null) startRef.current = ts;
            const e = (ts - startRef.current) / 1000;
            setElapsed(e);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [start, stopped, isClear]);

    useEffect(() => {
        if (!start) return;
        if (stopped) return;
        if (isClear !== "PLAY") return;
        if (elapsed >= targetSeconds + 10) {
            handleStop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elapsed, start, stopped, isClear, targetSeconds]);

    // 판정
    const handleStop = () => {
        if (stopped || isClear !== "PLAY") return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setStopped(true);
        setStart(false);

        setDisplayTime(elapsed);
        setShowFreeze(true);

        const diff = Math.abs(targetSeconds - elapsed);
        let coin = 0;
        if (Math.round(diff * 100) === 0) coin = 20;
        else if (diff <= 0.5) coin = 10;
        else if (diff <= 1.5) coin = 5;
        else if (diff <= 2.99) coin = 1;
        else coin = 0;

        setTimeout(() => {
            setAward(coin);
            setIsClear(coin > 0 ? "CLEAR" : "FALL");
            setShowFreeze(false);
        }, 1000);
    };

    // 재시작
    useEffect(() => {
        if (isClear === "PLAY") {
            setStopped(false);
            setAward(0);
            startRef.current = null;
            setElapsed(0);
            setDisplayTime(0);
            setShowFreeze(false);
            setTargetSeconds(Math.floor(Math.random() * 11) + 5);
        }
    }, [isClear]);

    const formatTime = (sec: number) => {
        const s = Math.floor(Math.max(sec, 0));
        const cs = Math.floor((Math.max(sec, 0) - s) * 100);
        const ss = String(s).padStart(2, "0");
        const cc = String(cs).padStart(2, "0");
        return `${ss}:${cc}`;
    };

    return <Flex center gap={70} height={"100%"}>
        {!start && isClear === "PLAY" && !stopped && <ReadyModal/>}
        {isClear !== "PLAY" &&
            <FinishModal fall={isClear === "FALL"}
                         clear={isClear === "CLEAR"}
                         gameFinish={false}
                         setStart={setStart}
                         setIsClear={setIsClear}
                         levelCoin={award}
                         gameType="time"/>
        }

        <Flex gap={15} center>
            <Flex gap={15} center>
                <TargetText>
                    <strong>{targetSeconds}</strong>
                    <small>초</small>
                </TargetText>
            </Flex>
            <TimerImg src={"/assets/img/game/time/timer.svg"}
                      alt="timer"
                      playing={(start || showFreeze) && isClear === "PLAY"}/>
        </Flex>

        <Flex center gap={40}>
            <DigitalDisplay value={formatTime(showFreeze ? displayTime : elapsed)}
                            ghost={!showRemaining && !showFreeze}/>
            <StopButton onClick={() => handleStop()} center>
                STOP
            </StopButton>
        </Flex>
    </Flex>
}

const TargetText = styled.div`
    display: flex;
    align-items: baseline;
    gap: 4px;
    color: #00496F;

    strong {
        font-size: 32px;
        font-weight: 800;
    }

    small {
        font-size: 16px;
        font-weight: 700;
    }
`;

const StopButton = styled(ButtonAnimation)`
    width: 160px;
    height: 70px;
    border-radius: 15px;
    background: #E94949;
    color: white;
    font-size: 38px;
    font-weight: 800;
    position: relative;
    padding-bottom: 10px;
    border: none;

    box-shadow: inset 0 0 0 3px #D41717,
    inset 0 -17px 0 0 #D41717;
`;

const tilt = keyframes`
    from {
        transform: rotate(-20deg);
    }
    to {
        transform: rotate(20deg);
    }
`;

const TimerImg = styled.img<{ playing: boolean }>`
    width: 80px;
    height: 80px;
    transform-origin: 50% 50%;
    will-change: transform;
    ${({playing}) => playing
            ? css`animation: ${tilt} 1.3s ease-in-out infinite alternate;`
            : css`animation: none;
                transform: rotate(0deg);`}
`;
