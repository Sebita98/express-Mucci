let socket = io();
let userName;

Swal.fire({
    title: "Write your name",
    input: "text",
    inputValidator: value => !value && 'please write your name',
    allowOutsideClick: false
}).then((res) => {
    userName = res.value
    document.getElementById(userName).innerHTML = userName;
    socket.emit("auth", userName)
    console.log(userName);
})

let.chatBox = document.getElementById("chatBox")
chatBox.addEvenListener("keyup", send)

function send(e) {
    if (e.key === "Enter") {
        // console.log(chatBox.value);
        socket.emit("new_message", {
            userName,
            message: chatBox.value,
        })
    }
}