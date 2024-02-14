"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  PauseIcon,
  TimerIcon,
  TimerResetIcon,
} from "lucide-react";
import { Orbitron } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timer: any;
    if (isTimerRunning) {
      timer = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          setIsTimerRunning(false);
          audioRef.current?.play();
        } else if (minutes === 0 && seconds === 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning, hours, minutes, seconds]);

  const startTimer = () => {
    if (hours == 0 && minutes == 0 && seconds == 0) {
      return toast({
        title: "Alert: Set Timer",
        description: "Please set the timer before start.",
      });
    }
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex gap-3 items-center flex-col md:flex-row">
        <div className="flex gap-3 w-72 relative">
          <span className="absolute -top-4 md:-top-7 text-red-400">Hours</span>
          <h1 className={cn("text-9xl", orbitron.className)}>
            {hours < 10 ? "0" : null}
            {hours}
          </h1>
          {isTimerRunning ? (
            <div className="flex justify-between flex-col absolute right-3 bottom-3 h-full animate-pulse">
              <h2 className="text-9xl">:</h2>
            </div>
          ) : (
            <div className="flex justify-between flex-col absolute right-0 h-full">
              <Button
                size="icon"
                disabled={isTimerRunning}
                onClick={() => hours < 12 && setHours(hours + 1)}
                variant="ghost"
                className="opacity-20 hover:opacity-100"
              >
                <ChevronUp />
              </Button>
              <Button
                size="icon"
                disabled={isTimerRunning}
                variant="ghost"
                onClick={() => hours > 0 && setHours(hours - 1)}
                className="opacity-20 hover:opacity-100"
              >
                <ChevronDown />
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-3 w-72 relative">
          <span className="absolute -top-4 md:-top-7 text-red-400">Minutes</span>
          <h1 className={cn("text-9xl", orbitron.className)}>
            {minutes < 10 ? "0" : null}
            {minutes}
          </h1>
          {isTimerRunning ? (
            <div className="flex justify-between flex-col absolute right-3 bottom-3 h-full animate-pulse">
              <h2 className="text-9xl">:</h2>
            </div>
          ) : (
            <div className="flex justify-between flex-col absolute right-0 h-full">
              <Button
                size="icon"
                disabled={isTimerRunning}
                onClick={() => minutes < 59 && setMinutes(minutes + 1)}
                variant="ghost"
                className="opacity-20 hover:opacity-100 disabled:opacity-0"
              >
                <ChevronUp />
              </Button>
              <Button
                size="icon"
                disabled={isTimerRunning}
                onClick={() => minutes > 0 && setMinutes(minutes - 1)}
                variant="ghost"
                className="opacity-20 hover:opacity-100  disabled:opacity-0"
              >
                <ChevronDown />
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-3 w-72 relative">
          <span className="absolute -top-4 md:-top-7 text-red-400">Seconds</span>
          <h1 className={cn("text-9xl", orbitron.className)}>
            {seconds < 10 ? "0" : null}
            {seconds}
          </h1>
          <div className="flex justify-between flex-col absolute right-0 h-full">
            <Button
              size="icon"
              disabled={isTimerRunning}
              onClick={() => seconds < 59 && setSeconds(seconds + 1)}
              variant="ghost"
              className="opacity-20 hover:opacity-100 disabled:opacity-0"
            >
              <ChevronUp />
            </Button>
            <Button
              size="icon"
              disabled={isTimerRunning}
              onClick={() => seconds > 0 && setSeconds(seconds - 1)}
              variant="ghost"
              className="opacity-20 hover:opacity-100 disabled:opacity-0"
            >
              <ChevronDown />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center mt-8">
        <Button
          onClick={startTimer}
          className="disabled:opacity-0 transition-all"
          disabled={isTimerRunning}
        >
          <TimerIcon className="mr-3" />
          Start
        </Button>
        <Button
          onClick={stopTimer}
          className="disabled:hidden transition-all"
          disabled={!isTimerRunning}
        >
          <PauseIcon className="mr-3" />
          Pause
        </Button>
        <Button
          onClick={resetTimer}
          className="disabled:opacity-0 transition-all"
          disabled={isTimerRunning}
        >
          <TimerResetIcon className="mr-2" />
          Reset
        </Button>
      </div>
      <audio ref={audioRef} src="/timer-out.mp3" />
    </main>
  );
}
