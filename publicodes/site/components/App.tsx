// TODO: This is need to display the documentation UI, because the translations
// for UI components are handled in the mon-entreprise site and not in the
// publicodes-react package. This should be fixed.
import '../../../mon-entreprise/source/locales/i18n'
import 'Components/ui/index.css'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import Communauté from '../pages/Communauté'
import Documentation from '../pages/Documentation'
import Landing from '../pages/Landing'
import { Header } from './Header'
import LazyStudio from './LazyStudio'
import Provider from './Provider'

function Router() {
	return (
		<Provider basename="publicodes">
			<RouterSwitch />
		</Provider>
	)
}

const RouterSwitch = () => {
	useEffect(() => {
		removeLoadingLogo()
	}, [])
	return (
		<>
			<Header />
			<div
				className="app-content ui__ container"
				css={`
					main {
						margin: 2rem 0;
					}
				`}
			>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/studio" component={LazyStudio} />
					<Route path="/documentation" component={Documentation} />
					<Route exact path="/communauté" component={Communauté} />
				</Switch>
			</div>
		</>
	)
}

const removeLoadingLogo = () => {
	const css = document.createElement('style')
	css.type = 'text/css'
	css.innerHTML = `
		#js {
			animation: appear 0.5s;
			opacity: 1;
		}
		#loading {
			display: none !important;
		}`
	document.body.appendChild(css)
}

export default hot(module)(Router)
