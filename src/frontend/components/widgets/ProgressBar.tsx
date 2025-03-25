import { useState, useEffect } from "react";

interface ProgressBarProps {
  timeInSeconds: number;
  countUp?: boolean;
  progressColor?: string;
  isActive: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ timeInSeconds, countUp = false, progressColor = "bg-blue-500", isActive }) => {
  const [progress, setProgress] = useState(countUp ? 0 : 100);

  useEffect(() => {
    if (!isActive) return;
    
    let startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      let newProgress = countUp
        ? (elapsed / timeInSeconds) * 100
        : 100 - (elapsed / timeInSeconds) * 100;

      setProgress(Math.max(0, Math.min(100, newProgress)));

      if (elapsed >= timeInSeconds) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timeInSeconds, countUp, isActive]);

  return (
    <div className="w-full h-1 bg-gray-300 rounded overflow-hidden">
      <div
        className={`h-full ${progressColor} transition-all`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
