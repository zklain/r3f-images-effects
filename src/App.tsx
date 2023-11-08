import { NavLink } from 'react-router-dom'
import './App.css'
import { AppCanvas } from './components/AppCanvas'
import { routes } from './router/routes'

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>R3F Effects</h1>
        <nav className="navigation">
          {routes.map(({ name, path }) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
        </nav>
      </header>
      <AppCanvas />
    </div>
  )
}

export default App
