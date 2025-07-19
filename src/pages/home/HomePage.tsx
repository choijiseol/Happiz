import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";

export default function HomePage(){
    const nickname = useSelector((state: RootState) => state.user.nickname);
    const character = useSelector((state: RootState) => state.user.character);
    console.log(nickname, character);

    return <Wrapper>

    </Wrapper>
}

const Wrapper = styled(Flex)`
    background-image: url("assets/img/home-back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
`;