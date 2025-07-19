import styled from "styled-components";

const Text = styled.span<{
    fontSize?: number;
    fontWeight?: number;
    color?: string;
}>`
    font-size: ${({fontSize}) => fontSize}px;
    font-weight: ${({fontWeight}) => fontWeight};
    color: ${({color}) => color};
`

export default Text;