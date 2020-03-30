import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ARTICLES":
			return {
				...state,
				articleList: action.payload.articleList
			};
		case "SHOW_ARTICLE":
			return {
				...state,
				readArticle: action.payload.readArticle,
				showArticleList: false
			};
		case "HIDE_ARTICLE":
			return {
				...state,
				readArticle: undefined,
				showArticleList: true
			};
		case "AUTHENTICATE":
			return {
				...state,
				...action.payload
			};
		case 'SUBSCRIPTION_FORM':
			return {
				...state,
				...action.payload,
				readArticle: undefined,
				showArticleList: false
			}
		case 'FLASH_MESSAGE':
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}
};
export default rootReducer;
