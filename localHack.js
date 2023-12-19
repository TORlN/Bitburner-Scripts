/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var targetMoney = ns.args[1];
    var threads = ns.args[2];
    while (true) {
        if (ns.hackAnalyze(server) * threads < targetMoney) {
            if (ns.getWeakenTime() < ns.getGrowTime()) {
                await ns.weaken(server);
            } else {
                await ns.grow(server);
            }
        } else {
            await ns.hack(server);
        }
    }
}