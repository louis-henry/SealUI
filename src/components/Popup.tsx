import { Button } from 'primereact/button';
import "../styles/popup.css";

function Popup(props: any) {
    return (props.trigger) ? (
        <div className={`popup-${props.purpose}-container`}>
            <div className={`popup-${props.purpose}`}>
                <Button type="button" className="close-btn" onClick={() => props.setTrigger(false)}>
                    Close
                </Button>
                { props.children }
            </div>
        </div>
    ) : null;
}

export default Popup;