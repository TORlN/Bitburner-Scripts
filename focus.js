/** @param {NS} ns */
async function checkUpgrade(ns, ram) {
    var exponent = Math.floor(Math.log2(ram)) + 1;
    if (await ns.upgradePurchasedServer("grow", Math.pow(2, exponent)) && await ns.upgradePurchasedServer("weaken", Math.pow(2, exponent))) {
        return Math.pow(2, exponent);
    }
    return ram;
}

export async function main(ns) {
    var server = ns.args[0];
    var verbose = ns.args[1];
    await ns.scp("growFocus.js", "grow", "home");
    await ns.scp("weakenFocus.js", "weaken", "home");
    var numThreadsGrow = Math.floor((ns.getServerMaxRam("grow")) / (ns.getScriptRam("growFocus.js", "home")));
    var numThreadsWeaken = Math.floor((ns.getServerMaxRam("weaken")) / (ns.getScriptRam("weakenFocus.js", "home")));

    let ram = 2;
    if (ns.serverExists("grow") && ns.serverExists("weaken")) {
        ram = Math.min(ns.getServerMaxRam("grow"), ns.getServerMaxRam("weaken"));
    }
    while (true) {
        if (await ns.exec("growFocus.js", "grow", numThreadsGrow, server, verbose) == 0) {
            if (!ns.serverExists("grow")) {
                await ns.purchaseServer("grow", ram)
            } else {
                ram = ns.getServerMaxRam("grow");
            }
        }
        if (await ns.exec("weakenFocus.js", "weaken", numThreadsWeaken, server, verbose) == 0) {
            if (!ns.serverExists("weaken")) {
                await ns.purchaseServer("weaken", ram)
            } else {
                ram = ns.getServerMaxRam("weaken");
            }
        }
        ram = await checkUpgrade(ns, ram);
        await ns.sleep(100);
    }
}