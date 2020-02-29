
//------------------------------------------------------------------
//
//------------------------------------------------------------------
function load(cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };

	M.ft = Cookies.get('_ft');
	if (!M.ft) {
		M.ft=+moment();
		Cookies.set('_ft',M.ft);
	}

	var reqs = [
		d3.json(M.config.data.ref.find(d=>d.key=='mp').url),
	];

	Promise.all(reqs).then(function(raw){

		M.data.par = raw[0];
		M.data.default=[];
		M.data.par.forEach(d=>{
			d.parid = +d.parid;
			d.alliance = M.config.parti[d.feb2020.parti].alliance;
			M.data.default.push({...d});
		});


		fEnd();
	});


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

