import styled from "styled-components";
import Flex from "../../../common/components/Flex.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../redux/store.ts";
import type {WearingItem} from "../../../data/wearingData.ts";
import {ButtonAnimation} from "../../../common/components/styles/Button.ts";
import Text from "../../../common/components/Text.tsx";

export default function PurchaseModal({selectedItem, store}: { selectedItem: WearingItem | null, store: string }) {
    const money = useSelector((state: RootState) => state.user.money);
    const coin = useSelector((state: RootState) => state.user.coin);

    const canPurchase = money >= (selectedItem?.price ?? 0);

    const onClickPurchase = () => {
        if(!canPurchase) return;
    }

    return <Wrapper center gap={20}>
        <ItemWrapper>
            <Flex center width={"100%"} height={"calc(100% - 30px)"}>
                <img src={`/assets/img/store/weare/${store}/${selectedItem?.name}.svg`}
                     style={{
                         height: store === "accessories" ? 100 : "auto",
                         scale: store === "clothes" ? 1.5 : 1
                     }}/>
            </Flex>
            <PriceWrapper row center gap={5}>
                <img src={`/assets/img/coin/${coin}.svg`} alt="coin" height={21}/>
                {selectedItem?.price}
            </PriceWrapper>
        </ItemWrapper>
        <Flex gap={10} center>
            <PurchaseButton center canPurchase={canPurchase} onClick={onClickPurchase}>구매</PurchaseButton>
            {!canPurchase && <Text fontSize={14} fontWeight={400} color={"#ffffff"}>돈이 부족해요.</Text>}
        </Flex>
    </Wrapper>
}

const Wrapper = styled(Flex)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 4;
    backdrop-filter: blur(8px);
`

const ItemWrapper = styled(Flex)`
    position: relative;
    width: 165px;
    height: 154px;
    background-color: #FEE3BF;
`

const PriceWrapper = styled(Flex)`
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 0;
    background-color: #ffffff;
    font-size: 21px;
    font-weight: 400;
    color: #000000;
`

const PurchaseButton = styled(ButtonAnimation)<{canPurchase: boolean}>`
    width: 80px;
    height: 40px;
    cursor: ${({canPurchase}) => canPurchase ? "pointer" : "auto"};
    background-color: ${({canPurchase}) => canPurchase ? "#ffffff" : "rgba(255,255,255,0.4)"};
    border-radius: 10px;
    
    font-size: 18px;
    font-weight: 600;
    color: #000000;
`