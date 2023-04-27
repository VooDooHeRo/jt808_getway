// Include Nodejs' net module.
const Net = require("net");
const fs = require("fs");
const JT808Encode = require("./jt808Encode");
const JT808Decode = require("./jt808Decode");
const http = require("https");
const axios = require("axios");
// The port on which the server is listening.
const port = 3000;

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Net.Server();
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, function () {
    console.log(
        `Server listening for connection requests on socket localhost:${port}`
    );
});

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on("connection", function (socket) {
    console.log("A new connection has been established.");

    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.

    // The server can also receive data from the client by reading from its socket.
    socket.on("data", function (chunk) {
        var array = [...chunk];

        console.log("Read : ", chunk.toString("hex"));

        //fs.writeFile('log.txt', chunk.toJSON().toString(), { flag: 'a+' }, err => {console.log("err : ", err)});

        // let recievMsg =
        //     "7E0102000D001234567891000438333030313233343536373839A97E";
        // let buffer = Buffer.from(recievMsg, "hex");
        // console.log("buffer : ", buffer);

        // let buffToStr = recievMsg;
        let buffToStr = chunk.toString("hex");
        console.log("buffToStr : ", buffToStr);
        getMsgID = buffToStr.substring(2, 6);
        console.log("getMsgID : ", getMsgID);
        let jt808Encode = new JT808Encode();
        const jt808Decode = new JT808Decode();

        switch (getMsgID) {
            case "0002":
                let header_0002 = jt808Decode.header(buffToStr);
                let lmsgBody_8100 = jt808Encode.body_8100(
                    header_0002["terminalSN"],
                    0,
                    "AuthCode-admin-2013"
                );
                let lbodyLen_8100 = lmsgBody_8100.length / 2;

                let lmsgHeader_8100 = jt808Encode.header(
                    33024,
                    lbodyLen_8100,
                    header_0002["phoneNum"],
                    2
                );
                let lmsgDATA_8100 = lmsgHeader_8100 + lmsgBody_8100;
                let lcheckCode_8100 = jt808Encode.checkCode(lmsgDATA_8100);

                let lresData_8100 =
                    "7E" + lmsgDATA_8100 + lcheckCode_8100 + "7E";
                let lbuffer_8100 = Buffer.from(lresData_8100, "hex");
                console.log("lresData_8100 : ", lresData_8100);
                socket.write(lbuffer_8100);
                break;
            case "0100":
                let header_0100 = jt808Decode.header(buffToStr);
                const body_0100 = jt808Decode.body_0100(buffToStr);
                // jt808Decode.checkCode(buffToStr);

                console.log("header_0100 : ", header_0100);
                console.log("body_0100 : ", body_0100);
                console.log(
                    "*********************************************************"
                );
                let msgBody_8100 = jt808Encode.body_8100(
                    header_0100["terminalSN"],
                    0,
                    "AuthCode-admin-2013"
                );
                let bodyLen_8100 = msgBody_8100.length / 2;

                let msgHeader_8100 = jt808Encode.header(
                    33024,
                    bodyLen_8100,
                    header_0100["phoneNum"],
                    2
                );

                let msgDATA_8100 = msgHeader_8100 + msgBody_8100;
                let checkCode_8100 = jt808Encode.checkCode(msgDATA_8100);

                let resData_8100 = "7E" + msgDATA_8100 + checkCode_8100 + "7E";
                let buffer_8100 = Buffer.from(resData_8100, "hex");
                console.log("resData_8100 : ", resData_8100);
                socket.write(buffer_8100);

                break;
            case "0102":
                const header_0102 = jt808Decode.header(buffToStr);
                const body_0102 = jt808Decode.body_0102(buffToStr);

                let msgBody_8001 = jt808Encode.body_8001(
                    header_0102["terminalSN"],
                    258,
                    0
                );
                let bodyLen_8001 = msgBody_8001.length / 2;

                let msgHeader_8001 = jt808Encode.header(
                    32769,
                    bodyLen_8001,
                    header_0102["phoneNum"],
                    2
                );
                let msgDATA_8001 = msgHeader_8001 + msgBody_8001;
                let checkCode_8001 = jt808Encode.checkCode(msgDATA_8001);

                let resData_8001 = "7E" + msgDATA_8001 + checkCode_8001 + "7E";
                let buffer_8001 = Buffer.from(resData_8001, "hex");
                console.log("resData_8001 : ", resData_8001);
                socket.write(buffer_8001);

                break;
            case "0200":
                let header_0200 = jt808Decode.header(buffToStr);
                console.log("************************");
                let body_0200 = jt808Decode.body_0200(buffToStr);

                body_0200["id"] = header_0200["phoneNum"];

                // test only
                // if (header_0200["phoneNum"] != "213771997743") {
                body_0200["lon"] = body_0200["lon"] * 100;
                // }
                console.log("************************");

                //write data to request body

                let options = {
                    hostname: "geolocalisation.streamsystem.com",

                    path: "/track/device/",
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        accept: "application/json",
                    },
                };
                let httpreq = http.request(options, (res) => {
                    res.setEncoding("utf8");
                    res.on("data", (chuck) => {
                        console.log(`BODY: ${chuck}`);
                    });
                    res.on("end", () => {
                        console.log("No more data in response.");
                    });
                });
                httpreq.on("error", (e) => {
                    console.error(`problem with request: ${e.message}`);
                });

                postData = JSON.stringify(body_0200);
                console.log("data to send : ", postData);
                httpreq.write(postData);
                httpreq.end();
                break;

            default:
                break;
        }
    });
    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on("end", function () {
        console.log("Closing connection with the client");
    });

    // Don't forget to catch error, for your own sake.
    socket.on("error", function (err) {
        console.log(`Error: ${err}`);
    });
});
