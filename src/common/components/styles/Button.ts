import styled from "styled-components";
import Flex from "../Flex.tsx";

export const ButtonAnimation = styled(Flex)`
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.7);
    }
`
