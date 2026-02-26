import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MyProjects from './pages/MyProjects'
import Projects from './pages/Projects'
import Preview from './pages/Preview'
import View from './pages/View'
import Community from './pages/Community'
import Pricing from './pages/Pricing'
import Settings from './pages/Settings'
import Loading from './pages/Loading'
import AuthPage from './pages/auth/AuthPage'
import Templates from './pages/Templates'
import OnboardingComplete from './pages/OnboardingComplete'
import AIBuilder from './pages/AIBuilder'
import Privacy from './pages/Privacy'
import LenisProvider from './providers/LenisProvider'

function App() {
    return (
        <LenisProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/onboarding-complete" element={<OnboardingComplete />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/ai-builder" element={<AIBuilder />} />
                <Route path="/community" element={<Community />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/preview/:id" element={<Preview />} />
                <Route path="/view/:id" element={<View />} />
                <Route path="/loading" element={<Loading />} />
            </Routes>
        </LenisProvider>
    )
}

export default App
