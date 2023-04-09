function bcc2(msg) {
    // let check_code = "";
    msg = msg.match(/.{1,2}/g).join(" ");
    let check_str_array = msg.split(" ");
    let str_len = check_str_array.length;

    let xor = parseInt(check_str_array[0], 16);
    for (i = 1; i < str_len; i++) {
        xor ^= parseInt(check_str_array[i], 16);
    }
    xor = xor.toString(16);

    return xor;
}

function ascii_to_hex(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join("");
}

module.exports = class JT808Encode {
    constructor() {}

    // HEADER
    header(msg, msgnum, tel, snMsg) {
        const msgID = (msg) => {
            let msgIDHex = msg.toString(16);
            console.log("msgID : ", msgIDHex);
            return msgIDHex;
        };

        const ManualMsgNum = (msgnum) => {
            let ManualMsgNumHex = msgnum.toString(16);
            ManualMsgNumHex = ManualMsgNumHex.padStart(4, 0);
            console.log("ManualMsgNumHex : ", ManualMsgNumHex);
            return ManualMsgNumHex;
        };

        const phoneNum = (tel) => {
            console.log("phoneNum : ", tel);
            return tel;
        };

        const myMsgSN = (msg) => {
            let msgSNHex = msg.toString(16);
            msgSNHex = msgSNHex.padStart(4, 0);
            console.log("msgSNHex : ", msgSNHex);
            return msgSNHex;
        };

        let headerData =
            msgID(msg) + ManualMsgNum(msgnum) + phoneNum(tel) + myMsgSN(snMsg);
        console.log("headerData : ", headerData);
        return headerData;
    }

    // BODY
    body_8100(serial, succ, code) {
        const remoteSn = (serial) => {
            let snHex = serial.toString(16);
            snHex = snHex.padStart(4, 0);
            console.log("snHex : ", snHex);
            return snHex;
        };
        const success = (succ) => {
            if (succ == "0") {
                console.log("success : ", "00");
                return "00";
            } else {
                console.log("success : ", "01");
                return "01";
            }
        };

        const authCode = (code) => {
            let authCodeHex = ascii_to_hex(code);
            console.log("authCode : ", authCodeHex);
            return authCodeHex;
        };

        let body = remoteSn(serial) + success(succ) + authCode(code);
        console.log("body : ", body);
        console.log("body length : ", body.length / 2);
        return body;
    }

    body_8001(sn, resMsgId, result) {
        const remoteSn = (serial) => {
            let snHex = serial.toString(16);
            snHex = snHex.padStart(4, 0);
            console.log("snHex : ", snHex);
            return snHex;
        };
        const resID = (id) => {
            let idHex = id.toString(16);
            idHex = idHex.padStart(4, 0);
            console.log("idHex : ", idHex);
            return idHex;
        };
        const success = (succ) => {
            if (succ == "0") {
                console.log("success : ", "00");
                return "00";
            } else {
                console.log("success : ", "01");
                return "01";
            }
        };
        let body = remoteSn(sn) + resID(resMsgId) + success(result);
        console.log("body : ", body);
        console.log("body length : ", body.length / 2);
        return body;
    }

    checkCode(code) {
        let xorFinal = bcc2(code);
        let checkHex = xorFinal.toString(16);
        console.log("checkHex : ", checkHex);
        return checkHex;
    }
};