import Conversation, {
	ConversationProps,
} from 'Components/conversation/Conversation'
import SeeAnswersButton from 'Components/conversation/SeeAnswersButton'
import PageFeedback from 'Components/Feedback/PageFeedback'
import Notifications from 'Components/Notifications'
import SearchButton from 'Components/SearchButton'
import ShareSimulationBanner from 'Components/ShareSimulationBanner'
import TargetSelection from 'Components/TargetSelection'
import * as Animate from 'Components/ui/animate'
import Progress from 'Components/ui/Progress'
import { useSimulationProgress } from 'Components/utils/useNextQuestion'
import React from 'react'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { firstStepCompletedSelector } from 'Selectors/simulationSelectors'

type SimulationProps = {
	explanations?: React.ReactNode
	results?: React.ReactNode
	children?: React.ReactNode
	customEndMessages?: ConversationProps['customEndMessages']
	showPeriodSwitch?: boolean
}

export default function Simulation({
	explanations,
	results,
	children,
	customEndMessages,
	showPeriodSwitch,
}: SimulationProps) {
	const firstStepCompleted = useSelector(firstStepCompletedSelector)

	const simulationBloc = children ?? (
		<TargetSelection showPeriodSwitch={showPeriodSwitch} />
	)
	return (
		<>
			{simulationBloc}
			<SearchButton invisibleButton />
			{firstStepCompleted && (
				<Animate.fromTop>
					{results}
					<ShareSimulationBanner />
					<Questions customEndMessages={customEndMessages} />
					<br />
					<PageFeedback
						customMessage={
							<Trans i18nKey="feedback.simulator">
								Êtes-vous satisfait de ce simulateur ?
							</Trans>
						}
						customEventName="rate simulator"
					/>
					{explanations}
				</Animate.fromTop>
			)}
		</>
	)
}

export function Questions({
	customEndMessages,
}: {
	customEndMessages?: ConversationProps['customEndMessages']
}) {
	const progress = useSimulationProgress()

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '1.2rem',
					marginBottom: '0.6rem',
				}}
			>
				{progress < 1 ? (
					<small css="padding: 0.4rem 0">
						<Trans i18nKey="simulateurs.précision.défaut">
							Affinez votre simulation en répondant aux questions :
						</Trans>
					</small>
				) : (
					<span />
				)}
				<SeeAnswersButton />
			</div>
			<section className="ui__ full-width lighter-bg">
				<div className="ui__ container">
					<Notifications />
					<Conversation customEndMessages={customEndMessages} />
				</div>
			</section>
			{progress < 1 && (
				<Progress progress={progress} className="ui__ full-width" />
			)}
		</>
	)
}
