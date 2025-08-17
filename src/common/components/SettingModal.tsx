import styled from "styled-components";
import Flex from "./Flex.tsx";
import Text from "./Text.tsx";
import {ButtonAnimation} from "./styles/Button.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {useNavigate} from "react-router";
import {setCharacter, setNickname} from "../../redux/userSlice.ts";

export default function SettingModal({setOpenSetting}: { setOpenSetting: (set: boolean) => void }) {
    const nickname = useSelector((state: RootState) => state.user.nickname);
    const character = useSelector((state: RootState) => state.user.character);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickLogout = () => {
        const confirmed = window.confirm('로그아웃 하시겠습니까?');
        if (confirmed) {
            dispatch(setNickname(""));
            dispatch(setCharacter("squirrel"));
            localStorage.removeItem("currentUser");
            navigate('/start');
        }
    };

    return <ModalWrapper center onClick={() => setOpenSetting(false)}>
        <Modal onClick={(e) => e.stopPropagation()}>
            <Flex flexEnd>
                <ButtonAnimation onClick={() => setOpenSetting(false)}>
                    <img src={"/assets/img/icon/close.svg"} alt={"닫기"}/>
                </ButtonAnimation>
            </Flex>
            <Flex gap={30}>
                <Flex gap={10}>
                    <BlueWrapper gap={5}>
                        <Text fontSize={12} fontWeight={400}>아이디</Text>
                        <Text fontSize={20} fontWeight={700} color={"#000000"}>{nickname}</Text>
                    </BlueWrapper>
                    <BlueWrapper height={138}>
                        <Text fontSize={12} fontWeight={400}>캐릭터</Text>
                        <Flex row verticalBottom horizontalCenter gap={36}>
                            <Flex center>
                                <Tag center>현재 선택</Tag>
                                <img src={`/assets/img/character/${character}_face.svg`} height={100}/>
                            </Flex>
                            <ButtonAnimation onClick={() => navigate('/start')}>
                                <img src={"/assets/img/icon/change_character.svg"}/>
                            </ButtonAnimation>
                        </Flex>
                    </BlueWrapper>
                </Flex>
                <Flex gap={10}>
                    <Button center>초기화</Button>
                    <Button center onClick={onClickLogout}>로그아웃</Button>
                </Flex>
            </Flex>
        </Modal>
    </ModalWrapper>
}

const ModalWrapper = styled(Flex)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 2;
`

const Modal = styled(Flex)`
    width: 280px;
    height: 400px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 14px 20px;
    gap: 20px;
`

const BlueWrapper = styled(Flex)`
    border-radius: 5px;
    background-color: #EAF9FD;
    color: #00496F;
    padding: 8px 10px;
`

const Button = styled(ButtonAnimation)`
    height: 40px;
    border-radius: 5px;
    background-color: #EAF9FD;
    color: #00496F;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
`

const Tag = styled(Flex)`
    width: 40px;
    height: 14px;
    background-color: #48A9F8;
    border-radius: 100px;
    font-size: 8px;
    font-weight: 400;
    color: #FFFFFF;
`