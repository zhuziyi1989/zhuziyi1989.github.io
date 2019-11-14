window.Qrcode = {}
var url = encodeURIComponent(window.location.href)
	base_url='https://api.qrserver.com/v1/create-qr-code/?bgcolor=fff&color=000&size=198x198&margin=20&data='
	a=document
	b=''
	h=a.documentElement.clientHeight
	
	b = a.createElement('div'), b.id = 'qrcode-cover', b.setAttribute('style', 'box-sizing: initial;width: 100%;height: '+h+'px;background: #000;opacity: 0.2;position:fixed;top:0;left:0;z-index:99999'), a.body.appendChild(b)
	c = a.createElement('div'), c.id = 'qrcode-box', c.setAttribute('style', 'box-sizing: initial;font-size:12px;width: 200px;height: 290px;border-radius: 4px;-webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);box-shadow: 0 15px 30px rgba(0,0,0,0.1);background: #fff;position: fixed;top:20px;left:50%;margin-left:-100px;z-index: 100000;'), a.body.appendChild(c)
	qrcode_box=a.getElementById('qrcode-box')
	qrcode_cover=a.getElementById('qrcode-cover')
	js=a.getElementById('qrcode')
	qrcode_box.innerHTML='<img src="'+base_url+url+'" style="width:200px;height:200px;background:url(https://raw.githubusercontent.com/zhuziyi1989/zhuziyi1989.github.io/master/tool/img/qcode-loading.svg) no-repeat center center"><p style="text-align:center;color:#999;padding-bottom:20px;margin:0;">使用微信扫一扫</p><div id="btn" style="text-align:center;width:160px;height:30px;background:#ddd;line-height:30px;margin:0 auto;border-radius:4px;color:#666;cursor:pointer;" onclick="close()">关闭</div>'
	var btn=document.getElementById('btn');
	btn.onclick=function(){
		a.body.removeChild(qrcode_box)
		a.body.removeChild(qrcode_cover)
		a.body.removeChild(js)
		delete window.Qrcode
	}

