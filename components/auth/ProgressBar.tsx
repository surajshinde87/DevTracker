interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
