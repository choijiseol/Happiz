import styled from "styled-components";
import Flex from "../../../common/components/Flex.tsx";

const DIGITS: Record<string, [boolean, boolean, boolean, boolean, boolean, boolean, boolean]> = {
    "0": [true, true, true, true, true, true, false],
    "1": [false, true, true, false, false, false, false],
    "2": [true, true, false, true, true, false, true],
    "3": [true, true, true, true, false, false, true],
    "4": [false, true, true, false, false, true, true],
    "5": [true, false, true, true, false, true, true],
    "6": [true, false, true, true, true, true, true],
    "7": [true, true, true, false, false, false, false],
    "8": [true, true, true, true, true, true, true],
    "9": [true, true, true, true, false, true, true],
};

export default function DigitalDisplay({value, ghost = false}: { value: string; ghost?: boolean }) {
    const chars = value.padStart(5, "0").slice(0, 5).split("");
    return <Wrapper row center gap={16}>
        {chars.map((ch, idx) => {
            if (ch === ":") return <Colon key={`c-${idx}`} ghost={ghost}/>;
            return <Digit key={`d-${idx}`} char={ch} ghost={ghost}/>;
        })}
    </Wrapper>
}

function Digit({char, ghost}: { char: string; ghost?: boolean }) {
    const seg = DIGITS[char] || DIGITS["0"];
    return <DigitBox>
        <HSeg top active={seg[0]} ghost={ghost}/>
        <HSeg middle active={seg[6]} ghost={ghost}/>
        <HSeg bottom active={seg[3]} ghost={ghost}/>
        <VSeg left upper active={seg[5]} ghost={ghost}/>
        <VSeg left lower active={seg[4]} ghost={ghost}/>
        <VSeg right upper active={seg[1]} ghost={ghost}/>
        <VSeg right lower active={seg[2]} ghost={ghost}/>
    </DigitBox>
}

const Wrapper = styled(Flex)`
    width: 290px;
    height: 86px;
    border-radius: 20px;
    padding: 12px 15px;
    background: #FFFFFF;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02);
`;

const DigitBox = styled.div`
    position: relative;
    width: 55px;
    height: 87px;
`;

const segmentOn = "#000000";
const segmentOff = "#E6E6E6";

const HSeg = styled.div<{
    active: boolean,
    top?: boolean,
    middle?: boolean,
    bottom?: boolean,
    ghost?: boolean,
}>`
    position: absolute;
    left: 5px;
    right: 5px;
    height: 8px;

    border-radius: 10px;
    background: ${({active, ghost}) => (ghost ? segmentOff : (active ? segmentOn : segmentOff))};
    ${({top}) => top ? `top: 0;` : ""}
    ${({middle}) => middle ? `top: calc(50% - 4px);` : ""}
    ${({bottom}) => bottom ? `bottom: 0;` : ""}
`;

const VSeg = styled.div<{
    active: boolean,
    left?: boolean,
    right?: boolean,
    upper?: boolean,
    lower?: boolean,
    ghost?: boolean,
}>`
    position: absolute;
    width: 8px;
    top: 5px;
    bottom: 5px;
    border-radius: 10px;
    background: ${({active, ghost}) => (ghost ? segmentOff : (active ? segmentOn : segmentOff))};
    ${({left}) => left ? `left: 0;` : ""}
    ${({right}) => right ? `right: 0;` : ""}
    ${({upper}) => upper ? `height: 32px; top: 8px;` : ""}
    ${({lower}) => lower ? `height: 32px; bottom: 8px; top: auto;` : ""}
`;

const Colon = styled.div<{ ghost?: boolean }>`
    position: relative;
    width: 10px;
    height: 40px;

    &:before, &:after {
        content: "";
        position: absolute;
        left: 50%;
        width: 10px;
        height: 10px;
        margin-left: -4px;
        border-radius: 50%;
        background: ${({ghost}) => (ghost ? segmentOff : segmentOn)};
    }

    &:before {
        top: 0;
    }

    &:after {
        bottom: 0;
    }
`;
