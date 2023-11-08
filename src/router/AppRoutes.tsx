import App from '@/App'
import { Loader } from '@/components/Loader'
import { Text } from '@react-three/drei'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to={routes[0].path} replace />} />
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <React.Suspense fallback={<Loader />}>{element}</React.Suspense>
            }
          />
        ))}
        <Route
          path="*"
          element={
            <React.Suspense fallback={null}>
              <group>
                <Text>404</Text>
              </group>
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
