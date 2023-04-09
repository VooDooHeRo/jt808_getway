function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}
const hexToUint8 = (str) =>
    Uint8Array.from(str.match(/.{1,2}/g).map((comp) => parseInt(comp, 16)));

module.exports = class JT808Decode {
    constructor() {}

    header(data) {
        const msgID = (msg) => {
            let getMsgID = msg.substring(2, 6);
            console.log("getMsgID : ", getMsgID);
            getMsgID = parseInt(getMsgID, 16); //get txt
            console.log("getMsgID : ", getMsgID);

            return getMsgID;
        };
        const bodyLen = (msg) => {
            let getBodyLen = msg.substring(6, 10);
            console.log("getBodyLen : ", getBodyLen);
            getBodyLen = parseInt(getBodyLen, 16); //get txt
            console.log("getBodyLen : ", getBodyLen);

            return getBodyLen;
        };
        const phoneNum = (msg) => {
            let getPhoneNum = msg.substring(10, 22);
            console.log("getPhoneNum : ", getPhoneNum);
            return getPhoneNum;
        };
        const terminalSN = (msg) => {
            let getTerminalSN = msg.substring(22, 26);
            console.log("getTerminalSN : ", getTerminalSN);
            getTerminalSN = parseInt(getTerminalSN, 16); //get txt
            console.log("getTerminalSN : ", getTerminalSN);

            return getTerminalSN;
        };
        const header = {
            msgID: msgID(data),
            bodyLen: bodyLen(data),
            phoneNum: phoneNum(data),
            terminalSN: terminalSN(data),
        };
        return header;
    }
    body_0100(data) {
        const provinceID = (msg) => {
            let getProvinceID = msg.substring(26, 30);
            console.log("getProvinceID : ", getProvinceID);
            getProvinceID = parseInt(getProvinceID, 16); //get txt
            console.log("getProvinceID : ", getProvinceID);

            return getProvinceID;
        };
        const cityCountryID = (msg) => {
            let getCityID = msg.substring(30, 34);
            console.log("getCityID : ", getCityID);
            getCityID = parseInt(getCityID, 16); //get
            console.log("getCityID : ", getCityID);

            return getCityID;
        };
        const ManufacturerID = (msg) => {
            let getFactoryID = msg.substring(34, 44);
            console.log("getFactoryID : ", getFactoryID);
            getFactoryID = parseInt(getFactoryID, 16); //get
            console.log("getFactoryID : ", getFactoryID);

            return getFactoryID;
        };
        const terminalModel = (msg) => {
            let getTerminalModel = msg.substring(44, 84);
            console.log("getTerminalModel : ", getTerminalModel);
            getTerminalModel = hex_to_ascii(getTerminalModel);
            console.log("getTerminalModel : ", getTerminalModel);

            return getTerminalModel;
        };
        const terminalID = (msg) => {
            let getTerminalID = msg.substring(84, 98);
            console.log("getTerminalID : ", getTerminalID);
            getTerminalID = hex_to_ascii(getTerminalID);
            console.log("getTerminalID : ", getTerminalID);

            return getTerminalID;
        };
        const plateColor = (msg) => {
            let getPlateColor = msg.substring(98, 100);
            console.log("getPlateColor : ", getPlateColor);
            getPlateColor = parseInt(getPlateColor, 16); //get
            console.log("getPlateColor : ", getPlateColor);

            return getPlateColor;
        };
        const plateNumber = (msg) => {
            let getPlateNumber = msg.substring(100, msg.length - 4);
            console.log("getPlateNumber : ", getPlateNumber);
            getPlateNumber = hex_to_ascii(getPlateNumber);
            console.log("getPlateNumber : ", getPlateNumber);

            return getPlateNumber;
        };
        let body_0100 = {
            provinceID: provinceID(data),
            cityCountryID: cityCountryID(data),
            ManufacturerID: ManufacturerID(data),
            terminalModel: terminalModel(data),
            terminalID: terminalID(data),
            plateColor: plateColor(data),
            plateNumber: plateNumber(data),
        };
        return body_0100;
    }
    body_0102(data) {
        const authCode = (msg) => {
            let getAuthCode = msg.substring(26, msg.length - 4);
            console.log("getAuthCode : ", getAuthCode);
            getAuthCode = hex_to_ascii(getAuthCode);
            console.log("getAuthCode : ", getAuthCode);

            return getAuthCode;
        };
        const body_0102 = {
            authCode: authCode(data),
        };
        return body_0102;
    }
    body_0200(data) {
        const latitude = (msg) => {
            let getLatitude = msg.substring(42, 50);
            console.log("getLatitude : ", getLatitude);
            getLatitude = parseInt(getLatitude, 16);
            getLatitude = (
                getLatitude *
                10 ** ((getLatitude.toString().length - 2) * -1)
            ).toFixed(6);
            console.log("getLatitude : ", getLatitude);

            return getLatitude;
        };
        const longitude = (msg) => {
            let getLongitude = msg.substring(50, 58);
            console.log("getLongitude : ", getLongitude);
            getLongitude = parseInt(getLongitude, 16); //get
            getLongitude = (
                getLongitude *
                10 ** ((getLongitude.toString().length - 1) * -1)
            ).toFixed(6);
            console.log("getLongitude : ", getLongitude);

            return getLongitude;
        };
        const elevation = (msg) => {
            let getElevation = msg.substring(58, 62);
            console.log("getElevation : ", getElevation);
            getElevation = parseInt(getElevation, 16); //get
            console.log("getElevation : ", getElevation);

            return getElevation;
        };
        const speed = (msg) => {
            let getSpeed = msg.substring(62, 66);
            console.log("getSpeed : ", getSpeed);
            getSpeed = parseInt(getSpeed, 16); //get
            console.log("getSpeed : ", getSpeed);

            return getSpeed;
        };
        const direction = (msg) => {
            let getDirection = msg.substring(66, 70);
            console.log("getDirection : ", getDirection);
            getDirection = parseInt(getDirection, 16); //get
            console.log("getDirection : ", getDirection);

            return getDirection;
        };
        const time = (msg) => {
            let getTime = msg.substring(70, 82);
            let date = "20";
            date += getTime.substring(0, 2);
            date += "-";
            date += getTime.substring(2, 4);
            date += "-";
            date += getTime.substring(4, 6);
            date += " ";
            date += getTime.substring(6, 8);
            date += ":";
            date += getTime.substring(8, 10);
            date += ":";
            date += getTime.substring(10, 12);
            console.log("getTime : ", date);
            return date;
        };
        const body_0200 = {
            lat: latitude(data),
            lon: longitude(data),
            // elevation: elevation(data),
            vitesse: speed(data),
            // direction: direction(data),
            date: time(data),
        };
        return body_0200;
    }

    checkCode(data) {
        const checkCode = (msg) => {
            let getCheckCode = msg.substring(msg.length - 4, msg.length - 2);
            console.log("getCheckCode : ", getCheckCode);
            getCheckCode = parseInt(getCheckCode, 16); //get
            console.log("getCheckCode : ", getCheckCode);

            return getCheckCode;
        };
        return checkCode(data);
    }
};