function getTimerString(timerSeconds : number) : string {
    const minutes = Math.floor(timerSeconds / 60)
    const seconds = timerSeconds - (minutes*60)
    const addZero = seconds < 10 ? "0" : ""
    return `${minutes}:${addZero}${seconds}`
}

export default getTimerString