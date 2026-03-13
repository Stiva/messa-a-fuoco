import React from 'react';
import useWizardState from './hooks/useWizardState';
import ProgressPath from './components/ProgressPath';
import Footer from './components/Footer';

// Steps
import Step1Intro from './steps/Step1Intro';
import Step2Focus from './steps/Step2Focus';
import Step3Design from './steps/Step3Design';
import Step4Output from './steps/Step4Output';

function App() {
  const { state, actions } = useWizardState();

  // Determine the maximum step the user is allowed to navigate to
  // If they have all 10 answers in step 2, they can goto step 3
  // If they have some plan in step 3 or we consider it visited, they can goto step 4
  // Actually, since currentStep is saved, maybe we just use a calculated maxStep based on what's filled?
  // Let's keep it simple: any step <= currentStep is clickable, but what if they go back and want to go forward?
  // We can add a `maxStepReached` to the state to track the furthest step they've reached.
  // We didn't add it to useWizardState. Let's just calculate based on data for now or pass actions.
  
  // To allow navigating forward if data exists:
  const isStep2Completed = Object.keys(state.quizAnswers).length === 10;
  const isStep3Completed = Object.values(state.plan).some(v => v.trim() !== '');

  let maxAllowedStep = 1;
  if (state.currentStep > 1 || isStep2Completed) maxAllowedStep = Math.max(maxAllowedStep, 2);
  if (state.currentStep > 2 || (isStep2Completed && state.profile)) maxAllowedStep = Math.max(maxAllowedStep, 3);
  if (state.currentStep > 3 || isStep3Completed) maxAllowedStep = Math.max(maxAllowedStep, 4);
  
  // Let's just track the historical max step reached directly dynamically
  const maxStepReached = Math.max(state.currentStep, maxAllowedStep);

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1Intro proceed={actions.nextStep} />;
      case 2:
        return <Step2Focus actions={actions} quizAnswers={state.quizAnswers} />;
      case 3:
        return <Step3Design actions={actions} plan={state.plan} profile={state.profile} />;
      case 4:
        return <Step4Output />;
      default:
        return <Step1Intro proceed={actions.nextStep} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto px-4 py-6 font-sans">
      <ProgressPath 
        currentStep={state.currentStep} 
        jumpToStep={actions.jumpToStep}
        maxStepReached={maxStepReached}
      />
      
      <main className="flex-1 flex flex-col justify-center my-6">
        {renderStep()}
      </main>

      <Footer resetState={actions.resetState} />
    </div>
  );
}

export default App;
