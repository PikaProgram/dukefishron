/**
 * formatName
 * @param string
 * @returns
 * @description Capitalized The Given String
 */
export function formatName(str: string): string {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
