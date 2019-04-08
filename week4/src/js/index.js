define(['mui',"flex"],function(mui){
	var list=document.querySelector('.list');
	var add=document.querySelector('.add');
	function init(){
		mui.init();
		render();
		eventBind();
	}
	//渲染首页
	function render(){
		mui.ajax('/getIndexData',{
			success:function(rs){
				console.log(rs);
				if(rs.code){
					list.innerHTML=rs.data.map(function(item){
						return `<li>
									<b>${item.name}</b><span>${item.phone}</span>
									<p>${item.address}</p>
									<div class="tip">
										<div class="left">
											<input type="radio" name="" id="" value="" />设为默认
										</div>
										<div class="right">
											
											<button id='confirmBtn' type="button" class="mui-btn mui-btn-blue mui-btn-outlined del" data-id="${item._id}">删除</button>
											<button type="button" class="gai" data-id='${item._id}'>修改</button>
										</div>
									</div>
								</li>`
					}).join('')
				}
			}
		})
	}
	
	
	function eventBind(){
		add.addEventListener('tap',addAddress);//跳转添加页
		mui('.list').on('tap','.del',delData);
		mui('.list').on('tap','.gai',gaiData);
	}
	
	function gaiData(){
		location.href='xiangqing.html?id='+this.getAttribute('data-id');
	}
	function delData(){
		var id=this.getAttribute('data-id');
		var btnArray = ['否', '是'];
		mui.confirm('确认删除吗？', '注意', btnArray, function(e) {
			if (e.index == 1) {
				mui.ajax('/deleteData',{
					data:{
						_id:id
					},
					success:function(rs){
						if(rs.code){
							location.reload()
						}
					}
				})
			}
		})

		
	

		
	}
	function addAddress(){
		location.href='addpage.html'
	}
	init()
})