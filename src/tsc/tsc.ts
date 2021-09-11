namespace ts {} // empty ts module so the module migration script knows this file depends on the `ts` project namespace
// This file actually uses arguments passed on commandline and executes it

// @ts-expect-error
const agent: typeof import("elastic-apm-node") = require("elastic-apm-node");

agent.start({
    serviceName: "typescript",
    serverUrl: "http://localhost:8200",
    active: true,
    transactionSampleRate: 1.0,
    logLevel: "off",
});

ts.Debug.loggingHost = {
    log(_level, s) {
        ts.sys.write(`${s || ""}${ts.sys.newLine}`);
    }
};

if (ts.Debug.isDebugging) {
    ts.Debug.enableDebugInfo();
}

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}

if (ts.sys.setBlocking) {
    ts.sys.setBlocking();
}

ts.executeCommandLine(ts.sys, ts.noop, ts.sys.args);
