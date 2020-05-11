module.exports = {
	"extends": "standard",
	"rules": {
		"semi": ["error", "always"],
		"key-spacing": ["error", {
			"mode": "minimum"
		}],
		"no-trailing-spaces": ["error", {
			"ignoreComments": true
		}],
		"valid-typeof": [
			"error",
			{
				"requireStringLiterals": false
			}
		],
		"max-len": ["error", { "code": 120, "tabWidth": 2, "ignoreComments": true }],
		"indent": ["error", 2],
		"quotes": ["error", "double"],
		"no-console": "error",
		"global-require": "error",
		"no-duplicate-imports": "error",
		"array-callback-return": "error",
		"object-curly-spacing": "off",
		"camelcase": "error",
		"no-prototype-builtins": "off",
		"no-undef": "off"
	}
};
