import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlurFade } from "./ui/blur-fade";
import startupSound from "../assets/startup.mp3";

const MOCK_LOGS = [
  "bios: Scanning memory...",
  "bios: 32MB OK",
  "kernel: Booting...",
  "kernel: Loading drivers [######    ]",
  "kernel: Discovered CPU: 3D_ASCII_PROC_v1",
  "syslog: Mounting file systems...",
  "syslog: OK /",
  "network: Initializing eth0...",
  "network: Carrier detected",
  "init: Starting user session...",
  "init: Welcome.",
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
        setLogs((prev) => [...prev, MOCK_LOGS[index]]);
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
    if (!showHello) return;

    // Play iOS-like startup sound for exactly 2 seconds to avoid power off sfx
    const audio = new Audio(startupSound);
    audio.volume = 0.6;
    audio.play().catch(e => console.log("Audio play failed:", e));

    const stopTimer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);

    const timer = setTimeout(() => {
      onComplete();
    }, 1750);

    return () => {
      clearTimeout(timer);
      clearTimeout(stopTimer);
      audio.pause();
    };
  }, [showHello, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      className="boot-screen fixed inset-0 z-[100] font-code-sm text-code-sm p-4 overflow-hidden flex flex-col justify-end"
    >
      <AnimatePresence mode="wait">
        {!showHello ? (
          <motion.div
            key="boot-logs"
            className="flex flex-col gap-1 w-full max-w-7xl mx-auto h-full justify-end pb-12"
            exit={{ opacity: 0, y: -12, filter: "blur(8px)", transition: { duration: 0.28 } }}
          >
            {logs.map((log, i) => (
              <motion.div
                key={`${log}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-pre-wrap"
              >
                {log}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div key="boot-hello" className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <BlurFade className="boot-hello" duration={0.72} yOffset={16} blur="18px">
              <motion.h1
                className="boot-hello__word"
                initial={{ scale: 0.92, letterSpacing: "0.02em" }}
                animate={{ scale: [0.92, 1.035, 1], letterSpacing: ["0.02em", "0.08em", "0.06em"] }}
                transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
              >
                HELLO
              </motion.h1>
              <motion.span
                className="boot-hello__emoji"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.4, rotate: -24, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: [0.4, 1.18, 1],
                  rotate: [-24, 16, -10, 14, -6, 0],
                  y: [10, -3, 0],
                }}
                transition={{ delay: 0.22, duration: 1.18, ease: [0.16, 1, 0.3, 1] }}
              >
                👋
              </motion.span>
            </BlurFade>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
