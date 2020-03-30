import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Grommet, Button } from "grommet";
import { grommet } from "grommet/themes";

class SpecificArticle extends Component {
	state = {
		premiumUser: false
	};

	componentDidMount() {
		this.props.currentUser.role === "subscriber" &&
			this.setState({ premiumUser: true });
	}

	render() {
		let specArticle;
		let articleContent;
		let showContent;
		let trimmedArticle;

		if (this.props.readArticle) {
			specArticle = this.props.readArticle;

			if (specArticle.article_class === "premium" && !this.state.premiumUser) {
				trimmedArticle = specArticle.content.substring(0, 200) + "...";
			}

			articleContent =
				specArticle.article_class === "free" || this.state.premiumUser
					? specArticle.content
					: trimmedArticle;
		}
		showContent =
			specArticle.article_class === "free" || this.state.premiumUser ? (
				<>
					<div className="spec-content">
						<p>{articleContent}</p>
					</div>
					<div className="created-date">
						<p>Submitted on {specArticle.created_at}</p>
					</div>
				</>
			) : (
					<>
						<div className="spec-content restricted">
							<p>{articleContent}</p>
						</div>
						<p>
							This article require a premium membership.{" "}
							<Button
								onClick={() => this.props.dispatch({ type: 'SUBSCRIPTION_FORM', payload: { showSubscriptionForm: true } })}
								label="Buy Subscription"
								color="lightgreen"
							/>
						</p>
					</>
				);

		return (
			<Grommet full theme={grommet}>
				<Box
					direction="row"
					border={{ color: "brand", size: "small" }}
					pad="medium"
					margin="medium"
					className="article"
					id={specArticle.id}
				>
					<div>
						<div className="spec-title">
							<h2>{specArticle.title}</h2>
						</div>
						{showContent}
					</div>
				</Box>
				<Box align="center">
					<Button
						type="submit"
						label="Back"
						onClick={() => this.props.dispatch({ type: "HIDE_ARTICLE" })}
					></Button>
				</Box>
			</Grommet>
		);
	}
}

const mapStateToProps = state => {
	return {
		readArticle: state.readArticle,
		currentUser: state.currentUser
	};
};

export default connect(mapStateToProps)(SpecificArticle);
