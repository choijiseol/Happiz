import styled from "styled-components";
import Flex from "./Flex.tsx";
import Text from "./Text.tsx";
import type {CoinType} from "../../redux/userSlice.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {ButtonAnimation} from "./styles/Button.ts";
import {useNavigate} from "react-router";

export default function Header({coin, hasCoin, hasSetting, hasBefore, setOpenSetting}: {
    coin: CoinType,
    hasCoin?: boolean,
    hasSetting?: boolean,
    hasBefore?: boolean,
    setOpenSetting?: (set: boolean) => void
}) {
    const navigate = useNavigate();

    return <Wrapper row spaceBetween>
        {hasBefore &&
            <ButtonAnimation onClick={() => navigate(-1)}>
                <img src={"/assets/img/icon/before-arrow.svg"} alt={"전"}/>
            </ButtonAnimation>
        }
        {hasCoin && <Coin coin={coin}/>}
        {hasSetting &&
            <ButtonAnimation onClick={() => setOpenSetting && setOpenSetting(true)}>
                <img src={"/assets/img/icon/setting.svg"} alt={"설정"}/>
            </ButtonAnimation>
        }
    </Wrapper>
}

const Wrapper = styled(Flex)`
    width: calc(100% - 40px);
    position: absolute;
    padding: 20px;
`;

function Coin({coin}: { coin: CoinType }) {
    const money = useSelector((state: RootState) => state.user.money);

    return <CoinWrapper row verticalCenter>
        <img src={`/assets/img/coin/${coin}1.svg`} alt="coin"/>
        <Text fontSize={24} fontWeight={700} color={"#00496F"} style={{marginTop: 5}}>{money} $</Text>
    </CoinWrapper>
}

const CoinWrapper = styled(Flex)`
    height: 50px;
    padding: 0 12px;
    gap: 10px;
    background-color: #FFFFFF;
    border: 1px solid #00A9FF;
    border-radius: 10px;
`;