import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_LOGS = [
  "bios: Scanning memory...",
  "bios: 32MB OK",
  "kernel: Booting...",
  "kernel: Loading drivers [██████    ]",
  "kernel: Discovered CPU: 3D_ASCII_PROC_v1",
  "syslog: Mounting file systems...",
  "syslog: OK /",
  "network: Initializing eth0...",
  "network: Carrier detected",
  "init: Starting user session...",
  "init: Welcome."
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    const bootDurationMs = 1500;
    const tickMs = Math.max(40, Math.floor(bootDurationMs / MOCK_LOGS.length));
    let index = 0;
    const interval = setInterval(() => {
      if (index < MOCK_LOGS.length) {
        setLogs(prev => [...prev, MOCK_LOGS[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, tickMs);

    const helloTimer = setTimeout(() => {
      setShowHello(true);
    }, bootDurationMs);

    return () => {
      clearInterval(interval);
      clearTimeout(helloTimer);
    };
  }, []);

  useEffect(() => {
    if (showHello) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // HELLO shows for 500ms
      return () => clearTimeout(timer);
    }
  }, [showHello, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 z-[100] bg-surface text-surface-tint font-code-sm text-code-sm p-4 overflow-hidden flex flex-col justify-end"
    >
      <AnimatePresence>
        {!showHello ? (
          <motion.div className="flex flex-col gap-1 w-full max-w-7xl mx-auto h-full justify-end pb-12">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-pre-wrap"
              >
                {log}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 1, 0, 1, 1],
              x: [0, -10, 10, -5, 0],
              filter: ["contrast(1)", "contrast(5) invert(1)", "contrast(1)"],
            }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h1 className="font-display-lg text-[10vw] text-primary whitespace-pre">
              HELLO
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}