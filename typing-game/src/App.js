import React, {useState, useEffect, useRef} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import quotes from "./quotes";

function App() {
    //  STATES
    const [timer, setTimer] = useState(0);
    const [start, setStart] = useState(true);
    const [wpm, setwpm] = useState(0);
    const [accuracy, setaccuracy] = useState(0);
    const [characterTyped, setCharacterTyped] = useState(1);
    const [errors, setErrors] = useState(0);
    const [totalErrors, setTotalErrors] = useState(0);
    const [quoteNo, setQuoteNo] = useState(0);
    const input = useRef();
    const [prgrpTextContent, SetprgrpTextContent] = useState([
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint vero distinctio neque sed, voluptas repellendus natus cum delectus? Praesentium eius excepturi labore faciliscommodi sit exercitationem accusantium itaque assumenda quia."
    ]);
    const styles = {display : start ? 'none' : 'block'};
    

// START AND RESET
    const checkBtn = () =>{
        // START
        if (start){
            setStart(false); 
            getPhar(0); 
            let interval = setInterval(() => {
                setTimer(time =>  time + 1)
            } , 1000)
        }
        // RESET
        else{
            window.location.reload();
        }    
    } 

// GETTING QUOTE FROM QUOTES ARRAY
    const getPhar=(index)=>{
        SetprgrpTextContent([]);
        const currentQuote = quotes[index];
        const prgrpElements = currentQuote.split('').map((text, index) => {
            return(
                <span key={index} className="character">
                    {text}
                </span>
            )
        });
        SetprgrpTextContent(prgrpElements);
    }

// THIS FUNCTION TRIGGERS FOR EVERY INPUT TEXT
    const handleChange = (e) =>{
        let currentInput = e.target.value;
        let currentInputArr = currentInput.split('');
        setCharacterTyped(prevState=>prevState+1);
        setErrors(totalErrors);

        // CHECKING EACH CHARACTER OF THE INPUT
        const prgrpSpanArr = [...prgrpTextContent];
        prgrpSpanArr.forEach((text, index) => {
            let typedText = currentInputArr[index]
            if (typedText == null) {
                console.log('null');
            }
            else if (typedText === text.props.children) {
                console.log('correct');
            }
            else {
                setErrors(error=> error + 1)
            }

        // ACCURACY
        let correctVal = (characterTyped - errors)
        let accuracyValue = Math.round((correctVal / characterTyped) * 100);
        setaccuracy(accuracyValue);
        
        // WPM
        let wpmValue = Math.round(((characterTyped / 5) / timer) * 60);
        setwpm(wpmValue)
        })

        //  IF CURRENT INPUT === TO CURRENT QUOTE
        if (currentInput === quotes[quoteNo]){
            setQuoteNo(prevQouteNo=>prevQouteNo+1);
            getPhar(quoteNo+1);
            input.current.value = '';
            setTotalErrors(prevErrors=> prevErrors + errors)
        };
    }

    return (
    <div class="container">
        <div class="text-center title text-light mt-4 mb-4">SPEED TYPING GAME</div>
        <div class="row m-auto">
            <div class="col-sm-12  m-auto p-0 mb-4 stats-div">
                <div class="stats text-light p-2 d-flex justify-content-between">
                    <p class="ml-1 my-auto p-0">STATS</p>
                    {start && <button onClick={checkBtn} class="btn btn-sm mr-1 reset"> Start </button>}
                    {!start && <button onClick={checkBtn} class="btn btn-sm mr-1 reset"> Reset </button>}
                </div>
                <div class="data d-flex justify-content-around mt-2 pt-2 px-3 pb-3">
                    <div class="text-light">
                        <div class="accuracy text-center text-success">{accuracy}</div>
                        <div class="data-title text-center ">ACCURACY</div>
                    </div>
                    <div class="data text-light">
                        <div class="wpm text-center text-warning">{wpm}</div>
                        <div class="data-title text-center">WPM</div>
                    </div>
                    <div class="data text-light">
                        <div class="error text-center text-danger">{errors}</div>
                        <div class="data-title text-center">ERROR</div>
                    </div>
                    <div class="data text-light">
                        <div class="time text-center text-primary">{timer}</div>
                        <div class="data-title text-center">TIME</div>
                    </div>
                </div>
            </div>
            <div style={styles} class="col-sm-12 mt-3 sentence text-light pt-2 prgrphDiv">
                <p class="pharagraph">{ prgrpTextContent }</p>
            </div>
            <div style={styles} class="col-sm-12 mt-3 sentence text-light pt-2 inputDiv">
                <textarea ref={input} class="input text-light p-2" autofocus onChange={handleChange}></textarea>
            </div>
        </div>
    </div>
    );
}



export default App;
