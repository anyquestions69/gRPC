require('dotenv').config();
const PORT = process.env.PORT || 3000;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server()
const users = [{"id":"1","password":"12345", "email":"ivan@a.ru"},{"id":"1","password":"12345", "email":"ivan@a.ru"},{"id":"1","password":"12345", "email":"ivan@a.ru"}]
server.addService(userProto.UserService.service,{
    getAll:(_,callback)=>{
        console.log(users)
        callback(null,{users})
    },
    get:(call, callback)=>{
        console.log(call.request.id)
        const user = users.find(n=>n.id==call.request.id)
        console.log(user)
        if(!user) callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        });
        callback(null, user)
        
    }
})
server.bindAsync('0.0.0.0:3000', grpc.ServerCredentials.createInsecure(),(err)=>{
    if (err) 
        console.error("Failed to bind: ", err);
      
})