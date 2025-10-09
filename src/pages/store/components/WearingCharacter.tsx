import Flex from "../../../common/components/Flex.tsx";
import styled from "styled-components";
import {useSelector} from "react-redux";
import type {RootState} from "../../../redux/store.ts";

export default function WearingCharacter() {
    const character = useSelector((state: RootState) => state.user.character);

    return <CharacterWrapper verticalBottom horizontalCenter>
        <Flex height={240} width={180} center style={{marginBottom: 200}}>
            <img src={`/assets/img/character/${character}1.png`} style={{scale: 0.7}}/>
        </Flex>
    </CharacterWrapper>
}

const CharacterWrapper = styled(Flex)`
    z-index: 3;
    width: 100%;
    height: 100%;
    position: absolute;
`