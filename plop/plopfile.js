import pageGenerator from "./page-template/prompt.js"

export default function (plop) {
	// page generator
	plop.setGenerator('page module', pageGenerator);
};