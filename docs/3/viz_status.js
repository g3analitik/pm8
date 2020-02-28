

//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizStatus(sel, cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };




	sel.append('div')
		.call(sel=>{

			sel
				.append('p')
					.styles({
						'font-weight':300,
						'font-size':'16px',
						'white-space':'nowrap',
						overflow:'hidden',
						'text-align':'center',
					})
					.html("Drag the political parties to the alliance you think they'd join");


			sel
				.append('div')
					.attr('class','g-alliance')
					.styles({
						display:'flex',
						'flex-direction':'row',
//						'flex-wrap':'wrap',
						'justify-content':'center',
						'align-items':'flex-start',

					})


			sel
				.append('p')
					.styles({
						'margin-top':'40px',
						'font-weight':300,
						'font-size':'16px',
						'white-space':'nowrap',
						overflow:'hidden',
						'text-align':'center',
					})
					.html('Move the MPs that are likely to switch parties');

			sel
				.append('div')
//					.styles({
//						//width:d3.nest().key(d=>d.feb2020.parti).entries(M.data.par).length * 100,
//						width:innerWidth+'px',
//						overflow:'scroll',
//					})
//				.append('div')
					.attr('class','g-mp')
					.styles({
						display:'flex',
						'flex-direction':'row',
						//'flex-wrap':'wrap',
						'justify-content':'center',
						'align-items':'flex-start',
					})

		});


	vizStatus_nest(fEnd);

}





//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizStatus_nest(cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	var nest = d3.nest()
							.key(d=>d.alliance==''?'Others':d.alliance)
							.key(d=>d.feb2020.parti)
							.entries(M.data.par)
							.sort(d3.comparator().order(d3.descending, d=>d.key));

	nest.forEach(k=>{
		k.values.forEach(d=>{
			d.total = d.values.length;
		});
		k.values.sort(d3.comparator()
			.order(d3.descending,d=>d.total)
			.order(d3.ascending,d=>d.key)
		);
		k.total = d3.sum(k.values, d=>d.total);
	});


	dbg&&console.log('nest', nest);
//	dbg&&console.log('nest', nest.map(d=>d.key+' ('+d.values.length+')'));
//	dbg&&console.log('nest', JSON.stringify(nest.map(d=>{ var k={};k[d.key]={}; return k; }),null,2));


	d3.select('.g-alliance').call(vizAlliance, nest);
	d3.select('.g-mp').call(vizMP, nest);

	fEnd();

}









