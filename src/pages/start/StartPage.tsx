import Flex from "../../common/components/Flex.tsx";
import Text from "../../common/components/Text.tsx";
import styled, {keyframes} from "styled-components";
import {useEffect, useState} from "react";
import RoundButton from "../../common/components/RoundButton.tsx";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import type {RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {setCharacter, setCoin, setNickname} from "../../redux/userSlice.ts";
import {useNavigate} from "react-router";

export default function StartPage() {
    const [showMain, setShowMain] = useState(false);
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.nickname);
    const character = useSelector((state: RootState) => state.user.character);

    useEffect(() => {
        const timer = setTimeout(() => setShowMain(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setNickname(e.target.value));
    };

    const characters = ["fox", "hedgehog", "raccoon", "squirrel"] as const;

    const handleClickArrow = (direction: "left" | "right") => {
        const currentIndex = characters.indexOf(character);
        const nextIndex =
            direction === "left"
                ? (currentIndex - 1 + characters.length) % characters.length
                : (currentIndex + 1) % characters.length;

        const nextCharacter = characters[nextIndex];

        const characterToCoinMap = {
            squirrel: "acorn",
            fox: "fish",
            raccoon: "mushroom",
            hedgehog: "blueberry",
        } as const;

        dispatch(setCharacter(nextCharacter));
        dispatch(setCoin(characterToCoinMap[nextCharacter]));
    };

    const navigate = useNavigate();
    const onClickNextButton = () => {
        navigate("/home");
    }

    return <Wrapper center>
        {showMain
            ? <MainWrapper>
                <AnimatedMain verticalBottom horizontalCenter>
                    <img src="assets/img/logo.svg" width={100}/>
                    <Flex gap={10} center>
                        <Title>닉네임 입력</Title>
                        <StyledInput placeholder="닉네임을 입력하세요"
                                     value={nickname}
                                     onChange={handleChangeNickname}/>
                    </Flex>
                    <CharacterWrapper horizontalCenter spaceBetween>
                        <Title>캐릭터 선택</Title>
                        <Flex gap={20} center width={"100%"}>
                            <Flex row spaceBetween center width={"100%"}>
                                <ArrowButton $arrow="left" onClick={() => handleClickArrow("left")}/>
                                <Character character={character} horizontalCenter verticalBottom/>
                                <ArrowButton $arrow="right" onClick={() => handleClickArrow("right")}/>
                            </Flex>
                            <Flex onClick={() => onClickNextButton()}>
                                <RoundButton text={"선택"}/>
                            </Flex>
                        </Flex>
                    </CharacterWrapper>
                </AnimatedMain>
            </MainWrapper>
            : <AnimatedLogo src="assets/img/logo.svg"/>}
    </Wrapper>
}

const fadeInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Wrapper = styled(Flex)`
    background-image: url("assets/img/home-back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
`;

const AnimatedLogo = styled.img`
    width: 200px;
    animation: ${fadeInUp} 2s ease-out forwards;
`;

const MainWrapper = styled(Flex)`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
`;

const AnimatedMain = styled(Flex)`
    height: 100%;
    gap: 40px;
    padding: 60px 36px;
    animation: ${fadeInUp} 0.5s ease-out forwards;
`;

const Title = styled(Text)`
    color: #00496F;
    font-size: 16px;
    font-weight: 700;
`

const StyledInput = styled.input`
    padding: 0;
    width: 270px;
    height: 30px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    border: 5px solid rgba(0, 169, 255, 0.3);
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    color: #00496F;

    &:focus {
        outline: none;
        border-color: rgba(0, 169, 255, 0.5);
        box-shadow: 0 0 4px rgba(97, 195, 255, 0.6);
    }

    &::placeholder {
        color: #00496F;
        font-weight: 400;
    }
`;

const CharacterWrapper = styled(Flex)`
    width: 100%;
    height: 360px;
`;

const ArrowButton = styled(ButtonAnimation)<{ $arrow: string }>`
    width: 35px;
    height: 35px;
    background-image: ${({$arrow}) => `url("/assets/img/icon/${$arrow}-arrow.svg")`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const Character = styled(Flex)<{ character: string }>`
    width: 160px;
    height: 240px;
    background-image: ${({character}) =>
            `url('/assets/img/character/${character}1.png')`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
`;