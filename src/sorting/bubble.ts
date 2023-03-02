import { delay } from "../utils/tools"

/*
01. Start with an array of unsorted numbers
02. Define a function called “bubbleSort” that takes in the array and the length of the array as parameters
03. In the function, create a variable called “sorted” that is set to false
04. Create a for loop that iterates through the array starting at index 0 and ending at the length of the array -1
05. Within the for loop, compare the current element with the next element in the array
06. If the current element is greater than the next element, swap their positions and set “sorted” to true
07. After the for loop, check if “sorted” is true
08. If “sorted” is true, call the “bubbleSort” function again with the same array and length as parameters
09. If “sorted” is false, the array is now sorted and the function will return the sorted array
10. Call the “bubbleSort” function with the initial unsorted array and its length as parameters to begin the sorting process.
*/
export async function bubbleSort(arr: number[], setStripes: React.Dispatch<React.SetStateAction<number[]>>, setComparisons: React.Dispatch<React.SetStateAction<number>>) {
    let sorted: boolean = true
    while (sorted) {
        sorted = false
        for (let i = 0; i < arr.length; i++) {
            setComparisons(prev => ++prev);
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                await delay(() => setStripes([...arr]))
                sorted = true
            }
        }
    }
    setStripes([...arr])
}