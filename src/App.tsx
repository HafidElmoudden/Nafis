import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Authentification from './pages/authentification';
import Home from './pages/home';
import { withLayout } from './Layout';
import TestsPage from 'pages/tests-page';
import AnalyticsPage from 'pages/analytics-page';
import TreatmentPlanPage from 'pages/treatmentplan-page';
import TimePlansPage from 'pages/timeplans-page';
import SettingsPage from 'pages/settings-page';
import OnboardingPage from 'pages/onboarding-page';


function App() {
  console.log("eLHAPPENO");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Authentification />}
        />
        <Route
          path="/onboarding"
          element={<OnboardingPage />}
        />
        <Route
          path="/home"
          element={withLayout(Home)()}
        />
        <Route
          path="/tests"
          element={withLayout(TestsPage)()}
        />
        <Route
          path="/analytics"
          element={withLayout(AnalyticsPage)()}
        />
        <Route
          path="/treatmentplans"
          element={withLayout(TreatmentPlanPage)()}
        />
        <Route
          path="/timeplans"
          element={withLayout(TimePlansPage)()}
        />
        <Route
          path="/settings"
          element={withLayout(SettingsPage)()}
        />
      </Routes>
    </Router>
  );
}

export default App;
