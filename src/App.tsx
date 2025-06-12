import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './design-system-components/layouts/baseLayout'
import { Home } from './design-system-components/pages/home'
import { Carpentry } from './design-system-components/pages/carpentry'
import { Plumbing } from './design-system-components/pages/plumbing'
import { Masonry } from './design-system-components/pages/masonry'
import { Engineering } from './design-system-components/pages/engineering'
import { NotFound } from './design-system-components/pages/notFound'

function App() {

  return (
    <BrowserRouter basename="/trade-locator">
      <Routes>
        <Route element={<BaseLayout id='base-layout' />}>
          <Route path="/" element={<Home />} />
          <Route path="carpentry" element={<Carpentry />} />
          <Route path="plumbing" element={<Plumbing />} />
          <Route path="" element={<Masonry />} />
          <Route path="" element={<Engineering />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

