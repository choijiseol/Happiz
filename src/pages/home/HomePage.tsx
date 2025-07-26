import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import Text from "../../common/components/Text.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import Header from "../../common/components/Header.tsx";
import {useState} from "react";
import SettingModal from "../../common/components/SettingModal.tsx";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";

export default function HomePage(){
    const coin = useSelector((state: RootState) => state.user.coin);
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const character = useSelector((state: RootState) => state.user.character);

    return <Wrapper>
        <Header coin={coin} hasCoin hasSetting setOpenSetting={setOpenSetting}/>
        {openSetting && <SettingModal setOpenSetting={setOpenSetting}/>}
        <Flex height={"100%"} center gap={30}>
            <ButtonAnimation center>
                <Text fontSize={24} fontWeight={700} color={"#00496F"} style={{position: "absolute", paddingTop: 74}}>상점</Text>
                <img src={`/assets/img/character/${character}_cloud.svg`}/>
            </ButtonAnimation>
            <ButtonAnimation center>
                <Text fontSize={24} fontWeight={700} color={"#00496F"} style={{position: "absolute"}}>시작</Text>
                <img src={"/assets/img/cloud.svg"}/>
            </ButtonAnimation>
        </Flex>
    </Wrapper>
}

const Wrapper = styled(Flex)`
    background-image: url("assets/img/main-back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
`;