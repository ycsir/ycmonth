define(['mui',"flex"],function(mui){
	var done=document.querySelector('.done');
	function init(){
		mui.init();
		eventBind();
	}
	//渲染首页
	function eventBind(){
		done.addEventListener('tap',function(){ 
			var username=document.getElementById('userName').value.trim();
			var phoneNum=document.getElementById('phoneNum').value.trim();
			var address=document.getElementById('address').value.trim();
			mui.ajax('/getAddData',{
				data:{
					name:username,
					phone:phoneNum,
					address:address
				},
				type:"post",
				success:function(rs){
					console.log(rs);
					if(rs.code){
						location.href='index.html'
					}
				}
			})
		})
	}
	init()
})