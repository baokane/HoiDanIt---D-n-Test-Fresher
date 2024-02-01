import { HashLoader } from "react-spinners"

const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

const Loading = () => {
    return (
        <HashLoader style={style} color="#36d7b7" />
    )
}

export default Loading