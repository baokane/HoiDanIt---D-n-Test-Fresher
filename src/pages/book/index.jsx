// import { useLocation } from "react-router-dom"

import { useEffect, useState } from "react";
import ViewDetail from "../../component/Book/ViewDetail";
import { getBookDetail } from "../../services/api";

const BookPage = () => {
    // Cách 1 dùng useLocation:
    // const location = useLocation()
    // const params = new URLSearchParams(location.search)
    // const id = params.get('id')

    const [dataDetailBook, setDataDetailBook] = useState({})

    let params = new URL(document.location).searchParams;
    let id = params.get("id"); // is the string "Jonathan Smith".

    useEffect(() => {
        fetchDetailBook()
    }, [id])

    const fetchDetailBook = async () => {
        const res = await getBookDetail(id)
        console.log('res:', res)
        let raw = res.data
        raw.items = getImages(raw)
        setDataDetailBook(raw)
    }

    const getImages = (raw) => {
        console.log('raw', raw)
        let items = []
        if (raw.thumbnail) {
            items.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image"
            })
        }
        if (raw.slider) {
            raw.slider.map((item) => {
                items.push({
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image"
                })
            })
        }
        return items
    }


    return (
        <>
            <ViewDetail
                dataDetailBook={dataDetailBook}
            />
        </>
    )
}

export default BookPage