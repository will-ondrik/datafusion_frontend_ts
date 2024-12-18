import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tier1Route from './guards/Tier1Route';
import Tier2Route from './guards/Tier2Route';
import Tier3Route from './guards/Tier3Route';
import './App.css'
import Spinner from './components/animations/spinner/spinner';

//const AdManagement = lazy(() => import(''));
//const Analytics = lazy(() => import('./user-tiers/shared/pages/analytics/AnalyticsPage'));
const ApiIntegration = lazy(() => import('./pages/api-integration/ApiIntegrationPage'));
const BillingSubscription = lazy(() => import('./pages/billing-subscription/BillingPage'));
//const CompetitorAnalysis = lazy(() => import('./user-tiers/tier3/pages/competitor-analysis/CompetitorAnalysisPage'));
const ConfirmEmail = lazy(() => import('./pages/confirm-email/ConfirmEmailPage'))
const Contact = lazy(() => import('./pages/contact-us/ContactUsPage'));
const Dashboard = lazy(() => import('./pages/dashboard/DashboardPage'));
const Landing = lazy(() => import('./pages/landing/LandingPage'));
const Login = lazy(() => import('./pages/login/LoginPage'));
//const Notifications = lazy(() => import('./user-tiers/shared/pages/notifications/NotificationsPage'));
const Profile = lazy(() => import('./pages/profile/ProfilePage'));
const Pricing = lazy(() => import('./pages/pricing/PricingPage'));
const Registration = lazy(() => import('./pages/register/RegistrationPage'))
const ReportGenerator = lazy(() => import('./pages/report-generation/ReportGenerationPage'));
const ResetPassword = lazy(() => import('./pages/reset-password/ResetPasswordPage'));
//const SeoOptimization = lazy(() => import('./user-tiers/shared/pages/seo-optimization/SeoPage'))
const Settings = lazy(() => import('./pages/settings/SettingsPage'));
//const Subscribe = lazy(() => import('./shared/pages/subscribe/SubscribePage'));
const Support = lazy(() => import('./pages/support/SupportPage'))


function App() {
  return (
    <Router>
      <Suspense fallback={<div><Spinner /></div>}>
        <Routes>
          <Route path='/' element={ <Landing /> } />
          <Route path='/register' element={ <Registration /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/reset-password' element={ <ResetPassword /> } />
          <Route path='/contact-us' element={ <Contact /> } />
          <Route path='/confirm-email' element={ <ConfirmEmail /> } />
          <Route path='/pricing' element={ <Pricing /> } />

          {/* Tier 1 and Greater - Protected Routes */}
          <Route path='/api-integration' element={ 
            <Tier1Route>
              <ApiIntegration /> 
            </Tier1Route>
          } />

          <Route path='/billing' element={ 
            <Tier1Route>
              <BillingSubscription /> 
            </Tier1Route>
          } />

          <Route path='/dashboard' element={ 
            <Tier1Route>
              <Dashboard /> 
            </Tier1Route>
          } />

          <Route path='/profile' element={ 
            <Tier1Route>
              <Profile /> 
            </Tier1Route>
          } />


          <Route path='/settings' element={ 
            <Tier1Route>
              <Settings /> 
            </Tier1Route>
          } />

          <Route path='/support' element={ 
            <Tier1Route>
              <Support /> 
            </Tier1Route>
          } />

          {/* Tier 2 and Greater - Protected Routes */}
          {/*<Route path='/analytics' element={
            <Tier2Route>
              <Analytics /> 
            </Tier2Route>
          } />*/}

         {/*} <Route path='/dashboard/configuration' element={ 
            <Tier2Route>
              <DashBoardConfiguration /> 
            </Tier2Route>
          } />*/}

         {/*} <Route path='/notifications' element={ 
            <Tier2Route>
              <Notifications /> 
            </Tier2Route>
          } />*/}

          <Route path='/generate-report' element={ 
            <Tier3Route>
              <ReportGenerator /> 
            </Tier3Route>
          } />

          {/*<Route path='/seo-optimization' element={ 
            <Tier2Route>
              <SeoOptimization /> 
            </Tier2Route>
          } />*/}

          {/* Tier 3 - Protected Routes */}
         {/*} <Route path='/ad-management' element={ 
            <Tier3Route>
              <AdManagement /> 
            </Tier2Route>
          } />*/}

         {/*} <Route path='/competitor-analysis' element={ 
            <Tier3Route>
              <CompetitorAnalysis /> 
            </Tier2Route>
        } />*/}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
