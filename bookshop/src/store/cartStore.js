import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    books: {}, // ProduktID : amount
    updateBooks: (book) => {
        const bookState = get().books
        if (bookState[book.ProduktID] === undefined) {
            set((state) => ({books: {...state.books, [book.ProduktID]: book.amount}}))
        }else if(book.amount === -1 && bookState[book.ProduktID] === 1){
            delete bookState[book.ProduktID];
            set((state) => ({books: {...state.books}}))
        } else {
            set((state) => ({books: {...state.books, [book.ProduktID]: bookState[book.ProduktID] + book.amount}}))
        }
    },
}));