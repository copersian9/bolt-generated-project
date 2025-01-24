import { lazy, Suspense } from 'react';

    const LazyComponent = ({ component, fallback = null }) => {
      // Remove the extra 'pages/' from the import path
      const Component = lazy(() => import(`../pages/${component}`));
      return (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      );
    };

    export default LazyComponent;
