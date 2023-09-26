process.stdin.resume();
process.stdin.setEncoding('utf8');
var readline = require('readline');

var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var lines = [];

reader.on('line', (line) => {
    lines.push(line);
});

reader.on('close', () => {

    //ビンゴ表の升目
    const bingoSize = parseInt(lines[0]);

    // ビンゴ表
    let bingoTable = []
    for (let i = 1; i <= bingoSize; i++) {
        let bingoRow = lines[i].split(" ");
        bingoTable.push(bingoRow);
    }

    // 選択された単語
    let selectedWords = [];
    for (let i = (bingoSize + 2); i < lines.length; i++) {
        selectedWords.push(lines[i]);
    }

    let output = false // 出力値判定
    let rows = []; // 行単語の格納
    let columns = []; // 列単語の格納
    let rightDiagonal = [] //対角線単語の格納 
    let leftDiagonal = [] // 副対角線単語の格納

    // それぞれのパターンの単語を格納
    for (let i = 0; i < bingoSize; i++) {
        let row = [];
        let column = [];
        for (let j = 0; j < bingoSize; j++) {
            row.push(bingoTable[i][j]);
            column.push(bingoTable[j][i]);

            // 対角線
            if (i === j) {
                rightDiagonal.push(bingoTable[i][j]);
            }
            // 副対角線
            if ((i + j) === (bingoSize - 1)) {
                leftDiagonal.push(bingoTable[i][j]);
            }
        }
        rows.push(row);
        columns.push(column);
    }

    // チェック判定
    if (bingoSize <= selectedWords.length) {
        if (checkColumnsRows(selectedWords, rows) || checkColumnsRows(selectedWords, columns) ||
            checkdiagonal(selectedWords, rightDiagonal) || checkdiagonal(selectedWords, leftDiagonal)) {
            output = true;
        } else {
            output = false;
        }
    } else {
        output = false;
    }

    let outputWord = output === true ? "yes" : "no";
    console.log(outputWord);
});

/**
 * 同列・同行に選択された単語が全て含まれていた配列が存在していた場合、trueを返す。
 * @param {string[]} selectedWords - 選択された単語。
 * @param {string[][]} bingoWords - ビンゴ表に存在する同行もしくは同列の単語配列。
 * @return {boolean} - true:ビンゴ、false:ビンゴなし
 */
function checkColumnsRows(selectedWords, bingoWords) {
    for (const bingoWord of bingoWords) {
        if (bingoWord.every(bingoWordItem => selectedWords.includes(bingoWordItem))) {
            return true;
        }
    }
    return false;
}

/**
 * 対角線・副対角線に選択された単語が全て含まれていた場合、trueを返す。
 * @param {string[]} selectedWords - 選択された単語。
 * @param {string[]} diagonal - ビンゴ表に存在する同行もしくは同列の単語。
 * @return {boolean} - true:ビンゴ、false:ビンゴなし
 */
function checkdiagonal(selectedWords, diagonal) {
    if (diagonal.every(diagonalItem => selectedWords.includes(diagonalItem))) {
        return true;
    }
    return false;
}