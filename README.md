# baseProject
微信小程序基础版本

## 页面说明
1. app.js中获取openId时获取注册信息，若已注册，则自动进入index页面，否则保持在授权页面；
2. allowDetail页面用于所有小程序进入时获取用户信息，同时再次获取注册信息，以防全局的onLunch方法未执行；
3. rank页面包含分页加载以及tab切换，可直接使用。按需设置rank-list的height；
4. mine中获取的用户信息的后端返回，而没用直接使用授权页面获取的微信信息；
5. mySteps页面包含绘图，保存分享图片方法，修改绘图流程在utils中；
