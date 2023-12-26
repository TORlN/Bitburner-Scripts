/** @param {NS} ns */
async function refactorServers(ns, serverName) {
    var servers = await ns.getPurchasedServers();
    var min = Infinity;
    var minIndex = 0;
    for (let i = 0; i < servers.length; i++) {
        var server = await ns.getServer(servers[i]);
        if (server.moneyMax < min) {
            min = server.moneyMax;
            minIndex = i;
        }
        await ns.sleep(1);
    }
    // ns.tprint(serverName, " has been replaced by ", await ns.getServer(servers[minIndex]));
    var originalServerSubstring = serverName.split("-personal")[0];
    var existingServerSubstring = servers[minIndex].split("-personal")[0];
    if (await ns.getServer(originalServerSubstring).moneyMax > await ns.getServer(existingServerSubstring).moneyMax) {
        ns.print("ERROR: ", originalServerSubstring, " has a higher moneyMax than ", servers[minIndex])
        await ns.renamePurchasedServer(servers[minIndex], serverName);
    } else {
        ns.exit();
        ns.print("ERROR: ", serverName, " has a lower moneyMax than ", servers[minIndex])
    }
}

async function checkUpgrade(ns, ram, server) {
    var exponent = Math.floor(Math.log2(ram)) + 1;
    if (await ns.upgradePurchasedServer(server, Math.pow(2, exponent))) {
        return Math.pow(2, exponent);
    }
    return ram;
}

export async function main(ns) {
    var server = ns.getServer(ns.args[0]);
    var verbose = ns.args[1];
    var hackVerbose = ns.args[2];
    if (server.requiredHackingSkill > ns.getHackingLevel()) {
        if (verbose == true) {
            ns.tprint("INFO Hacking level not high enough to hack: ", server.hostname, " (", server.requiredHackingSkill, ")");
        }
        ns.exit();
    }
    ns.print("got server");
    if (server.hasAdminRights == false) {
        ns.print("attempting to gain admin rights");
        var numPorts = server.numOpenPortsRequired;
        numPorts -= server.openPortCount;
        if (server.sshPortOpen == false) {
            if (ns.fileExists("BruteSSH.exe", "home")) {
                numPorts -= 1;
                await ns.brutessh(server.hostname);
            } else {
                ns.print("ERROR Failed to close SSH port");
            }
        }
        if (server.ftpPortOpen == false) {
            if (ns.fileExists("FTPCrack.exe", "home")) {
                numPorts -= 1;
                await ns.ftpcrack(server.hostname);
            } else {
                ns.print("ERROR Failed to close FTP port");
            }
        }
        if (server.smtpPortOpen == false) {
            if (ns.fileExists("relaySMTP.exe", "home")) {
                numPorts -= 1;
                await ns.relaysmtp(server.hostname);
            } else {
                ns.print("ERROR Failed to close SMTP port");
            }
        }
        if (server.sqlPortOpen == false) {
            if (ns.fileExists("SQLInject.exe", "home")) {
                numPorts -= 1;
                await ns.sqlinject(server.hostname);
            } else {
                ns.print("ERROR Failed to close SQL port");
            }
        }
        if (server.httpPortOpen == false) {
            if (ns.fileExists("HTTPWorm.exe", "home")) {
                numPorts -= 1;
                await ns.httpworm(server.hostname);
            } else {
                ns.print("ERROR Failed to close HTTP port");
            }
        }
        if (numPorts > 0) {
            if (verbose == true) {
                ns.tprint("ERROR Failed to establish admin privileges for server: ", server.hostname);
            }
            ns.exit();
        }
    }
    ns.print("nuking...");
    await ns.nuke(server.hostname);
    if (server.moneyMax == 0) {
        ns.exit();
    }
    ns.print("copying...");
    await ns.scp("localHack.js", server.hostname, "home");
    var numLocalThreads = Math.floor((ns.getServerMaxRam(server.hostname)) / (ns.getScriptRam("localHack.js", server.hostname)));
    var targetPortion = (ns.hackAnalyze(server.hostname) * numLocalThreads);
    var targetMoney = targetPortion * server.moneyMax;
    var realMoney = targetPortion * server.moneyAvailable;
    var weaken;
    if (server.minDifficulty * 1.1 < server.hackDifficulty) {
        weaken = true;
    } else {
        weaken = false;
    }
    if (numLocalThreads != 0) {
        var info = ns.ps(server.hostname);
        for (let i = 0; i < info.length; i++) {
            if (info[i].filename == "localHack.js" && ns.isRunning(info[i].pid)) {
                if (verbose == true) {
                    ns.tprint("SUCCESS ", server.hostname, " is being hacked");
                    return;
                }
            }
        }
        if (verbose == true) {
            ns.tprint("SUCCESS Hacking ", server.hostname);
        }
        await ns.exec(
            "localHack.js",
            server.hostname,
            numLocalThreads,
            server.hostname,
            targetMoney,
            realMoney,
            weaken,
            hackVerbose,
        );
    } if (ns.getServerMaxRam(server.hostname) == 0 || ns.getServerUsedRam(server.hostname) >= ns.getServerMaxRam(server.hostname) - ns.getScriptRam("localHack.js", server.hostname)) {
        var ram = 2;
        if (!ns.serverExists(server.hostname + "-personal")) {
            if (ns.getPurchasedServers().length >= ns.getPurchasedServerLimit()) {
                if (server.moneyMax == 0) {
                    ns.exit();
                }
                await refactorServers(ns, server.hostname + "-personal");
            }
            else {
                await ns.purchaseServer(server.hostname + "-personal", ram)
                if (ns.serverExists(server.hostname + "-personal") && hackVerbose == true) {
                    ns.tprint("\u001b[37m", "Purchased ", server.hostname + "-personal", "\u001b[0m");
                }
            }
            while (prevRam != ram) {
                var prevRam = ram;
                ram = await checkUpgrade(ns, prevRam, server.hostname + "-personal");
                if (prevRam != ram && hackVerbose == true) {
                    ns.tprint("\u001b[37m", "Upgraded ", server.hostname + "-personal", " to ", ram, "GB", "\u001b[0m")
                }
                await ns.sleep(1);
            }
        } else {
            ram = ns.getServerMaxRam(server.hostname + "-personal");
            var prevRam;
            while (prevRam != ram) {
                var prevRam = ram;
                ram = await checkUpgrade(ns, prevRam, server.hostname + "-personal");
                if (prevRam != ram && hackVerbose == true) {
                    ns.tprint("\u001b[37m", "Upgraded ", server.hostname + "-personal", " to ", ram, "GB", "\u001b[0m")
                }
                await ns.sleep(1);
            }
        }
        if (ns.serverExists(server.hostname + "-personal")) {
            if (verbose == true) { ns.tprint("SUCCESS Hacking ", server.hostname); }
            await ns.scp("localHack.js", server.hostname + "-personal", "home");
            var numServerThreads = Math.floor((ns.getServerMaxRam(server.hostname + "-personal")) / (ns.getScriptRam("localHack.js", "home")));
            targetPortion = ns.hackAnalyze(server.hostname) * numServerThreads;
            targetMoney = targetPortion * server.moneyMax;
            realMoney = targetPortion * server.moneyAvailable;
            if (server.minDifficulty * 1.1 < server.hackDifficulty) {
                weaken = true;
            } else {
                weaken = false;
            }
            await ns.exec(
                "localHack.js",
                server.hostname + "-personal",
                numServerThreads,
                server.hostname,
                targetMoney,
                realMoney,
                weaken,
                hackVerbose,);

        }
    }
}