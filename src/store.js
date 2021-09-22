import {writable} from "svelte/store";

const storedToken = localStorage.getItem('token')
const storedUserLogin = localStorage.getItem('userLogin')

export const token = writable(storedToken)
export const userLogin = writable(storedUserLogin)
