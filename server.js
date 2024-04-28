const io = require("socket.io")(13000,{
    cors:"*"
})

users = {}

io.on("connection", (socket) => {
    socket.on("user-joined", (name) => {
        users[socket.id] = name
        socket.broadcast.emit("new-user-joined", name)
    })

    socket.on("send", (message) => {
        socket.broadcast.emit("receive", { message: message, name: users[socket.id] })
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("left", { name: users[socket.id] })
        delete users[socket.id]
    })
})

