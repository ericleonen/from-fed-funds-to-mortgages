import { useEffect, useState } from "react";
import "./ScreenWidthWarningModal.css";

type ScreenWidthWarningModalProps = {
    minScreenWidth: number
}

const ScreenWidthWarningModal: React.FC<ScreenWidthWarningModalProps> = ({ minScreenWidth }) => {
    const [show, setShow] = useState<boolean>(window.innerWidth < minScreenWidth);

    useEffect(() => {
        const handleResize = () => {
            setShow(window.innerWidth < minScreenWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setShow, minScreenWidth]);

    if (!show) return null;

    return (
        <div className="warningBackdrop">
            <div className="warningModal">
                <p className="warningMainText">You're screen's size is too small.</p>
                <p className="warningDescriptionText">To use this app, please ensure you're screen is at least {minScreenWidth}px wide.</p>
            </div>
        </div>
    )
};

export default ScreenWidthWarningModal;