/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var targetMoney = ns.args[1];
    var realMoney = ns.args[2];
    var weaken = ns.args[3];
    var verbose = ns.args[4];


    let rangePercent = 10; // Define the range as a percentage of the target money

    // Calculate the lower bounds
    let lowerBound = targetMoney - (targetMoney * (rangePercent / 100));
    if (weaken == true) {
        var weakenValue = await ns.weaken(server);
        if (verbose == true) {
            ns.tprint("\u001b[33m", "Weakened ", server, " by ", weakenValue, "\u001b[0m");
        }
    } else if (realMoney >= lowerBound) {
        var hackValue = await ns.hack(server)
        if (hackValue > 0 && verbose == true) {
            ns.tprint("\u001b[32m" + "Hacked ", server, " for $", hackValue + "\u001b[0m");
        } else if (verbose == true) {
            ns.tprint("ERROR Failed to hack ", server);
        }
    }
    if (realMoney < targetMoney || lowerBound == 0) {
        var growValue = await ns.grow(server) - 1;
        if (verbose == true) {
            ns.tprint("\u001b[36m", "Grew ", server, " by %", growValue, "\u001b[0m");
        }
    }
}