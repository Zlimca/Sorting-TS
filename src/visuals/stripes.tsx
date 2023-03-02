import { useState } from "react"
import { bubbleSort } from "../sorting/bubble";
import "./stripe.css"

export function Stripes() {

    const [stripes, setStripes] = useState([...Array(50)].map((_, i) => i + 1).sort(() => Math.random() - 0.5));

    return (
        <div>
            <button type="button" onClick={() => bubbleSort([...stripes], setStripes)}>Bubble Sort</button>
            <button type="button" onClick={() => setStripes(prev => prev.map((_, i) => i + 1).sort(() => Math.random() - 0.5))}>Shuffle</button>
            <div className="stripe-box">
                {
                    stripes.map((element) => {
                        return <div key={`${element}`} className="stripe" style={{ height: `${element}rem` }} />
                    })
                }
            </div>
        </div>
    )
}