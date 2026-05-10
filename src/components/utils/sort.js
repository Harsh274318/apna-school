function shortedList(data, value, nested = null) {
    let sortedData = [...data].sort((a, b) => {
        let aVal = nested ? a[value][nested] : a[value]
        let bVal = nested ? b[value][nested] : b[value]
        if (typeof aVal === "string") {
            return aVal.localeCompare(bVal)
        }

        return aVal - bVal
    })
    return sortedData
}
export default shortedList