import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './design-system-components/layouts/baseLayout'
import { Home } from './design-system-components/pages/home'
import { About } from './design-system-components/pages/about'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout id='base-layout' />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={"#contact"} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

