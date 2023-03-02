export function delay(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function updateState(i: number, j: number, setStripes: React.Dispatch<React.SetStateAction<number[]>>) {
    setStripes(prev => {
        const newStripes: number[] = [...prev];
        [newStripes[i], newStripes[j]] = [prev[j], prev[i]]
        return newStripes
    })
}