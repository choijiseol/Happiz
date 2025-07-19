import styled from "styled-components";

function cssSize(s: number | string) {
    if (typeof s === "number") return `${s}px`;
    return s;
}

const Flex = styled.div<{
    width?: number | string,
    height?: number | string,
    center?: boolean,
    row?: boolean,
    gap?: number,
    verticalCenter?: boolean,
    horizontalCenter?: boolean,
    verticalTop?: boolean,
    verticalBottom?: boolean,
    flexStart?: boolean,
    flexEnd?: boolean,
    spaceBetween?: boolean,
}>`
    display: flex;
    ${({width}) => width ? `width: ${cssSize(width)};` : ''}
    ${({height}) => height ? `height: ${cssSize(height)};` : ''}
    ${({center}) => center ? `align-items: center; justify-content: center;` : ''}
    ${({row}) => `flex-direction: ${row ? 'row' : 'column'}`};
    ${({gap}) => gap ? `gap: ${gap}px` : ''};
    ${({row, verticalCenter, horizontalCenter, verticalTop, verticalBottom}) => {
        if (row) return (verticalCenter
                        ? `align-items: center;`
                        : verticalTop
                                ? 'align-items: flex-start;'
                                : verticalBottom
                                        ? 'align-items: flex-end;'
                                        : '')
                + (horizontalCenter ? `justify-content: center;` : '');
        return (horizontalCenter ? `align-items: center;` : '')
                + (verticalCenter
                        ? `justify-content: center;`
                        : verticalBottom
                                ? 'justify-content: flex-end;'
                                : '');
    }}
    ${({flexStart, row}) => flexStart ? (row ? `justify-content: flex-start;` : `align-items: flex-start;`) : ''}
    ${({flexEnd, row}) => flexEnd ? (row ? `justify-content: flex-end;` : `align-items: flex-end;`) : ''}
    ${({spaceBetween}) => spaceBetween ? `justify-content: space-between;` : ''}
`

export default Flex;