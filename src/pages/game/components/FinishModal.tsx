import styled from "styled-components";
import Flex from "../../../common/components/Flex.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../redux/store.ts";
import Header from "../../../common/components/Header.tsx";
import RoundButton from "../../../common/components/RoundButton.tsx";
import {BoldText} from "../../../common/components/styles/BoldText.ts";
import * as React from "react";
import Text from "../../../common/components/Text.tsx";
import {useEffect} from "react";
import {setMoney} from "../../../redux/userSlice.ts";
import {setColorLevel} from "../../../redux/gameSlice.ts";
import {useNavigate} from "react-router";

export default function FinishModal({fall, clear, levelCoin, gameFinish, setStart, setIsClear}: {
    fall: boolean,
    clear: boolean,
    levelCoin: number,
    gameFinish: boolean,
    setStart: React.Dispatch<React.SetStateAction<boolean>>,
    setIsClear: React.Dispatch<React.SetStateAction<"CLEAR" | "PLAY" | "FALL">>
}) {
    const colorLevel = useSelector((state: RootState) => state.game.colorLevel);
    const coin = useSelector((state: RootState) => state.user.coin);
    const money = useSelector((state: RootState) => state.user.money);
    const nickname = useSelector((state: RootState) => state.user.nickname);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickNextButton = () => {
        if (clear) dispatch(setColorLevel(colorLevel + 1));
        setStart(true);
        setIsClear("PLAY");
    }

    useEffect(() => {
        if (clear) {
            const newMoney = money + levelCoin;
            dispatch(setMoney(newMoney));

            const users = JSON.parse(localStorage.getItem("user") || "[]");

            if (nickname && users.length > 0) {
                const updatedUsers = users.map((u: { nickname: string; character: string; money: number }) =>
                    u.nickname === nickname ? { ...u, money: newMoney } : u
                );
                localStorage.setItem("user", JSON.stringify(updatedUsers));
            }
        }
    }, [clear]);

    return <ModalBack>
        <Header hasBefore={true}/>
        {gameFinish
            ? <Flex height={"100%"} center gap={60}>
                <BoldText>완벽 CLEAR!!!</BoldText>
                <Flex onClick={() => navigate(-1)}>
                    <RoundButton text={"홈으로"}/>
                </Flex>
            </Flex>
            : fall ? <Flex height={"100%"} gap={60} center>
                    <BoldText>GAME OVER</BoldText>
                    <Flex onClick={onClickNextButton}>
                        <RoundButton text={"다시하기"}/>
                    </Flex>
                </Flex>
                : clear ? <Flex height={"100%"} gap={60} center>
                        <Flex gap={10} center>
                            <BoldText>{colorLevel}단계 CLEAR!!</BoldText>
                            <CoinWrapper gap={5} row center>
                                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" height={38}/>
                                <Text fontSize={28} fontWeight={700} color={"#00496F"}>+{levelCoin}</Text>
                            </CoinWrapper>
                        </Flex>
                        <Flex onClick={onClickNextButton}>
                            <RoundButton text={"다음 단계"}/>
                        </Flex>
                    </Flex>
                    : <></>
        }
    </ModalBack>
}

const ModalBack = styled(Flex)`
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
`;

const CoinWrapper = styled(Flex)`
    width: 100px;
    height: 48px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.7);
`