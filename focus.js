/** @param {NS} ns */
async function checkUpgrade(ns, ram) {
    var exponent = Math.floor(Math.log2(ram));
    if (await ns.upgradePurchasedServer("grow", Math.pow(2, exponent)) && await ns.upgradePurchasedServer("weaken", Math.pow(2, exponent))) {
        return exponent;
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
    var ram = 8;
    while (true) {
        while (await ns.exec("growFocus.js", "grow", numThreadsGrow, server, verbose) == 0) {
            await ns.purchaseServer("grow", ram)
            await ns.sleep(100);
        }
        while (await ns.exec("weakenFocus.js", "weaken", numThreadsWeaken, server, verbose) == 0) {
            await ns.purchaseServer("weaken", ram)
            await ns.sleep(100);
        }
        ram = await checkUpgrade(ns, ram);
        await ns.sleep(100);
    }
}