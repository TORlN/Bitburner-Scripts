export async function main(ns) {
    var server = ns.getServer(ns.args[0]);
    var verbose = ns.args[1];
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
                await ns.ftpcrack(server.hostname);
            } else {
                ns.print("ERROR Failed to close SMTP port");
            }
        }
        if (server.sqlPortOpen == false) {
            if (ns.fileExists("SQLInject.exe", "home")) {
                numPorts -= 1;
                await ns.sqlInject(server.hostname);
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
        if (verbose == true) {
            ns.tprint("WARN No money on Server: ", server.hostname);
        }
        ns.exit();
    }
    ns.print("copying...");
    await ns.scp("localHack.js", server.hostname, "home");
    var numThreads = Math.floor((ns.getServerMaxRam(server.hostname)) / (ns.getScriptRam("localHack.js", server.hostname)));
    var portion = ns.hackAnalyze(server.hostname) * numThreads;
    var targetMoney = Math.floor(portion * server.moneyMax);
    ns.tprint(server.hostname, " target money: ", targetMoney)
    if (numThreads != 0) {
        if (verbose == true) {
            ns.tprint("SUCCESS Hacking ", server.hostname);
        }
        await ns.exec("localHack.js", server.hostname, numThreads, server.hostname, targetMoney, server.moneyMax);
    } else {
        var info = ns.ps(server.hostname);
        for (let i = 0; i < info.length; i++) {
            if (info[i].filename == "localHack.js" && ns.isRunning(info[i].pid)) {
                if (verbose == true) {
                    ns.tprint("SUCCESS Hacked ", server.hostname);
                    return
                }
            }
        }
        if (verbose == true) {
            ns.tprint("ERROR Not enough RAM to hack server: ", server.hostname);
        }
    }
}