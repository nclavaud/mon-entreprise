import { ThemeColorsProvider } from 'Components/utils/colors'
import { IsEmbeddedContext } from 'Components/utils/embeddedContext'
import Meta from 'Components/utils/Meta'
import useSimulationConfig from 'Components/utils/useSimulationConfig'
import PreviousSimulationBanner from 'Components/PreviousSimulationBanner'
import { default as React, useContext, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { SimulatorData } from './metadata'
import useSearchParamsSimulationSharing from 'Components/utils/useSearchParamsSimulationSharing'
import { SitePathsContext } from 'Components/utils/SitePathsContext'
import { useTranslation } from 'react-i18next'

export default function SimulateurPage({
	meta,
	title,
	config,
	tooltip,
	description,
	component: Component,
	seoExplanations,
	path,
}: SimulatorData[keyof SimulatorData]) {
	const inIframe = useContext(IsEmbeddedContext)
	const fromGérer = !!useLocation<{ fromGérer?: boolean }>().state?.fromGérer
	useSimulationConfig(config, { useExistingCompanyFromSituation: fromGérer })
	useSearchParamsSimulationSharing()

	// TODO : Move this logic elsewhere.
	//
	// Some user where expecting to be on a simulator for employers instead of the
	// one for employees coming from the page listing all incentives for
	// employers. This makes sense, but at the same time our main simulator works
	// for both employers and employees, so for now we just use a URL parameter
	// `?view=employeur` to cusomize the title of the page. We may want to provide
	// additional customization in the future depending to the targeted audience.
	const sitePaths = useContext(SitePathsContext)
	const view = new URLSearchParams(useLocation().search).get('view')
	const { t } = useTranslation()
	if (view === 'employeur' && path === sitePaths.simulateurs.salarié) {
		title = t(
			'pages.simulateurs.salarié.title-employeur',
			"Simulateur de coûts d'embauche"
		)
	}

	return (
		<>
			{meta && <Meta {...meta} />}
			{title && !inIframe && (
				<>
					<h1>{title}</h1>
					{tooltip && (
						<h2
							css={`
								margin-top: 0;
							`}
						>
							<small>{tooltip}</small>
						</h2>
					)}
				</>
			)}
			{description && !inIframe && description}

			<ThemeColorsProvider color={inIframe ? undefined : meta?.color}>
				<Component />
				{config && <PreviousSimulationBanner />}
				{seoExplanations && !inIframe && seoExplanations}
			</ThemeColorsProvider>
		</>
	)
}
