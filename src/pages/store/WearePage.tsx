import Flex from "../../common/components/Flex.tsx";
import styled from "styled-components";
import Header from "../../common/components/Header.tsx";

export default function WearePage() {
    return <Wrapper>
        <BackBlur/>
        <Header hasBefore hasSave/>
        <WeareWrapper>
            <Flex height={35}>

            </Flex>
        </WeareWrapper>
    </Wrapper>
}

// 중복 많음. (ex StorePage)
const Wrapper = styled(Flex)`
    background-image: url("/assets/img/main_back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
`

const BackBlur = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    filter: blur(4px);
    z-index: 1;
`

const WeareWrapper = styled(Flex)`
    
`
