

//------------------------------------------------------------------
//
//------------------------------------------------------------------
function viz(cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	d3.select('.content')
		.call(sel=>{
			sel.select('.content-summary').call(vizSummary);
			sel.select('.content-main').call(vizStatus);
		});


	fEnd();

}
