@extends('admin.layouts')
@section('content')
		<!--头部 开始-->
<div class="top_box">
	<div class="top_left">
		<div class="logo">微商城后台管理</div>
		<ul>
			<li><a href="{{url('/')}}" target="_blank" class="active">首页</a></li>
			<li><a href="{{url('admin/info')}}" target="main">管理页</a></li>
		</ul>
	</div>
	<div class="top_right">
		<ul>
			<li>管理员：{{$uerNam}}</li>
			<li><a href="{{url('admin/pass')}}" target="main">修改密码</a></li>
			<li><a href="{{url('admin/quit')}}">退出</a></li>
		</ul>
	</div>
</div>
<!--头部 结束-->

<!--左侧导航 开始-->
<div class="menu_box">
	<ul>
		<li>
			<h3><i class="fa fa-fw fa-shopping-cart"></i>宝贝管理</h3>
			<ul class="sub_menu">
				<li><a href="{{url('admin/category')}}" target="main"><i class="fa fa-fw fa-edit"></i>分类</a></li>
				<li><a href="{{url('admin/shop')}}" target="main"><i class="fa fa-fw fa-edit"></i>宝贝</a></li>
			</ul>
		</li>
		<li>
			<h3><i class="fa fa-fw fa-user"></i>用户管理</h3>
			<ul class="sub_menu" style="display: block;">
				<li><a href="{{url('admin/user/index')}}" target="main"><i class="fa fa-fw fa-edit"></i>用户列表</a></li>
				<li><a href="{{url('admin/user/agent')}}" target="main"><i class="fa fa-fw fa-edit"></i>代理申请</a></li>
				<li><a href="{{url('admin/user/cash')}}" target="main"><i class="fa fa-fw fa-edit"></i>提现申请(未完)</a></li>
				<li><a href="{{url('admin/user/income')}}" target="main"><i class="fa fa-fw fa-edit"></i>提成明细</a></li>
				<li><a href="{{url('admin/user/follower/junior')}}" target="main"><i class="fa fa-fw fa-edit"></i>粉丝</a></li>
			</ul>
		</li>

		<li>
			<h3><i class="fa fa-fw fa-credit-card"></i>订单管理</h3>
			<ul class="sub_menu" style="display: block;">
				<li><a href="{{url('admin/order/index')}}" target="main"><i class="fa fa-fw fa-edit"></i>订单列表</a></li>
			</ul>
		</li>

		<li>
			<h3><i class="fa fa-fw fa-cog"></i>杂项</h3>
			<ul class="sub_menu" style="display: block;">
				<li><a href="{{url('admin/other/config')}}" target="main"><i class="fa fa-fw fa-edit"></i>配置</a></li>
				<li><a href="{{url('admin/other/notice')}}" target="main"><i class="fa fa-fw fa-edit"></i>公告</a></li>
				<li><a href="{{url('admin/other/contactus')}}" target="main"><i class="fa fa-fw fa-edit"></i>联系我们</a></li>
				<li><a href="{{url('admin/other/evaluates')}}" target="main"><i class="fa fa-fw fa-edit"></i>点评</a></li>
				<li><a href="{{url('admin/other/showLogistics')}}" target="main"><i class="fa fa-fw fa-edit"></i>物流</a></li>
				<li><a href="{{url('admin/other/showWXSet')}}" target="main"><i class="fa fa-fw fa-edit"></i>微信(未完)</a></li>
			</ul>
		</li>
	</ul>
</div>
<!--左侧导航 结束-->

<!--主体部分 开始-->
<div class="main_box">
	<iframe src="{{url('admin/info')}}" frameborder="0" width="100%" height="100%" name="main"></iframe>
</div>
<!--主体部分 结束-->

<!--底部 开始-->
<div class="bottom_box">
	CopyRight © 2016. Powered By lqf
</div>
<!--底部 结束-->

@endsection


