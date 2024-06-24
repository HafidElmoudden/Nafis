import React from 'react';
import Tick from 'assets/icons/tick.svg';

type ProgressBarProps = {
    steps: { title: string, description: string, completed: string }[]
}

const ProgressBar = ({steps}: ProgressBarProps) => {
    return (
        <div className="flex flex-col items-start pl-8">
            {steps.map((step, index) => (
                <div key={index} className="flex gap-5 justify-start py-px">
                    <div className="flex flex-col items-center pt-0.5 pb-0.5">
                        <div className={`flex flex-col items-center `}>
                            <div className={`flex justify-center items-center w-10 h-10 rounded-full border-2 ${step.completed == "true" || step.completed == "current" ? 'bg-blue-50 border-blue-600' : 'bg-white'}`}>
                                {step.completed == "true" ?
                                    <img src={Tick} />
                                    : step.completed == "false" ? (
                                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                    ) : <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                            </div>
                            {index !== steps.length - 1 && (
                                <div className={`shrink-0 mt-1 rounded-sm h-16 w-[2px] ${steps[index].completed === "true" ? 'bg-blue-600' : steps[index + 1].completed === "current" ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-s pt-1.5 pb-8 text-base leading-6">
                        <div className={`text-left font-bold ${step.completed == "current" ? 'text-blue-600' : 'text-gray-700'}`}>{step.title}</div>
                        <div className={`text-left ${step.completed == "current" ? 'text-blue-600' : 'text-gray-600'}`}>{step.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
