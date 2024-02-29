// import { useLocation } from "react-router-dom"

const BookPage = () => {
    // Cách 1 dùng useLocation
    // const location = useLocation()
    // const params = new URLSearchParams(location.search)
    // const id = params.get('id')

    let params = new URL(document.location).searchParams;
    let id = params.get("id"); // is the string "Jonathan Smith".
    console.log('id:', id)

    return (<h1>Book Page</h1>)
}

export default BookPage