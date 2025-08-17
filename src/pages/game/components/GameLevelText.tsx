import Flex from "../../../common/components/Flex.tsx";
import Text from "../../../common/components/Text.tsx";

export default function GameLevelText({level, timer}: {level?: number, timer?: number}){
    return <>
        {level &&
            <Flex row center>
                <Text color={"#00496F"} fontWeight={700} fontSize={32}>{level}</Text>
                <Text color={"#00496F"} fontWeight={700} fontSize={16} style={{marginBottom: -6}}>단계</Text>
            </Flex>
        }
        {timer &&
            <Flex row center>
                <Text color={"#00496F"} fontWeight={700} fontSize={32}>{timer}</Text>
                <Text color={"#00496F"} fontWeight={700} fontSize={16} style={{marginBottom: -6}}>초</Text>
            </Flex>
        }
    </>
}