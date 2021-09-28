//@ts-check

export const validate = () => {

    const areEquals = (textA, textB) => {
        return textA.trim() === textB.trim()
    }
    const isAnEmail = (text) => {
        return text.trim().includes('@') && text.trim().endsWith('.com')
    }
    const isEmpty = (text) =>{
        return text === null || text.trim() === ''
    }
    const amountCharacters = (text, number) => {
        return text.trim().length >= number
    }

    return { areEquals, isAnEmail, isEmpty, amountCharacters}
}
