
//------------------------------------------------------------------
//
//------------------------------------------------------------------
function load(cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	var reqs = [
		d3.json(M.config.data.ref.find(d=>d.key=='mp').url),
	];

	Promise.all(reqs).then(function(raw){

		M.data.par = raw[0];
		M.data.default=[];
		M.data.par.forEach(d=>{
			d.p = +d.p;
			d.alliance = M.config.parti[d.feb2020.parti].alliance;
			M.data.default.push({...d});
		});


		fEnd();
	});

	getFingerprint();

}

//------------------------------------------------------------------
//
//------------------------------------------------------------------
function analytic(res)	{
	//console.log('res',res);
	if (M.timer.analytic) window.clearTimeout(M.timer.analytic);
	M.timer.analytic = window.setTimeout(function(){
		res.device = M.ft;
		var postdata = res;
		var url=['','',document.location.host.split('.').reverse().slice(0,2).concat(['api']).reverse().join('.'),'analytic','pm8'].join('/');
		var qstr=[];
		for (var i in res)	{
			qstr.push(i+'='+res[i]);
		}
		d3.json(url+'?'+qstr.join('&'))
	  .then(raw=>{});
	 },200);
}


//------------------------------------------------------------------
//
//------------------------------------------------------------------
function getFingerprint(cb)	{

	M.ft = Cookies.get('_ft');
	if (M.ft)	{
		var ft = M.ft.split('-');
		var ft2 = (+ft[1]||0)+1;
		M.ft=[ft[0], ft2].join('-');
		Cookies.set('_ft',M.ft);
	}else if (window['Fingerprint2'] && typeof window['Fingerprint2']=='function') {
		if (window.requestIdleCallback) {
			requestIdleCallback(function () {
				Fingerprint2.get(getMurmur);
			});
		} else {
			setTimeout(function () {
				Fingerprint2.get(getMurmur)
			}, 500);
		}
	}else	{
		M.ft=[+moment(),0].join('-');
		Cookies.set('_ft',M.ft);
	}




	//------------------------------------------------------------------
	//
	//------------------------------------------------------------------
	function getMurmur(components)	{
		var values = components.map(function (component) { return component.value });
		M.ft = [Fingerprint2.x64hash128(values.join(''), 31), 0].join('-');
		Cookies.set('_ft',M.ft);
	}

}
