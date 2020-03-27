import React from "react";
import { connect } from "react-redux";
import ArticleList from "./components/ArticleList";
import { Grommet, Main, Heading } from "grommet";
import { grommet } from "grommet/themes";
import SpecificArticle from "./components/SpecificArticle";
import { useTranslation } from 'react-i18next'
import i18n from './i18n'


const App = props => {
	const { t } = useTranslation()

	return (
		<Grommet full theme={grommet}>
			<Main fill align="center" justify="center">
				<Heading>{t('header.headline', {key: 'value'})}</Heading>{t('header.tagline')}
				<small
					style={{ cursor: 'pointer' }}
					onClick={() => i18n.changeLanguage('sv')}
				>{t('languages.swedish')}</small>
				<small
					style={{ cursor: 'pointer' }}
					onClick={() => i18n.changeLanguage('en')}
				>{t('languages.english')}</small>
				{props.state.showArticleList && <ArticleList />}
				{props.state.readArticle && <SpecificArticle />}
			</Main>
		</Grommet>
	)
}

const mapStateToProps = state => {
	return {
		state: state
	};
};

export default connect(mapStateToProps)(App);
