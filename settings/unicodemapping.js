let randNum = function(minValue, maxValue){
    let buf = new Uint8Array(1)
    while (true){
      window.crypto.getRandomValues(buf);

      if (buf[0] <= maxValue && buf[0] >= minValue){
        break;
      }
      buf = new Uint8Array(1);
    }
    return buf[0];
  }

let getUnicode = function(input){
    const uc =
        {
            "a": [
                "\u0430",
                "\u00e0",
                "\u00e1",
                "\u1ea1",
                "\u0105"
            ],
            "c": [
                "\u0441",
                "\u0188",
                "\u010b"
            ],
            "d": [
                "\u0501",
                "\u0257"
            ],
            "e": [
                "\u0435",
                "\u1eb9",
                "\u0117",
                "\u0117",
                "\u00e9",
                "\u00e8"
            ],
            "g": [
                "\u0121"
            ],
            "h": [
                "\u04bb"
            ],
            "i": [
                "\u0456",
                "\u00ed",
                "\u00ec",
                "\u00ef"
            ],
            "j": [
                "\u0458",
                "\u029d"
            ],
            "k": [
                "\u03ba"
            ],
            "l": [
                "\u04cf",
                "\u1e37"
            ],
            "n": [
                "\u0578"
            ],
            "o": [
                "\u043e",
                "\u03bf",
                "\u0585",
                "\u022f",
                "\u1ecd",
                "\u1ecf",
                "\u01a1",
                "\u00f6",
                "\u00f3",
                "\u00f2"
            ],
            "p": [
                "\u0440"
            ],
            "q": [
                "\u0566"
            ],
            "s": [
                "\u0282"
            ],
            "u": [
                "\u03c5",
                "\u057d",
                "\u00fc",
                "\u00fa",
                "\u00f9"
            ],
            "v": [
                "\u03bd",
                "\u0475"
            ],
            "x": [
                "\u0445",
                "\u04b3"
            ],
            "y": [
                "\u0443",
                "\u00fd"
            ],
            "z": [
                "\u0290",
                "\u017c"
            ]
        }
        let output = ''

        input.split("").forEach(element => {
            if (uc[element] === undefined){
                output += element
            }
            else{
                output += uc[element][randNum(0, uc[element].length - 1)]
            }
        })
        return output
    }