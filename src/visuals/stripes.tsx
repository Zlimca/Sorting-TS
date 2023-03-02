import { useState, useEffect } from "react"
import { bubbleSort } from "../sorting/bubble"
import { insertionSort } from "../sorting/insertionSort"
import { mergeSort } from "../sorting/mergeSort"
import { timSort } from "../sorting/timSort"
import "./stripe.css"

export function Stripes() {

    const createRandomArray = (size: number) => {
        return [...Array(size)].map((_, i) => i + 1).sort(() => Math.random() - 0.5)
    }

    const [stripes, setStripes] = useState(createRandomArray(1000))
    const [updates, setUpdates] = useState(-1)
    const [comparisons, setComparisons] = useState(0)

    const shuffle = () => {
        setUpdates(-1)
        setComparisons(0)
        setStripes(prev => prev.map((_, i) => i + 1).sort(() => Math.random() - 0.5))
    }

    const changeNumberOfStripes = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdates(-1)
        setComparisons(0)
        setStripes(createRandomArray(Number(e.currentTarget.value)))
    }

    useEffect(() => setUpdates(prev => prev + 1), [stripes])

    return (
        <div>
            <input type={"number"} placeholder="Stripes" defaultValue={stripes.length} onChange={changeNumberOfStripes} />
            <button type="button" onClick={() => shuffle()}>Shuffle</button>
            <button type="button" onClick={() => bubbleSort([...stripes], setStripes, setComparisons)}>Bubble Sort</button>
            <button type="button" onClick={() => insertionSort([...stripes], setStripes, setComparisons)}>Insertion Sort</button>
            <button type="button" onClick={() => mergeSort([...stripes], setStripes, setComparisons)}>Merge Sort</button>
            <button type="button" onClick={() => timSort([...stripes], setStripes, setComparisons)}>Tim Sort</button>
            <span>Updates {updates}</span>
            <span>Comparisons {comparisons}</span>
            <div className="stripe-box">
                {
                    stripes.map((stripeLen, i) => {
                        return <div key={`${stripeLen}-${i}`} className="stripe" style={{ width: `${90 / stripes.length}vw`, height: `${stripeLen / stripes.length * 90}vh` }} />
                    })
                }
            </div>
        </div>
    )
}