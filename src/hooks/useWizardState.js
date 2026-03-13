import { useState, useEffect } from 'react';

const initialState = {
  currentStep: 1,
  quizAnswers: {},
  profile: null,
  plan: {
    tappa1: '',
    tappa2: '',
    tappa3: '',
    tappa4: '',
    tappa5: '',
  }
};

const STORAGE_KEY = 'scoutWizardState';

export default function useWizardState() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch (e) {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }));
  };

  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }));
  };

  const setQuizAnswer = (questionId, answer) => {
    setState(prev => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: answer
      }
    }));
  };

  const setProfile = (profile) => {
    setState(prev => ({ ...prev, profile }));
  };

  const updatePlan = (tappa, value) => {
    setState(prev => ({
      ...prev,
      plan: {
        ...prev.plan,
        [tappa]: value
      }
    }));
  };

  const jumpToStep = (step) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const resetState = () => {
    if (window.confirm("Sei sicuro di voler azzerare il sentiero? Perderai tutti i progressi.")) {
      localStorage.removeItem(STORAGE_KEY);
      setState(initialState);
    }
  };

  return {
    state,
    actions: {
      nextStep,
      prevStep,
      jumpToStep,
      setQuizAnswer,
      setProfile,
      updatePlan,
      resetState
    }
  };
}
