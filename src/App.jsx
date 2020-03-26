import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleList from "./components/ArticleList";
import { Grommet, Main, Heading } from "grommet";
import { grommet } from "grommet/themes";
import SpecificArticle from "./components/SpecificArticle";
import SubscriptionForm from './components/SubscriptionForm'
import { Elements } from "react-stripe-elements";

class App extends Component {
	render() {
		return (
			<Grommet full theme={grommet}>
				<Main fill align="center" justify="center">
					<Heading>Urban Living</Heading>A source of work / life inspiration for
          young professionals.
					{this.props.state.flashMessage.length > 0 && <h2 id='message'>{this.props.state.flashMessage}</h2>}
          {this.props.state.showArticleList && <ArticleList />}
					{this.props.state.readArticle && <SpecificArticle />}
					{this.props.state.showSubscriptionForm && <Elements><SubscriptionForm /></Elements>}
				</Main>
			</Grommet>
		);
	}
}

const mapStateToProps = state => {
	return {
		state: state
	};
};

export default connect(mapStateToProps)(App);
