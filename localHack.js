/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var targetMoney = ns.args[1];
    var realMoney = ns.args[2];
    var weakenTime = ns.args[3];
    var growTime = ns.args[4];
    if (realMoney < targetMoney) {
        if (weakenTime < growTime) {
            ns.tprint("WARN Weakening ", server, " by ", await ns.weaken(server));
        } else {
            ns.tprint("INFO Growing ", server, " by %", await ns.grow(server) - 1);
            ns.tprint("INFO Target Money $", targetMoney, " Real Money $", realMoney);
        }
    } else {
        var hackValue = await ns.hack(server)
        ns.tprint("SUCCESS Hacked ", server, " for $", hackValue);

    }

}