import React, { useContext } from "react"
import { TodoContext } from ".."

export default function NewTag(props) {
    const {
        todos,
        setTodos
    } = useContext(TodoContext)

    function handleTagChange(e) {
        const hide = document.getElementById('hide')
        const txt = e.target

        txt.style.cursor = "initial"
        hide.textContent = txt.value
        let width = hide.offsetWidth + 10
        txt.style.width = width + "px"
    }

    function handleNewTag(tag) {
        if (!(tag in props.tags)) {
            let R = Math.floor((Math.random() * 127) + 127)
            let G = Math.floor((Math.random() * 127) + 127)
            let B = Math.floor((Math.random() * 127) + 127)

            let rgb = (R << 16) + (G << 8) + B
            rgb = `#${rgb.toString(16)}`

            let tagsList = { ...props.tags }
            tagsList[tag] = rgb

            props.setTags(tagsList)

            //add new tag to data
            let newTodos = { ...todos }
            let tagsListArray = [tagsList]
            newTodos.tags = tagsListArray
            setTodos(newTodos)
        } else {
            alert("Tag already exists!")
        }
    }

    return (
        <>
            <span id="hide" /><input id="new-tag" className="tag" type="text" placeholder="+ Add Tag" onInput={handleTagChange} maxLength={30} onKeyDown={(e) => {
                if (e.code === "Enter") {
                    e.preventDefault()
                    handleNewTag(e.target.value)
                    e.target.style.width = "61px"
                    e.target.value = ""
                }
            }} />
        </>
    )
}
