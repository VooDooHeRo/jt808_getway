Here are some possible optimizations to the given code:

1. `body_8100` and `body_8001` functions have similar code blocks for converting serial number to hex format. Instead of repeating that code inside the functions, we can define a separate function and call it from both functions.

2. In `success` function, instead of checking if `succ` is equal to "0", we can cast it to a boolean value using double negation (!!), and then convert that boolean value to a string "00" or "01". This saves some characters and improves readability.

3. The `checkCode` function uses the `bcc2` function to calculate a checksum of hexadecimal codes in the input. We can optimize the `bcc2` function for better performance by removing the `match` method on the input string, and calculating the XOR checksum in a loop directly on the input string.

Here's the optimized code:

```javascript
function asciiToHex(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join("");
}

function getSerialNumber(serial) {
    let snHex = serial.toString(16);
    snHex = snHex.padStart(4, 0);
    console.log("snHex : ", snHex);
    return snHex;
}

function getResponseId(id) {
    let idHex = id.toString(16);
    idHex = idHex.padStart(4, 0);
    console.log("idHex : ", idHex);
    return idHex;
}

function getMessageSuccess(success) {
    const successStr = !!success ? "01" : "00";
    console.log("success : ", successStr);
    return success 
 ```
