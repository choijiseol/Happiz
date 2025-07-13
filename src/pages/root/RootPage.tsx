import {useEffect} from "react";
import {useNavigate} from "react-router";

export default function RootPage() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home');
    }, []);

    return <>잠시만 기다려주세요.</>
}