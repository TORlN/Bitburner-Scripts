function findDistinctCombos(num, maximum, memo = new Map()) {
    const key = `${num}-${maximum}`;
    if (memo.has(key)) {
        return memo.get(key);
    }
    if (num === 0) {
        return 1;
    } else if (num < 0 || maximum === 0) {
        return 0;
    }
    const result = findDistinctCombos(num - maximum, maximum, memo) + findDistinctCombos(num, maximum - 1, memo);
    memo.set(key, result);
    return result;
}

function arrayCombos(num, lst, index, total, memo = new Map()) {
    const key = `${num}-${index}-${total}`;
    if (memo.has(key)) {
        return memo.get(key);
    }
    if (total === num) {
        return 1;
    }
    if (total > num) {
        return 0;
    }
    if (index >= lst.length) {
        return 0;
    }
    const result = arrayCombos(num, lst, index, total + lst[index], memo) + arrayCombos(num, lst, index + 1, total, memo);
    memo.set(key, result);
    return result;
}

function printLogging(ns, str, type, server, data) {
    if (str != "") {
        ns.tprint("\u001b[35m" + "Solved " + type + " contract on " + server + "\u001b[0m");
    } else {
        ns.tprint("\u001b[31m" + "Failed to solve " + type + " contract on " + server + "\u001b[0m");
        ns.tprint(data);
    }
}

function spiralize(ns, arr) {
    var result = [];
    var top = 0;
    var bottom = arr.length - 1;
    var left = 0;
    var right = arr[0].length - 1;
    var dir = 0;
    while (top <= bottom && left <= right) {
        if (dir == 0) {
            for (let i = left; i <= right; i++) {
                result.push(arr[top][i]);
            }
            top++;
        } else if (dir == 1) {
            for (let i = top; i <= bottom; i++) {
                result.push(arr[i][right]);
            }
            right--;
        } else if (dir == 2) {
            for (let i = right; i >= left; i--) {
                result.push(arr[bottom][i]);
            }
            bottom--;
        } else if (dir == 3) {
            for (let i = bottom; i >= top; i--) {
                result.push(arr[i][left]);
            }
            left++;
        }
        dir = (dir + 1) % 4;
    }
    return result;
}

function findLargestPrimeFactor(num) {
    var largest = 0;
    for (let i = 2; i <= num; i++) {
        while (num % i == 0) {
            largest = i;
            num /= i;
        }
    }
    return largest;
}

function maxSubarraySum(arr, memo = new Map()) {
    const key = arr.join(',');
    if (memo.has(key)) {
        return memo.get(key);
    }
    if (arr.length == 1) {
        return arr[0];
    }
    var maxOriginal = arr.reduce((a, b) => a + b, 0);
    var rightArr = arr.slice(0, -1);
    var leftArr = arr.slice(1);
    var result = Math.max(maxSubarraySum(rightArr, memo), maxSubarraySum(leftArr, memo), maxOriginal);
    memo.set(key, result);
    return result;
}

function arrayJumpingGame(arr) {
    let maxReach = 0;
    for (let i = 0; i < arr.length; i++) {
        if (maxReach < i) {
            return 0;
        }
        maxReach = Math.max(maxReach, i + arr[i]);
        if (maxReach >= arr.length - 1) {
            return 1;
        }
    }
    return 0;
}
function arrayJumpingGameTwo(arr, memo = new Map()) {
    const key = arr.join(',');
    if (memo.has(key)) {
        return memo.get(key);
    }
    if (arr.length == 1) {
        return 0;
    }
    if (arr.length == 0 || arr[0] == 0) {
        return Infinity;
    }
    var minJump = Infinity;
    for (let i = 1; i <= arr[0]; i++) {
        minJump = Math.min(arrayJumpingGameTwo(arr.slice(i)) + 1, minJump);
    }
    memo.set(key, minJump);
    return minJump;
}

function mergeOverlapping(arr) {
    var intervals = [arr[0]];
    arr.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < intervals.length; j++) {
            if (arr[i][0] >= intervals[j][0] && arr[i][1] <= intervals[j][1]) {
                break;
            } else if (arr[i][0] >= intervals[j][0]) {
                intervals[j][1] = arr[i][1];
            } else if (arr[i][1] <= intervals[j][1]) {
                intervals[j][0] = arr[i][0];
            } else {
                intervals.push(arr[i]);
            }
        }
    }
    return intervals;
}
/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var file = ns.args[1];
    var verbose = ns.args[2];
    var data = await ns.codingcontract.getData(file, server);
    switch (await ns.codingcontract.getContractType(file, server)) {
        case "Total Ways to Sum":
            var soln = await findDistinctCombos(data, data) - 1;
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Total Ways to Sum", server, data);
            }
            break;
        case "Total Ways to Sum II":
            var soln = await arrayCombos(data[0], data[1], 0, 0);
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Total Ways to Sum II", server, data);
            }
            break;
        case "Spiralize Matrix":
            var soln = await spiralize(ns, data);
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Spiralize Matrix", server, data);
            }
            break;
        case "Find Largest Prime Factor":
            var soln = await findLargestPrimeFactor(data);
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Find Largest Prime Factor", server, data);
            }
            break;
        case "Subarray with Maximum Sum":
            var soln = await maxSubarraySum(data);
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Subarray with Maximum Sum", server, data);
            }
            break;
        case "Array Jumping Game":
            var soln = await arrayJumpingGame(data);
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Array Jumping Game", server, data);
            }
            break;
        case "Array Jumping Game II":
            var soln = await arrayJumpingGameTwo(data);
            if (soln == Infinity) {
                soln = 0;
            }
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Array Jumping Game II", server, data);
            }
            break;
        // case "Merge Overlapping Intervals":
        //     var soln = await mergeOverlapping(data);
        //     var str = await ns.codingcontract.attempt(soln, file, server);
        //     ns.tprint(soln);
        //     if (verbose) {
        //         printLogging(ns, str, "Merge Overlapping Intervals", server, data);
        //     }
        //     break;
        default:
            break;
    }
}
