// **************** ATTENZIONE ******************
/*
Spoiler per chi leggerà questo codice: 
è stato scritto alle 2 di notte, non ho fatto (ancora) il refactoring
No, non ho unit test, si, funziona a culo...
Diciamocela tutta, sappiamo entrambi (io scrittore e tu lettore) che non farò mai dei test decenti
Accontentati <3 
*/

const italianNote = ["do", "do#", "re", "re#", "mi", "fa", "fa#", "sol", "sol#", "la", "la#", "si"]
const englishNote = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"]

const italianNoteF = ["do", "reb", "re", "mib", "mi", "fa", "solb", "sol", "lab", "la", "sib", "si"]
const englishNoteF = ["c", "cb", "d", "db", "e", "f", "gb", "g", "ab", "a", "bb", "b"]

const allItalianNote = [...italianNote, ...italianNoteF]
const allEnglishNote = [...englishNote, ...englishNoteF]


const allNotes = [...italianNote, ...englishNote, ...italianNoteF, ...englishNoteF]

const bonus = ["m", "-", "+", "2", "4", "5", "6", "7", "-7"]

function tuneConverter(text, shift) {

    let textArray = text.split("\n")
    let newText = []
    let finalText = ""

    //console.log(newText)
    //console.log("*****CONVERTER*****")
    textArray.forEach(line => {
        if (isNoteLine(line)) {
            //console.log("Linea note trovata: " + line)
            //let convertedLine = "Testo convertito: " + line 
            let convertedLine = convertLine(line, shift)
            //newText.push("<div class='note'>"+convertedLine+"</div>")

            newText.push(convertedLine)
        } else {
            newText.push(line)
        }
    });

    for (let i = 0; i < newText.length; i++) {
        finalText += newText[i] + "\n";
    }

    return finalText.substring(0, finalText.length - 1) //tolgo l'ultimo \n
}


function convertLine(line, shift) {
    let lineArray = line.split(/(\S+\s+)/).filter(function (n) { return n });
    //console.log(lineArray)
    let newText = ""

    lineArray.forEach(note => {
        if (note === "") newText += " "
        else {
            let [noteHead, noteBonus] = splitNote(note)
            //console.log("Note head: " +noteHead + " | Note bonus: " + noteBonus)

            if (findAlterationType(noteHead) === "flat") {
                noteHead = convertFlatIntoSharp(note)
            }

            if (findNotation(noteHead) === "ita") {
                let index = (italianNote.indexOf(noteHead) + shift) % italianNote.length
                noteHead = italianNote[index]
            }

            if (findNotation(noteHead) === "eng") {
                let index = (englishNote.indexOf(noteHead) + shift) % englishNote.length
                noteHead = englishNote[index]
            }

            //console.log("Nota shiftata di "+shift+": "+noteHead)
            newText += noteHead + noteBonus
        }
    })
    return newText
}

function isNoteLine(line) {
    let lineArray = line.split(" ")
    let notes = 0
    let words = 0
    //console.log("Line: " + lineArray)

    lineArray.forEach(word => {
        if (word !== "") {
            if (isNote(word)) { notes++ } else { words++ }
        }
    })
    /*
    console.log("Found "+notes+ " notes on the line: "+line)
    console.log("Found "+words+ " words on the line: "+line)
    */
    return (notes > words)
}

function isNote(word) {
    //console.log(allNotes)
    for (let i = 0; i < allNotes.length; i++) {
        for (let j = 0; j < bonus.length; j++) {
            //console.log("Comparing '"+word.toLowerCase()+"' with: " + allNotes[i] +" and with: " +allNotes[i]+bonus[j])
            if (word.toLowerCase() === allNotes[i]
                || word.toLowerCase() === allNotes[i] + bonus[j]) {
                return (true)
            }
        }
    }

    return false
}

function findNotation(note) {

    for (let i = 0; i < allItalianNote.length; i++) {
        for (let j = 0; j < bonus.length; j++) {
            if (note.toLowerCase().startsWith(allItalianNote[i])
                || note.toLowerCase().startsWith(allItalianNote[i] + bonus[j])) {

                return ("ita")
            }
        }
    }
    for (let i = 0; i < allEnglishNote.length; i++) {
        for (let j = 0; j < bonus.length; j++) {
            if (note.toLowerCase().startsWith(allEnglishNote[i])
                || note.toLowerCase().startsWith(allEnglishNote[i] + bonus[j])) {
                return ("eng")
            }
        }
    }
}

function findAlterationType(note) {
    for (let i = 0; i < italianNote.length; i++) {
        if (italianNote[i] === note) {
            return "sharp"
        }
    }

    for (let i = 0; i < englishNote.length; i++) {
        if (englishNote[i] === note) {
            return "sharp"
        }
    }

    for (let i = 0; i < italianNoteF.length; i++) {
        if (italianNoteF[i] === note) {
            return "flat"
        }
    }

    for (let i = 0; i < englishNoteF.length; i++) {
        if (englishNoteF[i] === note) {
            return "flat"
        }
    }

}

function convertFlatIntoSharp(note) {
    for (let i = 0; i < italianNoteF.length; i++) {
        if (italianNoteF[i] === note) {
            return italianNote[i]
        }
    }

    for (let i = 0; i < englishNoteF.length; i++) {
        if (englishNoteF[i] === note) {
            return englishNote[i]
        }
    }

}

/*
Questa funzione assume che le sia stata passata una nota valida
Ritorna la nota (do, re#, etc...) e il bonus (ovvero il modificatore)
*/
function splitNote(note) {
    if (findNotation(note) === "ita") {
        for (let i = 0; i < italianNote.length; i++) {
            if (note.toLowerCase().startsWith(italianNote[i])) {
                let noteHead = note.toLowerCase().substring(0, italianNote[i].length)
                let noteBonus = note.toLowerCase().substring(italianNote[i].length, note.length)
                //console.log("Head: " + noteHead + "  |  Bonus: " + noteBonus)
                if (note.toLowerCase().indexOf("#") !== -1) {
                    noteHead = note.toLowerCase().substring(0, italianNote[i + 1].length)
                    noteBonus = note.toLowerCase().substring(italianNote[i + 1].length, note.length)
                }
                return [noteHead, noteBonus]
            }
        }
    }
    if (findNotation(note) === "eng") {
        for (let i = 0; i < englishNote.length; i++) {
            if (note.toLowerCase().startsWith(englishNote[i])) {
                let noteHead = note.toLowerCase().substring(0, englishNote[i].length)
                let noteBonus = note.toLowerCase().substring(englishNote[i].length, note.length)
                //console.log("Head: " + noteHead + "  |  Bonus: " + noteBonus)
                if (note.toLowerCase().indexOf("#") !== -1) {
                    noteHead = note.toLowerCase().substring(0, englishNote[i + 1].length)
                    noteBonus = note.toLowerCase().substring(englishNote[i + 1].length, note.length)
                }
                return [noteHead, noteBonus]
            }
        }
    }

    const noteHead = ""
    const noteBonus = ""
    return [noteHead, noteBonus]
}


function notationConverter(text, toNotation) {

    console.log("Converto il testo in "+toNotation)

    let textArray = text.split("\n")
    let newText = []
    let finalText = ""

    textArray.forEach(line => {
        if (isNoteLine(line)) {

            let convertedLine = convertLineInNotation(line,toNotation)

            newText.push(convertedLine)
        } else {
            newText.push(line)
        }
    });

    for (let i = 0; i < newText.length; i++) {
        finalText += newText[i] + "\n";
    }

    return finalText.substring(0, finalText.length - 1) //tolgo l'ultimo \n
}

function convertLineInNotation(line,toNotation){
    let lineArray = line.split(/(\S+\s+)/).filter(function (n) { return n });
    //console.log(lineArray)
    let newText = ""

    lineArray.forEach(note => {
        if (note === "") newText += " "
        else {
            let [noteHead, noteBonus] = splitNote(note)
            //console.log("Note head: " +noteHead + " | Note bonus: " + noteBonus)

            if (findAlterationType(noteHead) === "flat") {
                noteHead = convertFlatIntoSharp(note)
            }


            if (findNotation(noteHead) === "ita" && toNotation === "eng") {
                let index = italianNote.indexOf(noteHead)
                noteHead = englishNote[index]
            }

            if (findNotation(noteHead) === "eng" && toNotation === "ita") {
                let index = englishNote.indexOf(noteHead)
                noteHead = italianNote[index]
            }

            //console.log("Nota shiftata di "+shift+": "+noteHead)
            newText += noteHead + noteBonus
        }
    })
    return newText
}



export {
    tuneConverter,
    notationConverter
}