
const swap = async (i: number, j: number, setStripes: React.Dispatch<React.SetStateAction<number[]>>) => {
  setStripes(prev => {
      const newStripes = [...prev]
      const temp = newStripes[i]
      newStripes[i] = newStripes[j]
      newStripes[j] = temp
      return newStripes
  })
  let resolve = (bla?: void) => {};
  const promise = new Promise<void>(r => resolve = r)
  setTimeout(() => resolve(), 0)
  return promise
}

export async function bubbleSort(arr: number[], setStripes: React.Dispatch<React.SetStateAction<number[]>>) {
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        console.log(arr);
        await swap(i, i + 1, setStripes);
        swapped = true;
      }
    }
  }
  return arr;
}