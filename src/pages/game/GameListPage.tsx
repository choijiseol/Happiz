import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import Header from "../../common/components/Header.tsx";
import {games} from "../../data/gameData.ts";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import {useNavigate} from "react-router";

export default function GameListPage() {
    const navigate = useNavigate();

    return <Wrapper horizontalCenter>
        <BackgroundFilter/>
        <Header hasBefore hasCoin/>
        <ListWrapper horizontalCenter>
            {Object.entries(games).map(([key, game]) => (
                <ButtonAnimation width={320} onClick={() => navigate(`/game/${key}`)}>
                    <img key={key} src={game.listImg}/>
                </ButtonAnimation>
            ))}
        </ListWrapper>
    </Wrapper>
}

const Wrapper = styled(Flex)`
    background-image: url("/assets/img/home_back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const BackgroundFilter = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
`;

const ListWrapper = styled(Flex)`
    position: absolute;
    width: 350px;
    height: calc(100% - 120px);
    bottom: 20px;
    z-index: 2;
    gap: 15px;
    padding-top: 10px;

    overflow-x: visible;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`
