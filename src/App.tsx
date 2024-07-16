import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Authentification from './pages/authentification-page';
import Home from './pages/home-page';
import { withLayout } from './layout';
import TestsPage from 'pages/tests-page';
import AnalyticsPage from 'pages/analytics-page';
import TreatmentPlanPage from 'pages/treatmentplan-page';
import TimePlansPage from 'pages/timeplans-page';
import SettingsPage from 'pages/settings-page';
import OnboardingPage from 'pages/onboarding-page';
import SkillsPage from 'pages/skills-page';

function App() {
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
          path="/skills"
          element={withLayout(SkillsPage)()}
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
