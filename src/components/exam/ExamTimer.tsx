
import { useEffect, useState } from "react";
import { AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

const ExamTimer = ({ totalSeconds, onTimeUp, isPaused = false }: ExamTimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (isPaused) return;
    
    const warningThreshold = Math.min(300, totalSeconds * 0.1); // 5 minutes or 10% of total time
    
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        
        const newTime = prev - 1;
        
        // Set warning when less than 5 minutes (or 10% of total time) remain
        if (newTime <= warningThreshold && !isWarning) {
          setIsWarning(true);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds, onTimeUp, isPaused, isWarning]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className={cn(
      "flex items-center rounded-md px-3 py-1.5 text-sm font-medium",
      isWarning 
        ? "bg-red-100 text-red-600 animate-pulse"
        : "bg-catpns-lighter text-catpns-primary"
    )}>
      {isWarning ? (
        <AlertCircle className="h-4 w-4 mr-1.5" />
      ) : (
        <Clock className="h-4 w-4 mr-1.5" />
      )}
      <span className="font-mono">
        {hours > 0 ? `${formatTime(hours)}:` : ''}
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
};

export default ExamTimer;
