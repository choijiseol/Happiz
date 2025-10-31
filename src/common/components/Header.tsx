import styled from "styled-components";
import Flex from "./Flex.tsx";
import Text from "./Text.tsx";
import type {CoinType, User} from "../../redux/userSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {ButtonAnimation} from "./styles/Button.ts";
import {useNavigate} from "react-router";
import {setColorLevel} from "../../redux/gameSlice.ts";

export default function Header({hasCoin, hasSetting, hasBefore, hasSave, isGame, setOpenSetting, setOpenPurchase}: {
    hasCoin?: boolean,
    hasSetting?: boolean,
    hasBefore?: boolean,
    hasSave?: boolean
    isGame?: boolean,
    setOpenSetting?: (set: boolean) => void,
    setOpenPurchase?: React.Dispatch<React.SetStateAction<boolean>> | null
}) {
    const navigate = useNavigate();
    const coin = useSelector((state: RootState) => state.user.coin);
    const wearingItem = useSelector((state: RootState) => state.user.wearingItem);
    const nickname = useSelector((state: RootState) => state.user.nickname);

    const dispatch = useDispatch();
    const onClickBefore = () => {
        if (isGame) dispatch(setColorLevel(1));
        if (setOpenPurchase) setOpenPurchase(false);
        else navigate(-1);
    }

    const onClickSave = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const userData = JSON.parse(storedUser) as Record<string, User>;

        const updatedUserData = Object.entries(userData).reduce((acc, [key, value]) => {
            if (value.nickname === nickname) {
                acc[key] = {...value, wearingItem: wearingItem,};
            } else {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, User>);

        localStorage.setItem("user", JSON.stringify(updatedUserData));
    };



    return <Wrapper row spaceBetween>
        {hasBefore &&
            <ButtonAnimation onClick={onClickBefore}>
                <img src={"/assets/img/icon/before-arrow.svg"} alt={"전"}/>
            </ButtonAnimation>
        }
        {hasCoin && <Coin coin={coin}/>}
        {hasSave && <SaveButton center onClick={onClickSave}>저장</SaveButton>}
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
    z-index: 5;
`;

const SaveButton = styled(ButtonAnimation)`
    width: 80px;
    height: 40px;
    border-radius: 10px;
    background-color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    color: #000000;
`

function Coin({coin}: { coin: CoinType }) {
    const money = useSelector((state: RootState) => state.user.money);

    return <CoinWrapper row verticalCenter>
        <img src={`/assets/img/coin/${coin}.svg`} alt="coin"/>
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