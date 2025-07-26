import styled from "styled-components";

const Text = styled.span<{
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    center?: boolean;
}>`
    font-size: ${({fontSize}) => fontSize}px;
    font-weight: ${({fontWeight}) => fontWeight};
    color: ${({color}) => color};
    text-align: ${({ center }) => (center ? "center" : "left")};
`

export default Text;