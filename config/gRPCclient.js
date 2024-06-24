const PROTO_PATH = __dirname+"/../user.proto";

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const user = grpc.loadPackageDefinition(packageDefinition).user;
const client = new user.UserService(
    "0.0.0.0:3000",
    grpc.credentials.createInsecure()
);

module.exports = client;