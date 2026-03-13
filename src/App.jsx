import React from 'react';
import useWizardState from './hooks/useWizardState';
import useSanityContent from './hooks/useSanityContent';
import ProgressPath from './components/ProgressPath';
import Footer from './components/Footer';

// Steps
import Step1Intro from './steps/Step1Intro';
import Step2Focus from './steps/Step2Focus';
import Step3Design from './steps/Step3Design';
import Step4Output from './steps/Step4Output';

function App() {
  const { state, actions } = useWizardState();
  const { content, isLoading } = useSanityContent();

  const isStep2Completed = Object.keys(state.quizAnswers).length === 10;
  const isStep3Completed = Object.values(state.plan).some(v => v.trim() !== '');

  let maxAllowedStep = 1;
  if (state.currentStep > 1 || isStep2Completed) maxAllowedStep = Math.max(maxAllowedStep, 2);
  if (state.currentStep > 2 || (isStep2Completed && state.profile)) maxAllowedStep = Math.max(maxAllowedStep, 3);
  if (state.currentStep > 3 || isStep3Completed) maxAllowedStep = Math.max(maxAllowedStep, 4);
  
  const maxStepReached = Math.max(state.currentStep, maxAllowedStep);

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1Intro proceed={actions.nextStep} cms={content?.step1} />;
      case 2:
        return (
          <Step2Focus 
            actions={actions} 
            quizAnswers={state.quizAnswers}
            cmsQuestions={content?.quizQuestions}
            cmsProfiles={content?.quizProfiles}
          />
        );
      case 3:
        return (
          <Step3Design 
            actions={actions} 
            plan={state.plan} 
            profile={state.profile}
            cmsFocus={content?.focusCards}
            cmsInstructions={content?.gameInstructions}
          />
        );
      case 4:
        return <Step4Output cms={content?.step4} />;
      default:
        return <Step1Intro proceed={actions.nextStep} cms={content?.step1} />;
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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
          </div>
        ) : (
          renderStep()
        )}
      </main>

      <Footer resetState={actions.resetState} />
    </div>
  );
}

export default App;
