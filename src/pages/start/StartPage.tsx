import Flex from "../../common/components/Flex.tsx";
import Text from "../../common/components/Text.tsx";
import styled, {keyframes} from "styled-components";
import {useEffect, useState} from "react";
import RoundButton from "../../common/components/RoundButton.tsx";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import type {RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {type CharacterType, setCharacter, setCoin, setMoney, setNickname} from "../../redux/userSlice.ts";
import {useNavigate} from "react-router";

const characters = ["fox", "hedgehog", "raccoon", "squirrel"] as const;

const characterToCoinMap = {
    squirrel: "acorn",
    fox: "fish",
    raccoon: "mushroom",
    hedgehog: "blueberry",
} as const;

type User = {
    nickname: string;
    character: CharacterType;
    money: number;
};

const getUsersFromStorage = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) as User[] : [];
};

const saveUsersToStorage = (users: User[]) => {
    localStorage.setItem("user", JSON.stringify(users));
};

const updateUserInStorage = (nickname: string, updater: (u: User) => User) => {
    const users = getUsersFromStorage();
    const updated = users.map(u => (u.nickname === nickname ? updater(u) : u));
    saveUsersToStorage(updated);
};

export default function StartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nickname = useSelector((state: RootState) => state.user.nickname);
    const character = useSelector((state: RootState) => state.user.character);

    const [showMain, setShowMain] = useState(false);
    const [inputNickname, setInputNickname] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (nickname) {
            setShowMain(true);
        } else {
            const timer = setTimeout(() => setShowMain(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [nickname]);

    const handleClickArrow = (direction: "left" | "right") => {
        const currentIndex = characters.indexOf(character);
        const nextIndex =
            direction === "left"
                ? (currentIndex - 1 + characters.length) % characters.length
                : (currentIndex + 1) % characters.length;

        const nextCharacter = characters[nextIndex];
        dispatch(setCharacter(nextCharacter));
        dispatch(setCoin(characterToCoinMap[nextCharacter]));

        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            updateUserInStorage(currentUser, u => ({ ...u, character: nextCharacter }));
        }
    };

    const onClickNextButton = () => {
        if (nickname.length !== 0) {
            localStorage.setItem("currentUser", nickname);
            navigate("/home");
            return;
        }

        if (!inputNickname.trim()) {
            setShowWarning(true);
            return;
        }

        const users = getUsersFromStorage();
        const isDuplicate = users.some(u => u.nickname === inputNickname);
        if (isDuplicate) {
            setShowWarning(true);
            return;
        }

        const newUser = { nickname: inputNickname, character, money: 0 };
        dispatch(setNickname(inputNickname));
        saveUsersToStorage([...users, newUser]);
        localStorage.setItem("currentUser", inputNickname);

        navigate("/home");
    };

    const onClickLogin = () => {
        const users = getUsersFromStorage();
        const candidate = (nickname || inputNickname).trim();

        if (!candidate) {
            setShowWarning(true);
            return;
        }

        const user = users.find(u => u.nickname === candidate);
        if (!user) {
            setShowWarning(true);
            return;
        }

        if (nickname !== candidate) {
            dispatch(setNickname(candidate));
        }

        if (user.character) {
            dispatch(setCharacter(user.character));
            dispatch(setCoin(characterToCoinMap[user.character as keyof typeof characterToCoinMap]));
        }

        dispatch(setMoney(user.money));

        localStorage.setItem("currentUser", candidate);
        setShowWarning(false);
        navigate("/home");
    };

    return <Wrapper center>
        {showMain &&
            <>
                {!nickname && isLogin
                    ? <MainWrapper>
                        <AnimatedMain center>
                            <img src="assets/img/logo.svg" width={100}/>
                            <Flex gap={10} center style={{position: "relative"}}>
                                <Title>닉네임 입력</Title>
                                <StyledInput placeholder="닉네임을 입력하세요"
                                             value={inputNickname}
                                             onChange={(e) => setInputNickname(e.target.value)}
                                             onFocus={() => setShowWarning(false)}/>
                                {(showWarning && inputNickname.length === 0)
                                    ? <WarningMessage>닉네임을 입력해주세요.</WarningMessage>
                                    : showWarning ? <WarningMessage>닉네임이 존재하지 않습니다. 회원가입을 해주세요.</WarningMessage>
                                        : <></>}
                            </Flex>
                            <Flex gap={10}>
                                <Flex onClick={onClickLogin}>
                                    <RoundButton text={"로그인"}/>
                                </Flex>
                                <Flex onClick={() => setIsLogin(false)}>
                                    <RoundButton text={"회원가입 하러가기"}/>
                                </Flex>
                            </Flex>
                        </AnimatedMain>
                    </MainWrapper>
                    : <MainWrapper>
                        <Flex style={{position: "absolute", zIndex: 10, padding: 20}}>
                            <ButtonAnimation onClick={() => setIsLogin(true)}>
                                <img src={"/assets/img/icon/before-arrow.svg"} alt={"전"}/>
                            </ButtonAnimation>
                        </Flex>
                        <AnimatedMain verticalBottom horizontalCenter>
                            {!nickname && <>
                                <img src="assets/img/logo.svg" width={100}/>
                                <Flex gap={10} center style={{position: "relative"}}>
                                    <Title>닉네임 입력</Title>
                                    <StyledInput placeholder="닉네임을 입력하세요"
                                                 value={inputNickname}
                                                 onChange={(e) => setInputNickname(e.target.value)}
                                                 onFocus={() => setShowWarning(false)}/>
                                    {(showWarning && inputNickname.length === 0)
                                        ? <WarningMessage>닉네임을 입력해주세요.</WarningMessage>
                                        : showWarning ? <WarningMessage>이미 존재하는 닉네임입니다.</WarningMessage>
                                            : <></>}
                                </Flex>
                            </>}
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
                }
            </>
        }
        {(!nickname && !showMain) &&
            <AnimatedLogo src="assets/img/logo.svg"/>
        }
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
    background-image: url("/assets/img/home_back.svg");
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

const WarningMessage = styled(Text)`
    font-size: 12px;
    font-weight: 600;
    color: #ea3535;
    position: absolute;
    bottom: -18px;
`

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