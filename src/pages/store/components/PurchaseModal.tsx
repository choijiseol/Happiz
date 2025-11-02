import styled from "styled-components";
import Flex from "../../../common/components/Flex.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../redux/store.ts";
import type {WearingItemType} from "../../../data/wearingData.ts";
import {ButtonAnimation} from "../../../common/components/styles/Button.ts";
import Text from "../../../common/components/Text.tsx";
import {setBuyItem, setMoney, type User} from "../../../redux/userSlice.ts";

export default function PurchaseModal({selectedItem, store, setOpenPurchase}: {
    selectedItem: WearingItemType | null,
    store: string,
    setOpenPurchase: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const dispatch = useDispatch();
    const money = useSelector((state: RootState) => state.user.money);
    const coin = useSelector((state: RootState) => state.user.coin);
    const buyItem = useSelector((state: RootState) => state.user.buyItem);
    const nickname = useSelector((state: RootState) => state.user.nickname);

    const canPurchase = money >= (selectedItem?.price ?? 0);

    const onClickPurchase = () => {
        if (!canPurchase || !selectedItem) return;

        let updatedBuyItem = {...buyItem};

        if (store === "clothes") {
            updatedBuyItem = {
                ...buyItem,
                clothes: [...buyItem.clothes, selectedItem.name],
            };
        } else if (store === "head") {
            updatedBuyItem = {
                ...buyItem,
                head: [...buyItem.head, selectedItem.name],
            };
        } else if (store === "accessories") {
            updatedBuyItem = {
                ...buyItem,
                accessories: [...buyItem.accessories, selectedItem.name],
            };
        } else return;

        const newMoney = money - selectedItem.price;

        dispatch(setBuyItem(updatedBuyItem));
        dispatch(setMoney(newMoney));

        const users = JSON.parse(localStorage.getItem("user") || "[]");

        if (nickname && users.length > 0) {
            const updatedUsers = users.map((u: User) =>
                u.nickname === nickname
                    ? {...u, buyItem: updatedBuyItem, money: newMoney}
                    : u
            );
            localStorage.setItem("user", JSON.stringify(updatedUsers));
        }
        setOpenPurchase(false);
    }

    return <Wrapper center gap={20}>
        <ItemWrapper>
            <Flex center width={"100%"} height={"calc(100% - 30px)"}>
                <img src={`/assets/img/store/wear/${store}/${selectedItem?.name}.svg`}
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

const PurchaseButton = styled(ButtonAnimation)<{ canPurchase: boolean }>`
    width: 80px;
    height: 40px;
    cursor: ${({canPurchase}) => canPurchase ? "pointer" : "auto"};
    background-color: ${({canPurchase}) => canPurchase ? "#ffffff" : "rgba(255,255,255,0.4)"};
    border-radius: 10px;

    font-size: 18px;
    font-weight: 600;
    color: #000000;
`