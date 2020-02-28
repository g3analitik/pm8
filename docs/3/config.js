
//-----------------
// data
//-----------------

M.config = {

	theme:{

		colors:[
			['purple','crimson','green','#5C3292'],
		],

		hud:[
			['#17323B','#249196','#33E9E0'],
			['#999','#ccc','#ddd'],
		],

	},


	parti:{
		'UMNO':{ alliance:'BN', logo:'UMNO.png' },
		'PKR':{ alliance:'PH', logo:'PKR.png' },
		'PPBM':{ alliance:'', logo:'PPBM.png' },
		'AMANAH':{ alliance:'PH', logo:'AMANAH.png' },
		'PAS':{ alliance:'', logo:'PAS.png' },
		'DAP':{ alliance:'PH', logo:'DAP.png' },
		'BEBAS (EX-PKR)':{ alliance:'', logo:'BEBAS-EX-PKR.png' },
		'BEBAS':{ alliance:'', logo:'BEBAS.png' },
		'MIC':{ alliance:'BN', logo:'MIC.png' },
		'MCA':{ alliance:'BN', logo:'MCA.png' },
		'WARISAN':{ alliance:'', logo:'WARISAN.png' },
		'PBS':{ alliance:'GBS', logo:'PBS.png' },
		'UPKO':{ alliance:'', logo:'UPKO.png' },
		'STAR':{ alliance:'GBS', logo:'STAR.png' },
		'PBRS':{ alliance:'GBS', logo:'PBRS.png' },
		'PBB':{ alliance:'GPS', logo:'PBB.png' },
		'SUPP':{ alliance:'GPS', logo:'SUPP.png' },
		'PSB':{ alliance:'', logo:'PSB.png' },
		'PRS':{ alliance:'', logo:'PRS.png' },
		"PDP":{ alliance:'GPS', logo:'PRS.png' },
	},

	path:{

		refdata	: document.location.host.match(/github|analitik/i)
									? 'https://raw.githubusercontent.com/nyem69/pm8/master/docs/_data'
									: (typeof _v=='number'?'../':'')+'_data',


	}
};


//-----------------------------
//  user timezone
//-----------------------------

try {
  M.config.tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
}catch(error) {
  console.error(error);
}


//-----------------
// M.themeColors
//-----------------

if (!M.current.theme) M.current.theme = 2;
//if (!M.current.theme) M.current.theme = d3.shuffle(M.config.theme.colors)[0];
if (!M.config.theme.colors[+M.current.theme]) M.current.theme = 0;
M.theme={
	colors: M.config.theme.colors[+M.current.theme],
};

M.theme.hud = M.config.theme.hud[0];




//------------------------------------------------------------------
// M.config.data
//------------------------------------------------------------------

M.config.data = {

	ref:[

		{
			key:'mp',
			type:'json',
			url: M.config.path.refdata+'/mp.json',
		},

	],

	cold: [

	],

	hot: [

	],

};

