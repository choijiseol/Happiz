import {useNavigate} from "react-router";
import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import Text from "../../common/components/Text.tsx";

export default function NotFoundPage() {

    const navigate = useNavigate();

    return <Flex center width={"100%"} height={"100%"} gap={30}>
        <Text fontSize={28}>잘못된 접근입니다.</Text>
        <ToHomeButton onClick={() => {navigate("/home")}}>홈으로 돌아가기</ToHomeButton>
    </Flex>
}

export const ToHomeButton = styled(Flex)`
    font-size: 18px;
    color: #505050;
    cursor: pointer;
`