// Only load these if compiled source is not already cached
let babel;
let transformJsx;

const transform = async (source, filename) => {
	if (!babel) {
		babel = await import('@babel/core');
		transformJsx = await import('@babel/plugin-transform-react-jsx');
	}

	const result = await babel.transformAsync(source, {
		plugins: [
	    [
	      transformJsx.default,
	      {
	        pragma: process.env.PRAGMA || 'h',
	        pragmaFrag: process.env.PRAGMA_FRAG || 'Fragment',
	      }
	    ]
	  ],
		filename,
		sourceMaps: 'inline',
		babelrc: false,
		configFile: false
	});

	return result.code;
};

export default transform;
