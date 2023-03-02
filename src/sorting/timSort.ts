import { delay } from "../utils/tools";
import { merge } from "./mergeSort";

// Javascript program to perform TimSort.
let MIN_MERGE = 32;

export async function timSort(arr: number[], setStripes: React.Dispatch<React.SetStateAction<number[]>>, setComparisons: React.Dispatch<React.SetStateAction<number>>) {
    const n = arr.length

    // Iterative Timsort function to sort the
    // array[0...n-1] (similar to merge sort)
    let minRun = minRunLength(MIN_MERGE);

    // Sort individual subarrays of size RUN
    for (let i = 0; i < n; i += minRun) {
        await insertionSort(arr, i, Math.min((i + MIN_MERGE - 1), (n - 1)), setStripes, setComparisons);
    }

    // Start merging from size
    // RUN (or 32). It will
    // merge to form size 64,
    // then 128, 256 and so on
    // ....
    for (let size = minRun; size < n; size = 2 * size) {

        // Pick starting point
        // of left sub array. We
        // are going to merge
        // arr[left..left+size-1]
        // and arr[left+size, left+2*size-1]
        // After every merge, we
        // increase left by 2*size
        for (let left = 0; left < n;
            left += 2 * size) {

            // Find ending point of left sub array
            // mid+1 is starting point of right sub
            // array
            let mid = left + size - 1;
            let right = Math.min((left + 2 * size - 1),
                (n - 1));

            // Merge sub array arr[left.....mid] &
            // arr[mid+1....right]
            if (mid < right) {
                await merge(arr, left, mid, right, setStripes, setComparisons);
            }
            setStripes([...arr])
        }
    }
}

function minRunLength(n: number) {

    // Becomes 1 if any 1 bits are shifted off
    let r = 0;
    while (n >= MIN_MERGE) {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

// This function sorts array from left index to
// to right index which is of size atmost RUN
async function insertionSort(arr: number[], left: number, right: number, setStripes: React.Dispatch<React.SetStateAction<number[]>>, setComparisons: React.Dispatch<React.SetStateAction<number>>) {
    for (let i = left + 1; i <= right; i++) {
        let temp = arr[i];
        let j = i - 1;

        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
            await delay(() => setStripes([...arr]))
            setComparisons(prev => ++prev)
        }
        arr[j + 1] = temp;

        setComparisons(prev => ++prev)
        await delay(() => setStripes([...arr]))
    }
}