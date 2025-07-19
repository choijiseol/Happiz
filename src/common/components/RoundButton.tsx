import {ButtonAnimation} from "./styles/Button.ts";
import styled from "styled-components";

export default function RoundButton({text}: {text: string}){
    return <Button center>
        {text}
    </Button>
}

const Button = styled(ButtonAnimation)`
    width: 196px;
    height: 36px;
    border: 2px solid #00A9FF;
    border-radius: 100px;
    background-color: #FFFFFF;
    
    font-size: 18px;
    font-weight: 700;
    color: #00A9FF;
`