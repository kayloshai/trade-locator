import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './design-system-components/layouts/baseLayout'
import { Home } from './design-system-components/pages/home'
import { Carpentry } from './design-system-components/pages/carpentry'
import { Plumbing } from './design-system-components/pages/plumbing'
import { Masonry } from './design-system-components/pages/masonry'
import { Engineering } from './design-system-components/pages/engineering'
import { NotFound } from './design-system-components/pages/notFound'
import { Specials } from './design-system-components/pages/specials'
import { Pricing } from './design-system-components/pages/pricing'
import { FAQs } from './design-system-components/pages/faqs'
import { About } from './design-system-components/pages/about'
import { Quote } from './design-system-components/pages/quote'
import { SignUp } from './design-system-components/pages/signUp'
import { Login } from './design-system-components/pages/login'

function App() {

  return (
    <BrowserRouter basename="/trade-locator">
      <Routes>
        <Route element={<BaseLayout id='base-layout' />}>
          <Route path="/" element={<Home />} />
          <Route path="carpentry" element={<Carpentry />} />
          <Route path="plumbing" element={<Plumbing />} />
          <Route path="masonry" element={<Masonry />} />
          <Route path="engineering" element={<Engineering />} />

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

