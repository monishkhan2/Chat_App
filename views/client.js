const socket = io("http://localhost:13000")

var name = prompt("Enter Your Name to Join the Chat : ")
socket.emit("user-joined", name)

var first = document.querySelector(".first")
function generateMessage(msg, side) {
    var message = document.createElement("div")
    message.classList.add("alert")

    if (side === "left") {
        message.classList.add("alert-primary")
        message.classList.add("left")
    }
    else if (side === "right") {
        message.classList.add("alert-success")
        message.classList.add("right")
    }
    else {
        message.classList.add("alert-secondary")
        message.classList.add("center")
    }
    message.innerHTML = msg
    first.appendChild(message)
}

socket.on("new-user-joined",(name)=>{
    if(name=="null")
    return
    generateMessage(`${name} Joined the Chat`,'center')
})

socket.on("left",({name})=>{
    if(name=="null")
    return
    generateMessage(`${name} Left the Chat`,'center')
})

function postData(){
    var message = document.getElementById("message")
    socket.emit("send",message.value)
    generateMessage(`${message.value} : You`,"right")
    message.value = ""
}

socket.on("receive",({message,name})=>{
    generateMessage(`${name} : ${message}`,'left')
})
