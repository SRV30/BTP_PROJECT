import { BrowserRouter } from './routes/routerPrimitives'
import { AppRoutes } from './routes/AppRoutes'

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)

export default App
