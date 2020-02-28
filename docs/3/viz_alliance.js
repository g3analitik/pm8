

//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizAlliance(sel, nest, cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };




	var al = sel.selectAll('.flex-alliance').data(nest, d=>d.key);
	al.exit().remove();
	al.enter()
			.append('div')
				.attr('class','flex-alliance')
				.styles({
					flex:'1 1 auto',
					margin:'12px',
					dispay:'flex',
					'flex-direction':'row',
					'justify-content':'center',
					'align-items':'center',
					background:'#f2f2f2',
					//border:'1px solid #ddd',
				})
				.call(sel=>{

					sel
						.append('div')
							.styles({
								flex:'1 1 auto',
								//'pointer-events':'none',
							})
							.call(sel=>{

								sel.append('div')
									.attr('class','flex-alliance-hdr')
									.styles({


										padding:'12px',
										'text-align':'center',
									})
									.call(sel=>{

										sel.append('div')
											.attr('class','flex-alliance-total')
											.styles({
												background:d=>d.total == 111 ? 'orange' : d.total > 111 ? 'crimson' : '#333',
												color:d=>chroma(d.total == 111 ? 'orange' : d.total > 111 ? 'crimson' : '#333').luminance()>.4 ? '#000' : '#fff',
												'font-size':'32px',
												'font-weight':700,
											})
											.html(d=>d.total);

										sel.append('div')
											.styles({
												background:'#999',
												color:'#fff',
												'font-weight':600,
											})
											.html(d=>d.key);

									});



								sel.append('div')
									.attr('class','flex-alliance-body')
									.styles({
										display:'flex',
										'flex-direction':'row',
										'flex-wrap':'wrap',
										'justify-content':'center',
									});


							});

				})
		.merge(al)
			.call(sel=>{

				sel.select('.flex-alliance-total')
					.styles({
						background:d=>d.total == 111 ? 'orange' : d.total > 111 ? 'crimson' : '#333',
						color:d=>chroma(d.total == 111 ? 'orange' : d.total > 111 ? 'crimson' : '#333').luminance()>.4 ? '#000' : '#fff',
					})
					.html(d=>d.total);

				var p = sel.select('.flex-alliance-body').selectAll('.flex-parti').data(d=>d.values, d=>d.key);
				p.exit().remove();
				p.enter()
						.append('div')
							.attr('class','flex-parti')
							//.attr('draggable',true)
							.styles({
								flex:'0 0 92px',
								margin:'6px',
								width:'92px',
								border:'1px solid #ccc',
								background:'#fff',
								cursor:'move',
							})
							.call(sel=>{

								sel.append('div')
									.styles({
										display:'flex',
										'flex-direction':'row',
										'flex-wrap':'nowrap',
										'pointer-events':'none',
									})
									.call(sel=>{


										sel
											.append('div')
												.styles({
													flex:'0 0 30px',
													'align-items':'center',
													'padding-top':'2px',
													'padding-left':'2px',
												})
												.append('img')
												.attrs({
													src:d=>'//static.analitik.my/parti/pru14/'+M.config.parti[d.key].logo,
													width:'28px',
													height:'24px',
												});

										sel.append('div')
											.attr('class','flex-parti-total')
											.styles({
												flex:'0 0 60px',
												'text-align':'center',
												'font-size':'24px',
												background:'#fff',
												'font-weight':700,
												color:'#333',
												'line-height':'28px',
											})
											.html(d=>d.total);


									});


								sel.append('div')
									.styles({
										display:'flex',
										'flex-direction':'row',
										'flex-wrap':'nowrap',
									})
									.call(sel=>{
										sel.append('div')
											.styles({
												flex:'0 0 90px',
												'text-align':'center',
												'font-size':'10px',
												background:'#ddd',
												color:'#333',
											})
											.html(d=>d.key);
									});


							})
							.call(

									//----------------------------------
									// drag
									//----------------------------------
									d3.drag()
										.on("start", function(d){

											dbg&&console.log('d',d);

										  var div = d3.select(this)
										  						.classed("dragging", true)
										  						.style('cursor','move')
										  						.style('border','1px solid lime');

											d.bb = div.node().getBoundingClientRect();
											dbg&&console.log('d.bb',d.bb);

										  div
										  	.style('display','block')
										  	.style('position','absolute')
										  	.style('left',d.bb.left)
										  	.style('top',d.bb.top)
										  	.style('z-index','999');


											var alliances = d3.selectAll('.flex-alliance');
											alliances.each(function(d){
												d.bb = d3.select(this).node().getBoundingClientRect();
											});

											var container = d3.select('.content-main');

										  d3.event.on("drag", dragged).on("end", ended);

											//----------------------------------
											// drag
											//----------------------------------
										  function dragged(d) {

												var box;
												if (d3.event.sourceEvent.type=='touchmove')	{
											    box = {
											    	x: d.bb.x + d3.event.x - (d.bb.width/2),
											    	y: d.bb.y + d3.event.y - (d.bb.height/2),
											    };
												}else	{
											    box = {
											    	x: d3.event.sourceEvent.clientX - (d.bb.width/2),
											    	y: d3.event.sourceEvent.clientY - (d.bb.height/2),
											    };
											  }

												div
													.style('left', scrollX + box.x +'px' )
													.style('top', scrollY + box.y +'px' )
													;


											  var ctr = {
											  	x:box.x+(d.bb.width/2),
											  	y:box.y+(d.bb.height/2),
											  };

										    d3.select('.debugger')
										    	.styles({
										    		top:scrollY+'px',
										    	})
										    	.html(JSON.stringify([
										    		d3.event.sourceEvent.type,
										    		d3.mouse(this),
											    	[
											    		d3.event.x,
											    		d3.event.y,
										    		],[
										    			ctr.x,
										    			ctr.y
										    		],

										    		alliances.data().filter(d=>ctr.x > d.bb.x && ctr.x < d.bb.x+d.bb.width && ctr.y > d.bb.y && ctr.y < d.bb.y+d.bb.height).length

										    	], null, 2));



												alliances.styles({
														background:d=>ctr.x > d.bb.x && ctr.x < d.bb.x+d.bb.width && ctr.y > d.bb.y && ctr.y < d.bb.y+d.bb.height
																				? 'crimson'
																				: '#f2f2f2'
													});


										  }

											//----------------------------------
											// drag end
											//----------------------------------
										  function ended(d) {

										  	dbg&&console.log('ended',d);

										    div.classed("dragging", false)
										    			.style('cursor','grab');

												var box;
												if (d3.event.sourceEvent.type=='touchmove')	{
											    box = {
											    	x: d.bb.x + d3.event.x - (d.bb.width/2),
											    	y: d.bb.y + d3.event.y - (d.bb.height/2),
											    };
												}else	{
											    box = {
											    	x: d3.event.sourceEvent.clientX - (d.bb.width/2),
											    	y: d3.event.sourceEvent.clientY - (d.bb.height/2),
											    };
											  }



											  var ctr = {
											  	x:box.x+(d.bb.width/2),
											  	y:box.y+(d.bb.height/2),
											  };


												var al = alliances.data().find(d=>ctr.x > d.bb.x && ctr.x < d.bb.x+d.bb.width && ctr.y > d.bb.y && ctr.y < d.bb.y+d.bb.height);


										    d3.select('.debugger')
										    	.styles({
										    		top:scrollY+'px',
										    	})
										    	.html(JSON.stringify(al, null, 2));



												if (al)	{
													d.values.forEach(d=>{
														d.alliance = al.key=='Others' ? '' : al.key;
													});
													analytic({type:'alliance',source:d.values[0].feb2020.parti,target:al.key});
													d3.select('.btn-reset').style('visibility','visible');
												}

												alliances
													.style('background','#f2f2f2');

											  div
											  	.style('display','block')
											  	.style('position',null)
											  	.style('left',null)
											  	.style('top',null)
											  	.style('z-index',null)
											  	.style('border','1px solid #ccc');

												vizStatus_nest();

										  }

										})
								)
						.merge(p)
							.call(sel=>{

								sel.select('.flex-parti-total').html(d=>d.total);

							});

			});



	fEnd();

}


