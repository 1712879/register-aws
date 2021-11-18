import React, { Fragment, Suspense } from 'react'
import {Route, Switch} from 'react-router-dom'
import { routesConfig } from './routesConfig';
const CreatePage = React.lazy(() => import('../pages/PageCreate'));
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const renderRoutes = (
  routes
) => {
  return (
    <Switch>
      {routes &&
        routes.map((route, idx) => {
          const Layout = route.layout || Fragment
          const Guard = route.guard || Fragment
          const Component = route?.page || Fragment
          return <Route
            key={`routes-${idx}`}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes && route.routes.length > 0 ? (
                    renderRoutes(route.routes)
                  ) : (
                    <>
                        <Component {...props} />
                    </>
                  )}
                </Layout>
              </Guard>
            )}
          />
        })}
    </Switch>
  )
}

function Routes() {
  return (
    <Route
      render={({ location }) => (
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact={true} path="/" component={CreatePage} />
            {renderRoutes(routesConfig)}
            </Switch>
        </Suspense>
      )}
    />
  )
}

export default Routes
