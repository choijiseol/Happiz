import styled from "styled-components";
import Flex from "../../../common/components/Flex.tsx";
import {useEffect, useState} from "react";
import {BoldText} from "../../../common/components/styles/BoldText.ts";

export default function ReadyModal() {
    const [text, setText] = useState("READY~~");

    useEffect(() => {
        const readyTimer = setTimeout(() => {
            setText("START!!");
        }, 2000);

        const endTimer = setTimeout(() => {
            setText("");
        }, 3000);

        return () => {
            clearTimeout(readyTimer);
            clearTimeout(endTimer);
        };
    }, []);

    if (!text) return null;

    return <ModalBack center>
        <BoldText>{text}</BoldText>
    </ModalBack>
}

const ModalBack = styled(Flex)`
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
`;