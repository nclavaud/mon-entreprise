import classnames from 'classnames'
import { useState } from 'react'
import emoji from 'react-easy-emoji'
import { Trans, useTranslation } from 'react-i18next'
import writtenNumbers from '../writtenNumbers'
import Explanation from '../Explanation'
import { InlineMecanismName, Mecanism, CapitalizeFirstLetter } from './common'
import styled from 'styled-components'

export default function Variations({ nodeValue, explanation, unit }) {
	let [expandedVariation, toggleVariation] = useState(null)
	const { i18n } = useTranslation()

	return (
		<StyledComponent>
			<Mecanism
				name="variations"
				displayName={false}
				unit={unit}
				value={nodeValue}
			>
				<>
					<CapitalizeFirstLetter>
						{writtenNumbers[i18n.language ?? 'fr'][explanation.length]}{' '}
						<InlineMecanismName name="variations" /> possibles :
					</CapitalizeFirstLetter>
					<ol>
						{explanation.map(({ condition, consequence, satisfied }, i) => (
							<li
								key={i}
								style={{
									transition: 'all 0.2s',
									opacity:
										expandedVariation === i || satisfied || nodeValue == null
											? 1
											: 0.8,
								}}
							>
								{!satisfied && nodeValue != null && (
									<>
										<em>non applicable </em>
										{expandedVariation !== i ? (
											<button
												className="ui__ link-button"
												onClick={() => toggleVariation(i)}
											>
												détails {emoji('▶️')}
											</button>
										) : (
											<button
												className="ui__ link-button"
												onClick={() => toggleVariation(null)}
											>
												replier {emoji('🔽')}
											</button>
										)}
									</>
								)}
								{(expandedVariation === i ||
									satisfied ||
									nodeValue == null) && (
									<div style={{ margin: '1rem 0' }}>
										{!condition.isDefault && (
											<div
												style={{
													display: 'flex',
													flexWrap: 'wrap',
													alignItems: 'baseline',
													marginBottom: '0.4rem',
												}}
											>
												<Trans>Si :</Trans>&nbsp;
												<Explanation node={condition} />
											</div>
										)}
										<div
											style={{
												display: 'flex',
												width: 'fit-content',
												flexWrap: 'wrap',
												alignItems: 'baseline',
											}}
										>
											<span
												className={classnames('consequenceType', {
													satisfied,
												})}
											>
												{!condition.isDefault ? (
													<Trans>Alors</Trans>
												) : (
													<Trans>Sinon</Trans>
												)}{' '}
												:&nbsp;
											</span>
											<span
												className={classnames('consequenceContent', {
													satisfied,
												})}
											>
												{consequence && <Explanation node={consequence} />}
											</span>
										</div>
									</div>
								)}
							</li>
						))}
					</ol>
				</>
			</Mecanism>
		</StyledComponent>
	)
}

const StyledComponent = styled.div`
	.mecanism > ol {
		margin-left: 1rem;
		margin-top: 1rem;
	}
	.mecanism > ol > li {
		margin-bottom: 0.3em;
	}
	.mecanism > ol > li span.consequenceType {
		margin: 0 0.6em 0.6em 0;
	}

	.mecanism > ol > li span.consequenceType.satisfied {
		background: yellow;
	}
`
