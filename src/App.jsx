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
      <ProgressPath currentStep={state.currentStep} />
      
      <main className="flex-1 flex flex-col justify-center my-6">
        {renderStep()}
      </main>

      <Footer resetState={actions.resetState} />
    </div>
  );
}

export default App;
