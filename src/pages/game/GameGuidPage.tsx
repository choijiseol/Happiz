import {useNavigate, useParams} from "react-router";
import {games, type GameType} from "../../data/gameData.ts";
import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import Text from "../../common/components/Text.tsx";
import Header from "../../common/components/Header.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import type {CoinType} from "../../redux/userSlice.ts";
import RoundButton from "../../common/components/RoundButton.tsx";

const gameGuides: Record<GameType, React.ReactNode> = {
    color: <Text fontSize={16} fontWeight={400} color={"#000000"} center style={{height: 96}}>
        비슷한 색깔 중에 다른 색깔을 골라봐요!<br/>
        총 10단계로 <Text fontWeight={800}>단계가 오를수록 더 많은</Text><br/>
        <Text fontWeight={800}>코인</Text>을 얻을 수 있어요.<br/>
        틀리는 순간 <Text fontWeight={800}>game over!</Text> 조심하세요.
    </Text>,
    picture: <Text fontSize={16} fontWeight={400} color={"#000000"} center style={{height: 96}}>
        비슷한 그림 중에 다른 그림을 골라봐요!<br/>
        총 10단계로 <Text fontWeight={800}>단계가 오를수록 더 많은</Text><br/>
        <Text fontWeight={800}>코인</Text>을 얻을 수 있어요.<br/>
        틀리는 순간 <Text fontWeight={800}>game over!</Text><br/>
        <Text fontWeight={800}>시간 제한</Text>도 있으니 조심하세요.
    </Text>,
    time: <Text fontSize={16} fontWeight={400} color={"#000000"} center style={{height: 96}}>
        중간에 가려지는 시간을 맞춰봐요!<br/>
        <Text fontWeight={800}>가깝게 맞출수록 더 많은 코인</Text>을<br/>
        얻을 수 있어요.
    </Text>,
    gag: <Text fontSize={16} fontWeight={400} color={"#000000"} center style={{height: 96}}>
        계속해서 나오는 아재개그<br/>
        문제를 풀어봐요!<br/>
        <Text fontWeight={800}>맞춘만큼 코인</Text>을 얻을 수 있어요.
    </Text>,
    press: <Text fontSize={16} fontWeight={400} color={"#000000"} center style={{height: 96}}>
        <Text fontWeight={800}>제한시간</Text> 안에 최대한 <Text fontWeight={800}>빠르게</Text><br/>
        <Text fontWeight={800}>스페이스바</Text>를 누르세요!<br/>
        많이 누를수록 더 많은 코인을<br/>
        얻을 수 있어요.
    </Text>,
    puzzle: <Text fontSize={16} fontWeight={400} color={"#000000"} center style={{height: 96}}>
        온통 검을색인 블랙퍼즐을 풀어봐요!<br/>
        총 4단계로 <Text fontWeight={800}>단계가 오를수록 더 많은</Text><br/>
        <Text fontWeight={800}>코인</Text>을 얻을 수 있어요.<br/>
        <Text fontWeight={800}>시간 제한</Text>이 있으니 집중해 맞춰봐요.
    </Text>
};

const gameCoinGuides: Record<GameType, (coin: CoinType) => React.ReactNode> = {
    color: (coin) => <Flex gap={10}>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>1단계 - 4단계</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+1</Text>
            </Flex>
        </Flex>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>5단계 - 8단계</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+3</Text>
            </Flex>
        </Flex>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>9단계 - 10단계</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+10</Text>
            </Flex>
        </Flex>
    </Flex>,
    picture: (coin) => <Flex gap={10}>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>1단계 - 4단계</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+1</Text>
            </Flex>
        </Flex>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>5단계 - 8단계</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+3</Text>
            </Flex>
        </Flex>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>9단계 - 10단계</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+10</Text>
            </Flex>
        </Flex>
    </Flex>,
    time: (coin) => <Flex gap={10}>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>맞추는 시간에 따라</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+1 ~ +5</Text>
            </Flex>
        </Flex>
    </Flex>,
    gag: (coin) => <Flex gap={10}>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>한 문제에</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+2</Text>
            </Flex>
        </Flex>
    </Flex>,
    press: (coin) => <Flex gap={10}>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>30번 이상 누르면</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+1</Text>
            </Flex>
        </Flex>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>60번 이상 누르면</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+3</Text>
            </Flex>
        </Flex>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>100번 이상 누르면</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+10</Text>
            </Flex>
        </Flex>
    </Flex>,
    puzzle: (coin) => <Flex gap={10}>
        <Flex row gap={60}>
            <Flex gap={5} width={50}>
                <Text fontSize={12} fontWeight={400} color={"#000000"}>1단계</Text>
                <Flex gap={6} row verticalCenter>
                    <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                    <Text fontSize={18} fontWeight={700} color={"#000000"}>+1</Text>
                </Flex>
            </Flex>
            <Flex gap={5}>
                <Text fontSize={12} fontWeight={400} color={"#000000"}>4단계</Text>
                <Flex gap={6} row verticalCenter>
                    <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                    <Text fontSize={18} fontWeight={700} color={"#000000"}>+10</Text>
                </Flex>
            </Flex>
        </Flex>
        <Flex row gap={60}>
            <Flex gap={5} width={50}>
                <Text fontSize={12} fontWeight={400} color={"#000000"}>2단계</Text>
                <Flex gap={6} row verticalCenter>
                    <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                    <Text fontSize={18} fontWeight={700} color={"#000000"}>+4</Text>
                </Flex>
            </Flex>
            <Flex gap={5}>
                <Text fontSize={12} fontWeight={400} color={"#000000"}>5단계</Text>
                <Flex gap={6} row verticalCenter>
                    <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                    <Text fontSize={18} fontWeight={700} color={"#000000"}>+20</Text>
                </Flex>
            </Flex>
        </Flex>
        <Flex gap={5}>
            <Text fontSize={12} fontWeight={400} color={"#000000"}>3단계</Text>
            <Flex gap={6} row verticalCenter>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" width={18}/>
                <Text fontSize={18} fontWeight={700} color={"#000000"}>+6</Text>
            </Flex>
        </Flex>
    </Flex>,
}

export default function GameGuidPage() {
    const {type} = useParams();
    const navigate = useNavigate();
    const game = games[type as keyof typeof games];
    const guide = gameGuides[type as GameType];
    const coin = useSelector((state: RootState) => state.user.coin);
    const coinGuide = gameCoinGuides[type as GameType](coin);

    return <Wrapper>
        <BackgroundFilter/>
        <Header hasBefore hasCoin/>
        <Flex center height={"100%"}>
            <ModalWrapper center gap={20}>
                <Text fontSize={24} fontWeight={700} color={"#00496F"}>{game.name}</Text>
                {guide}
                <CoinWrapper>
                    <CointGuidWrapper>
                        <Flex width={200} center style={{position: "absolute", top: -18}}>
                            <img src={`/assets/img/coin/${coin}s.svg`} alt="coin"/>
                        </Flex>
                        {coinGuide}
                    </CointGuidWrapper>
                </CoinWrapper>
                <Flex onClick={() => navigate(`/game/${type}/play`)}>
                    <RoundButton text={"선택"}/>
                </Flex>
            </ModalWrapper>
        </Flex>
    </Wrapper>
}

const Wrapper = styled(Flex)`
    background-image: url("/assets/img/home_back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const BackgroundFilter = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
`;

const ModalWrapper = styled(Flex)`
    width: 320px;
    height: 560px;
    background-color: #FFFFFF;
    border-radius: 12px;
    z-index: 2;
`

const CoinWrapper = styled(Flex)`
    width: 240px;
    height: 255px;
`

const CointGuidWrapper = styled(Flex)`
    position: relative;
    width: 220px;
    height: 238px;
    border-radius: 10px;
    border: 1px solid #00A9FF;
    margin-top: 18px;
    padding-top: 40px;
    padding-left: 20px;

`