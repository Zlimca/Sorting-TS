import { delay } from "../utils/tools";

export async function mergeSort(arr: number[], setStripes: React.Dispatch<React.SetStateAction<number[]>>, setComparisons: React.Dispatch<React.SetStateAction<number>>) {
    let n = arr.length
    // For current size of subarrays to
    // be merged curr_size leties from
    // 1 to n/2
    let curr_size

    // For picking starting index of
    // left subarray to be merged
    let left_start

    // Merge subarrays in bottom up
    // manner. First merge subarrays
    // of size 1 to create sorted
    // subarrays of size 2, then merge
    // subarrays of size 2 to create
    // sorted subarrays of size 4, and
    // so on.
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {

        // Pick starting point of different
        // subarrays of current size
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            // Find ending point of left
            // subarray. mid+1 is starting
            // point of right
            let mid = Math.min(left_start + curr_size - 1, n - 1);

            let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

            // Merge Subarrays arr[left_start...mid]
            // & arr[mid+1...right_end]
            await merge(arr, left_start, mid, right_end, setStripes, setComparisons)
            await delay(() => setStripes([...arr]))
        }
    }
    setStripes([...arr])
}

/*
 * Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr
 */
export async function merge(arr: number[], l: number, m: number, r: number, setStripes: React.Dispatch<React.SetStateAction<number[]>>, setComparisons: React.Dispatch<React.SetStateAction<number>>) {
    let i, j, k
    let n1 = m - l + 1
    let n2 = r - m

    /* create temp arrays */
    let L = Array(n1).fill(0)
    let R = Array(n2).fill(0)

    /*
     * Copy data to temp arrays L and R
     */
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i]
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j]

    /*
     * Merge the temp arrays back into arr[l..r]
     */
    i = 0
    j = 0
    k = l
    while (i < n1 && j < n2) {
        setComparisons(prev => ++prev)
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++
        } else {
            arr[k] = R[j];
            j++
        }
        k++
        await delay(() => setStripes([...arr]))
    }

    /*
     * Copy the remaining elements of L, if there are any
     */
    while (i < n1) {
        arr[k] = L[i]
        i++
        k++
        await delay(() => setStripes([...arr]))
    }

    /*
     * Copy the remaining elements of R, if there are any
     */
    while (j < n2) {
        arr[k] = R[j]
        j++
        k++
        await delay(() => setStripes([...arr]))
    }
}