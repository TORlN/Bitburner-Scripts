/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var targetMoney = ns.args[1];
    var realMoney = ns.args[2];
    var weaken = ns.args[3];
    var verbose = ns.args[4];
    if (realMoney < targetMoney) {
        if (weaken == true) {
            var weakenValue = await ns.weaken(server);
            if (verbose == true) {
                ns.tprint("INFO Weakened ", server, " by ", weakenValue);
            }
        } else {
            var growValue = await ns.grow(server) - 1;
            if (verbose == true) {
                ns.tprint("INFO Grew ", server, " by %", growValue);
            }
        }
    } else if (weaken == false) {
        var hackValue = await ns.hack(server)
        if (hackValue > 0 && verbose == true) {
            ns.tprint("SUCCESS Hacked ", server, " for $", hackValue);
        } else {
            ns.tprint("ERROR Failed to hack ", server);
        }
    }
}