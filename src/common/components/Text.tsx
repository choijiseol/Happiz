import styled from "styled-components";

const Text = styled.span<{
    fontSize?: number;
}>`
    font-size: ${({fontSize}) => fontSize}px;
`

export default Text;