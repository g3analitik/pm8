

//------------------------------------------------------------------
//
//------------------------------------------------------------------
function layout(cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	d3.select('body')
		.call(layoutBoostrap,fEnd);


}


//------------------------------------------------------------------
//
//------------------------------------------------------------------
function layoutBoostrap(sel, cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };



	sel
		.append('div')
			.attr('class','jumbotron')
			.styles({

				//background:'#000',
				'text-align':'center',
				//'background-image':'url(Flag_of_Malaysia.svg)',
			})
			.call(sel=>{

				sel.append('h1')
					.html('Game of Thrones');

				sel.append('p')
					.attr('class','lead')
					.html('Who will be the next Prime Minister of Malaysia?');

				sel.append('button')
					.attr('class','btn btn-danger btn-reset')
					.style('visibility','hidden')
					//.style('background','crimson')
					.on('click',function(d){
						d3.select(this).style('visibility','hidden');
						M.data.par=[];
						M.data.default.forEach(d=>{
							M.data.par.push({...d});
						});
						vizStatus_nest();
						analytic({type:'reset'});
					})
					.html('Reset');

			});

	sel
		.append('div').attr('class','container-fluid')
			.append('div').attr('class','content')
				.call(sel=>{

					sel.append('div').attr('class','content-main')
						.styles({
							background:'#fff',
							color:'#000',
						});


				});

//
//
//		sel.append('div')
//			.attr('class','debugger')
//			.styles({
//				position:'absolute',
//				'z-index':99999,
//				left:0,
//				top:0,
//				width:innerWidth+'px',
//				height:innerHeight+'px',
//				'pointer-events':'none',
//			})
//			.html('DEBUG');


	fEnd();

}



