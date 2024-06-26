import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

const mount = (element, options) => {
  const history = options.defaultHistory || createMemoryHistory({
    initialEntries: [options?.initialPath],
  });

  if (options?.onNavigate) {
    history.listen(options.onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={options?.onSignIn} />, element);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      if (history.location.pathname !== nextPathname)
      history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
