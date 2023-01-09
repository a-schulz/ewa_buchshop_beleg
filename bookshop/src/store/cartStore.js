import create from 'zustand'

export const useCartStore = create((set, get) => ({
    books: {}, // ID : amount
    updateBooks: (book) => {
        const bookState = get().books
        if (bookState[book.ProduktID] === undefined) {
            set((state) => ({books: {...state.books, [book.ProduktID]: book.amount}}))
        } else {
            set((state) => ({books: {...state.books, [book.ProduktID]: bookState[book.ProduktID] + book.amount}}))
        }
    },
}));