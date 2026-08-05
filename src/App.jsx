import { HashRouter } from 'react-router-dom'
import Layout from './shared/components/Layout.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <HashRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </HashRouter>
  )
}

export default App
