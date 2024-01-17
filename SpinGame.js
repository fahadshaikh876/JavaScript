const prompt = require('prompt-sync')();
// withthehelpof-techwithtim
const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOL_VALUE = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

const ROW = 3;
const COL = 3;


const deposit = () => {
    while (true) {
        const amount = prompt('Please enter deposit amount: ');
        let balance = parseFloat(amount);
        if (isNaN(balance) || balance <= 0) {
            console.log('INvalid, please try again!');
        } else { return balance; }
    }
}

const getnolines = () => {
    while (true) {
        const lines = prompt('enter number of lines to bet (1-3): ');

        let numoflines = parseFloat(lines);
        if (isNaN(numoflines) || numoflines <= 0 || numoflines > 3) {
            console.log('invalid, please try again!');
        } else { return numoflines; }
    }
}

const getbetamount = (balance, numoflines) => {
    while (true) {
        const betamount = prompt('please enter bet amount: ');
        let bet = parseFloat(betamount);
        if (isNaN(bet) || bet <= 0 || bet > balance / numoflines) {
            console.log('invalid, please try again!');
        } else { return bet; }
    }
}


const Spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (i = 0; i < count; i++) { symbols.push(symbol); }
    }
    let reels = [];
    for (let i = 0; i < COL; i++) {

        reels.push([]);

        reelsymbols = [...symbols];
        for (let j = 0; j < ROW; j++) {
            const randomindex = Math.floor(Math.random() * reelsymbols.length);
            // console.log(reels);
            // console.log(randomindex);
            const selectedsymbol = reelsymbols[randomindex];
            reels[i].push(reelsymbols[randomindex]);
            reelsymbols.splice(randomindex, 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const updatedreels = [];
    for (i = 0; i < ROW; i++) {
        updatedreels.push([]);
        for (j = 0; j < COL; j++) {
            updatedreels[i].push(reels[j][i])
        }
    }
    return updatedreels;
}

const printrows = (updatedreels) => {
    for (const [count, symbol] of updatedreels.entries()) {
        let rowstring = '';
        for (i = 0; i < symbol.length; i++) {
            rowstring += symbol[i];
            if (i < symbol.length - 1) {
                rowstring += ' | '
            }
        }
        console.log(rowstring);

    }
}

const win = (rows, bet, lines) => {
    let winamount = 0;

    for (let i = 0; i < lines; i++) {
        const sym = rows[i];
        let won = true;

        for (const symb of sym) {
            if (symb != sym[0]) {
                won = false;
                break;
            }
        }
        if (won) {
            winamount += bet * SYMBOL_VALUE[sym[0]]
        }
    }
    return winamount;
};
// win();


const main = () => {
    let depositss = deposit();
    if (depositss > 0) {
        while (true) {

            let lines = getnolines();
            let bet = getbetamount(depositss, lines)
            depositss -= bet * lines
            let reelss = Spin();
            let trans = transpose(reelss);
            let picc = printrows(trans)
            let winn = win(trans, bet, lines);
            console.log('You won: $' + winn);

            depositss += winn;
            console.log('your remaining balance is: $' + depositss)
            if (depositss > 0) {
                let ask = prompt('do you want to play again? press y for it & hit enter ');
                if (ask != 'y') {
                    console.log('thank you!');
                    return 0;
                    // return;
                }

            } else { break; }
        };
    } console.log('thank you!');
    return 0;
};
// const mainn = main();
// console.log(mainn);
main();
// Spin();