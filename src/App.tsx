import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './design-system-components/layouts/baseLayout'
import { Carpentry } from './design-system-components/pages/carpentry'
import { Plumbing } from './design-system-components/pages/plumbing'

function App() {

  return (
    <BrowserRouter basename="/trade-locator">
      <Routes>
        <Route element={<BaseLayout id='base-layout' />}>
          <Route path="carpentry" element={<Carpentry />} />
          <Route path="plumbing" element={<Plumbing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

