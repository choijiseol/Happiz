import styled from "styled-components";

function cssSize(s: number | string) {
    if (typeof s === "number") return `${s}px`;
    return s;
}

const Flex = styled.div<{ width?: number | string, height?: number | string, center?: boolean, row?: boolean, gap?: number }>`
    display: flex;
    ${({width}) => width ? `width: ${cssSize(width)};` : ''}
    ${({height}) => height ? `height: ${cssSize(height)};` : ''}
    ${({center}) => center ? `align-items: center; justify-content: center;` : ''}
    ${({row}) => `flex-direction: ${row ? 'row' : 'column'}`};
    ${({gap}) => gap ? `gap: ${gap}px` : ''};
`

export default Flex;