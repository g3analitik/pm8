

//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizMP(sel, nest, cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	var al = sel.selectAll('.mp-alliance').data(nest, d=>d.key);
	al.exit().remove();
	al.enter()
			.append('div')
				.attr('class','mp-alliance')
				.styles({
					flex:'1 0 70px',
					display:'flex',
					'flex-direction':'row',
					//'flex-direction':d=>d.values.length < 10 ? 'column':'row',
					//'flex-wrap':'wrap',
					//border:'1px solid red',
				})
				.call(sel=>{

					sel.append('div')
						.styles({
							flex:'1 1 70px',
							'fglex-direction':'columns',
						})
						.call(sel=>{

//							sel.append('div')
//								.attr('class','mp-alliance-hdr')
//								.styles({
//									flex:'1 1 auto',
//									display:'flex',
//									'flex-direction':'row',
//									background:'#aaa',
//									color:'#fff',
//									margin:'3px',
//									height:'40px',
//									'vertical-align':'middle',
//									'align-items':'center',
//									'text-align':'center',
//								})
//								.call(sel=>{
//
//									sel.append('div')
//										.style('flex','1 1 auto')
//										.style('font-weight',800)
//										.html(d=>d.key);
//
//								});

							sel.append('div')
								.attr('class','mp-alliance-body')
								.styles({
									flex:'1 1 auto',
									display:'flex',
									'flex-direction':'row',
									'flex-wrap':'wrap',
									//border:'1px solid blue',
								});

						});



				})
			.merge(al)
				.call(sel=>{


					var p = sel.select('.mp-alliance-body').selectAll('.mp-parti').data(d=>d.values, d=>d.key);
					p.exit().remove();
					p.enter()
						.append('div')
							.attr('class','mp-parti')
							.styles({
								flex:'1 0 80px',
//								display:'flex',
//								'flex-direction':'column',
								background:'#f2f2f2',
								margin:'3px',
								'border-radius':'6px',
							})
							.call(sel=>{




								sel.append('div')
									.attr('class','mp-parti-hdr')
									.styles({
										flex:'1 1 auto',
										display:'flex',
										'flex-direction':'row',
										//border:'1px solid #ddd',
										height:'40px',
										'vertical-align':'middle',
										'align-items':'center',
									})
									.call(sel=>{


										sel.append('div')
											.styles({
												flex:'1 1 auto',
												'font-weight':700,
												'padding-left':'3px',
											})
											.html(d=>d.key);


										sel.append('div')
											.styles({
												flex:'0 0 34px',
												'margin-left':'2px',
											})
											.append('img')
												.attrs({
													src:d=>M.config.parti[d.key] ? '//static.analitik.my/parti/pru14/'+M.config.parti[d.key].logo : null,
												})
												.styles({
													'max-width':'30px',
													'max-height':'28px',
												});

									});



								sel.append('div')
									.attr('class','mp-parti-body')
									.styles({
										display:'flex',
										'flex-direction':'column',
										//'flex-wrap':'wrap',
										//border:'1px solid magenta',
										'padding-top':'12px',
										'padding-bottom':'12px',
									});




							})
						.merge(p)
							.call(sel=>{

								var mp = sel.select('.mp-parti-body').selectAll('.mp').data(d=>d.values, d=>d.parid);
								mp.exit().remove();
								mp.enter()
									.append('div')
										.attr('class','mp')
										.call(vizMP_card)
									.merge(mp)
										.call(vizMP_cardUpdate);

							});

				});



	fEnd();

}





//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizMP_card(sel, cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


	sel
		.styles({
			flex:'1 1 40px',
			//width:'100px',
			margin:'3px',
			background:'#f2f2f2',
			//height:'60px',
			//'max-height':'60px',
			overflow:'hidden',
			//border:'1px solid #ddd',
		})
		.on('click',d=>{
			console.log('d',d);
		})
		.append('div')
			.styles({
				display:'flex',
				'flex-direction':'row',
				background:'#fff',
			})
			.call(vizMP_cardPhoto)
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
						  						.style('border','1px solid crimson');

							d.bb = div.node().getBoundingClientRect();
							dbg&&console.log('d.bb',d.bb);

						  div
						  	.style('display','block')
						  	.style('position','absolute')
						  	.style('left',d.bb.left)
						  	.style('top',d.bb.top)
						  	.style('z-index','999');


							var alliances = d3.selectAll('.mp-parti');
							alliances.each(function(d){
								d.bb = d3.select(this).node().getBoundingClientRect();
							});


							var box;
							var ctr;
							var al;



						  d3.event.on("drag", dragged).on("end", ended);

							//----------------------------------
							// drag
							//----------------------------------
						  function dragged(d) {

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

							  ctr = {
							  	x:box.x+(d.bb.width/2),
							  	y:box.y+(d.bb.height/2),
							  };

							  al = alliances.data().filter(d=>ctr.x > d.bb.x && ctr.x < d.bb.x+d.bb.width && ctr.y > d.bb.y && ctr.y < d.bb.y+d.bb.height);


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

						    div.classed("dragging", false)
						    			.style('cursor','grab');

								if (al)	{
									d.feb2020.parti = al[0].key;
									d.alliance = al[0].values[0].alliance;
									analytic({type:'mp',source:d.parid,target:al[0].key});
									d3.select('.btn-reset').style('visibility','visible');
								}

								alliances
									.style('background','#f2f2f2');

							  div
							  	.style('display','inline')
							  	.style('position',null)
							  	.style('left',null)
							  	.style('top',null)
							  	.style('z-index',null)
							  	.style('border','1px solid #ccc');

								vizStatus_nest();

						  }

						})
				);


	fEnd();


}




//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizMP_cardPhoto(sel, cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };





				sel.append('div')
					.attr('class','card-photo')
					.styles({
						flex:'0 0 30px',
						//display:'inline-block',
//						'background-image': "url('mp6660.png')",
//						'background-repeat': "no-repeat",
//						'width':'30px',
//						'height': '40px',
//						'background-position':d=>((d.parid-1)*-30)+'px 0px',
					})
//					.append('img')
//						.attr('src', d=>'//static.aga.my/profile/'+d.photo)
//						.styles({
//							'max-width':'30px',
//							'max-height':'40px',
//						});

					.append('svg')
						.attrs({
							viewBox:'0 0 30 40',
						})
						.styles({
							'max-width':'30px',
							'max-height':'40px',
						})
						.call(sel=>{


							sel
								.append('image')
									.attrs({
										'xlink:href':d=>'//static.analitik.my/profile/'+atob(d.photo),
										width:30,
										height:40,
									});

						})

				sel.append('div')
					.attr('class','card-labels')
					.call(sel=>{

							sel.append('div')
								.style('font-weight',400)
								.html(d=>'P'+d.parid+' '+d.parlimen);

							sel.append('div')
								.style('font-size','9px')
								.html(d=>d.nama.toUpperCase());

					});


	fEnd();


}



//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizMP_cardUpdate(sel, cb)	{

	sel.select('.card-photo')
		.styles({
			flex:'0 0 30px',
		});

	sel.select('.card-labels')
		.styles({
			'flex':'1 1 auto',
			'font-size':'10px',
			'font-weight':300,
			margin:'3px',
			'max-height':'100px',
			overflow:'hidden',
			'line-height':'10px',
			background:'#fff',
		});

}

//------------------------------------------------------------------
//
//------------------------------------------------------------------
function vizMP_cardPhoto2(sel, cb)	{

	var f = '['+(fc++)+'] '+arguments.callee.toString().replace(/function\s+/,'').split('(')[0],
	dbg=0, fEnd=function(){ dbg&&console.timeEnd(f); console.groupEnd(f); if (typeof cb=='function') cb() };
	if (dbg){ console.group(f); console.time(f) };


				sel.append('div')
					.styles({
						flex:'0 0 30px',
						//display:'inline-block',
//						'background-image': "url('mp6660.png')",
//						'background-repeat': "no-repeat",
//						'width':'30px',
//						'height': '40px',
//						'background-position':d=>((d.parid-1)*-30)+'px 0px',
					})
//					.append('img')
//						.attr('src', d=>'//static.aga.my/profile/'+d.photo)
//						.styles({
//							'max-width':'30px',
//							'max-height':'40px',
//						});

					.append('svg')
						.attrs({
							viewBox:'0 0 30 40',
						})
						.styles({
							'max-width':'30px',
							'max-height':'40px',
						})
						.call(sel=>{



							sel
								.append('a')
									.attrs({
										href:d=>'//app.aga.my/photos/?ic='+b62.decode(d.qid),
										target:'_blank',
									})
								.append('image')
									.attrs({
										'xlink:href':d=>'//static.aga.my/profile/'+d.photo,
										width:30,
										height:40,
									});

						})

				sel.append('div')
					.styles({
//						display:'inline-block',
//						width:'70px',

						'flex':'1 1 auto',
						'font-size':'10px',
						'font-weight':300,
						margin:'3px',
						'max-height':'100px',
						overflow:'hidden',
						'line-height':'10px',
						background:'#fff',
					})
					.call(sel=>{

							sel.append('div')
								.style('font-weight',400)
								.html(d=>'P'+d.parid+' '+d.nama_kawasan);

							sel.append('div')
								.style('font-size','9px')
								.html(d=>d.nama.toUpperCase());

					});


	fEnd();


}


