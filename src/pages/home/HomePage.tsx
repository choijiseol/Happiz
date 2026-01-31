import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import Text from "../../common/components/Text.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import Header from "../../common/components/Header.tsx";
import {useState} from "react";
import SettingModal from "../../common/components/SettingModal.tsx";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import {useNavigate} from "react-router";

export default function HomePage(){
    const [openSetting, setOpenSetting] = useState<boolean>(false);
    const character = useSelector((state: RootState) => state.user.character);
    const navigate = useNavigate();
    const wearingItem = useSelector((state: RootState) => state.user.wearingItem);

    return <Wrapper>
        <Header hasCoin hasSetting setOpenSetting={setOpenSetting}/>
        {openSetting && <SettingModal setOpenSetting={setOpenSetting}/>}
        <Flex height={"100%"} center gap={30}>
            <ButtonAnimation center onClick={() => navigate("/store")}>
                <Text fontSize={24} fontWeight={700} color={"#00496F"} style={{position: "absolute", paddingTop: 74}}>상점</Text>
                <img src={`/assets/img/character/cloud/${character}_cloud${wearingItem.head ? `_${wearingItem.head}` : ""}.svg`}/>
            </ButtonAnimation>
            <ButtonAnimation center onClick={() => navigate("/list")}>
                <Text fontSize={24} fontWeight={700} color={"#00496F"} style={{position: "absolute"}}>시작</Text>
                <img src={"/assets/img/cloud.svg"}/>
            </ButtonAnimation>
        </Flex>
    </Wrapper>
}

const Wrapper = styled(Flex)`
    background-image: url("/assets/img/main_back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
`;