import './pulse.css'

const PulseText: React.FC<{text: string}> = ({ text }) => {
    return (
        <>
            <p id='pulse'>{text}</p>
        </>
    )
}

export default PulseText;