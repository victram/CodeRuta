// Ejecuta el código del alumno en un Web Worker (hilo aparte) con un límite de tiempo,
// para que un bucle infinito no congele la app.

function workerMain() {
  const stable = (v) =>
    JSON.stringify(v, (k, val) =>
      val && typeof val === 'object' && !Array.isArray(val)
        ? Object.fromEntries(Object.keys(val).sort().map((key) => [key, val[key]]))
        : val
    );
  const fmt = (v) => {
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return JSON.stringify(v);
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  };

  self.onmessage = (e) => {
    const { code, tests } = e.data;
    const logs = [];
    const consoleProxy = {
      log: (...args) => logs.push(args.map((a) => (typeof a === 'string' ? a : fmt(a))).join(' ')),
    };
    consoleProxy.error = consoleProxy.log;
    consoleProxy.warn = consoleProxy.log;
    consoleProxy.info = consoleProxy.log;

    let thunks;
    try {
      const body = `${code}\n;return [${tests.map((t) => `() => (${t.call})`).join(',\n')}];`;
      thunks = new Function('console', body)(consoleProxy);
    } catch (err) {
      self.postMessage({ error: `${err.name}: ${err.message}`, logs });
      return;
    }

    const results = tests.map((t, i) => {
      try {
        const got = thunks[i]();
        return { call: t.call, pass: stable(got) === stable(t.expected), got: fmt(got), expected: fmt(t.expected) };
      } catch (err) {
        return { call: t.call, pass: false, got: `${err.name}: ${err.message}`, expected: fmt(t.expected) };
      }
    });
    self.postMessage({ results, logs: logs.slice(0, 20) });
  };
}

let workerUrl = null;
function getWorkerUrl() {
  if (!workerUrl) {
    const blob = new Blob([`(${workerMain.toString()})();`], { type: 'text/javascript' });
    workerUrl = URL.createObjectURL(blob);
  }
  return workerUrl;
}

/** @returns {Promise<{results?: Array, logs?: string[], error?: string, timedOut?: boolean}>} */
export function runCode(code, tests, timeoutMs = 2000) {
  return new Promise((resolve) => {
    const worker = new Worker(getWorkerUrl());
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ timedOut: true });
    }, timeoutMs);
    worker.onmessage = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(e.data);
    };
    worker.onerror = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ error: e.message || 'Error al ejecutar el código' });
      e.preventDefault();
    };
    worker.postMessage({ code, tests });
  });
}

export const runPassed = (run) => !!run && !run.error && !run.timedOut && run.results.every((r) => r.pass);
