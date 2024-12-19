import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tier1Route from './guards/tier1_guard';
import Tier2Route from './guards/tier2_guard';
import Tier3Route from './guards/tier3_guard';
import './App.css'
import Spinner from './components/animations/spinner/spinner';

//const AdManagement = lazy(() => import(''));
//const Analytics = lazy(() => import('./user-tiers/shared/pages/analytics/AnalyticsPage'));
const ApiIntegration = lazy(() => import('./pages/api-integration/api_integration_page'));
const BillingSubscription = lazy(() => import('./pages/billing-subscription/billing_page'));
//const CompetitorAnalysis = lazy(() => import('./user-tiers/tier3/pages/competitor-analysis/CompetitorAnalysisPage'));
const ConfirmEmail = lazy(() => import('./pages/confirm-email/confirm_email_page'))
const Contact = lazy(() => import('./pages/contact-us/contact_us_page'));
const Dashboard = lazy(() => import('./pages/dashboard/dashboard_page'));
const Landing = lazy(() => import('./pages/landing/landing_page'));
const Login = lazy(() => import('./pages/login/login_page'));
//const Notifications = lazy(() => import('./user-tiers/shared/pages/notifications/NotificationsPage'));
const Profile = lazy(() => import('./pages/profile/profile_page'));
const Pricing = lazy(() => import('./pages/pricing/pricing_page'));
const Registration = lazy(() => import('./pages/register/registration_page'))
const ReportGenerator = lazy(() => import('./pages/report-generation/report_generation_page'));
const ResetPassword = lazy(() => import('./pages/reset-password/reset_password_page'));
//const SeoOptimization = lazy(() => import('./user-tiers/shared/pages/seo-optimization/SeoPage'))
const Settings = lazy(() => import('./pages/settings/settings_page'));
//const Subscribe = lazy(() => import('./shared/pages/subscribe/SubscribePage'));
const Support = lazy(() => import('./pages/support/support_page'))


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
