function findDistinctCombos(num, maximum, memo = new Map()) {
    // Check if the result for these parameters is already in the memo
    const key = `${num}-${maximum}`;
    if (memo.has(key)) {
        return memo.get(key);
    }

    // Base cases
    if (num === 0) {
        return 1;
    } else if (num < 0 || maximum === 0) {
        return 0;
    }

    // Recursive calls with memoization
    const result = findDistinctCombos(num - maximum, maximum, memo) + findDistinctCombos(num, maximum - 1, memo);

    // Store the result in the memo before returning
    memo.set(key, result);
    return result;
}
/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var file = ns.args[1];
    var verbose = ns.args[2];
    switch (await ns.codingcontract.getContractType(file, server)) {
        case "Total Ways to Sum":
            var data = await ns.codingcontract.getData(file, server);
            var soln = await findDistinctCombos(data, data) - 1;
            if (await ns.codingcontract.attempt(soln, file, server) != "" && verbose) {
                ns.tprint("Solved " + file + " on " + server);
            } else if (verbose) {
                ns.tprint("Failed to solve " + file + " on " + server);
            }
            break;
        case "Total Ways to Sum II":
            var data = await ns.codingcontract.getData(file, server);
            // var soln = await ns.run("./coding%20contracts/totalWaysToSum2.js", 1, data[0], data[1]);
            // if (ns.codingcontract.attempt(soln, files[i], server) != "") {
            //     ns.tprint("SUCCESS Solved " + files[i] + " on " + server);
            // } else {
            //     ns.tprint("ERROR Failed to solve " + files[i] + " on " + server);
            // }
            break;
        default:

            break;
    }
}
