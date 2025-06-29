import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './design-system/layouts/baseLayout'
import { Home } from './app/home'
import { Carpentry } from './app/pages/services/carpentry'
import { Plumbing } from './app/pages/services/plumbing'
import { Masonry } from './app/pages/services/masonry'
import { Engineering } from './app/pages/services/engineering'
import { NotFound } from './app/pages/notFound'
import { Specials } from './app/pages/specials'
import { Pricing } from './app/pages/pricing'
import { FAQs } from './app/pages/faqs'
import { About } from './app/pages/about'
import { Quote } from './app/pages/quote'
import { SignUp } from './app/pages/signUp'
import { Login } from './app/pages/login'

function App() {

  return (
    <BrowserRouter basename="/trade-locator/">
      <Routes>
        <Route element={<BaseLayout id='base-layout' />}>
          <Route path="/" element={<Home />}>
            <Route path="plumbing" element={<Plumbing />} />
            <Route path="carpentry" element={<Carpentry />} />
            <Route path="masonry" element={<Masonry />} />
            <Route path="engineering" element={<Engineering />} />
          </Route>
          <Route path="specials" element={<Specials />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="about" element={<About />} />
          <Route path="quote" element={<Quote />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

