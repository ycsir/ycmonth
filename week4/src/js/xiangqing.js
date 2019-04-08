define(['mui','flex'],function(mui){
	var done=document.querySelector('.done');
	function init(){
		mui.init();
		getupdata();
		bindEvent();
	}
	
	function getupdata(){
		var parthname=JSON.parse('{"'+location.search.slice(1).replace(/=/g,'":"').replace(/&/g,'","')+'"}');
		mui.ajax('/getupData',{
			data:{
				_id:parthname.id
			},
			success:function(rs){
				console.log(rs)
				if(rs.code){
					var username=document.getElementById('userName');
					var phoneNum=document.getElementById('phoneNum');
					var address=document.getElementById('address');
					username.value=rs.data[0].name;
					phoneNum.value=rs.data[0].phone;
					address.value=rs.data[0].address;		
				}
			}
		})
	}
	
	function bindEvent(){
		done.addEventListener('tap',function(){
			console.log(111)
			var username=document.getElementById('userName').value.trim();
			var phoneNum=document.getElementById('phoneNum').value.trim();
			var address=document.getElementById('address').value.trim();
			var parthname=JSON.parse('{"'+location.search.slice(1).replace(/=/g,'":"').replace(/&/g,'","')+'"}');
			mui.ajax('/upDatas',{
				type:"post",
				data:{
					_id:parthname.id,
					name:username,
					phone:phoneNum,
					address:address
				},
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