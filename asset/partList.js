const DEFAULT_PART_LIST = [
  { partName: "宝鸡市渭滨区经二路街道办事处新民路社区居民委员会", partCode: 1 },
  { partName: "宝应县立责社工服务社", partCode: 2 },
  { partName: "北京睦友社会工作发展中心", partCode: 3 },
  { partName: "北京市房山区睿诚社会工作事务所", partCode: 4 },
  { partName: "滨州市众智社会工作服中心", partCode: 5 },
  { partName: "常州公益助学联合会", partCode: 6 },
  { partName: "成都高新区爱有戏社会工作服务中心", partCode: 7 },
  { partName: "成都市金牛区", partCode: 8 },
  { partName: "成都市金堂心翼社工站", partCode: 9 },
  { partName: "成都市锦江区爱有戏社区文化发展中心", partCode: 10 },
  { partName: "成都市龙泉驿区小桔灯社会工作服务中心", partCode: 11 },
  { partName: "成都市龙泉驿区智信社会工作服务中心", partCode: 12 },
  { partName: "成都市武侯区你我他社区治理行动与研究中心", partCode: 13 },
  { partName: "成都市武侯区心航社会工作服务中心", partCode: 14 },
  { partName: "成都天府新区公艺派社会工作服务中心", partCode: 15 },
  { partName: "赤峰爱氧星志愿服务发展协会", partCode: 16 },
  { partName: "重庆市九龙坡区黄桷树青年社工发展协会", partCode: 17 },
  { partName: "重庆市九龙坡区家和社会工作服务中心", partCode: 18 },
  { partName: "重庆市南岸区南坪街道珊瑚村社区公益站", partCode: 19 },
  { partName: "重庆市南岸区珊瑚村社区居委会", partCode: 20 },
  { partName: "重庆市荣昌区棠城爱心志愿者协会", partCode: 21 },
  { partName: "重庆市万州明爱社会工作服务中心", partCode: 22 },
  { partName: "达州市万家和社会工作服务中心", partCode: 23 },
  { partName: "达州市众爱社会工作服务中心", partCode: 24 },
  { partName: "大连长利区义仓", partCode: 25 },
  { partName: "单县义工联合会", partCode: 26 },
  { partName: "德清县四叶草亲子成在服务中心", partCode: 27 },
  { partName: "东营市东营区齐家社会工作服务中心", partCode: 28 },
  { partName: "东营市垦利区益道社会服务发展中心", partCode: 29 },
  { partName: "东营市幸福里社会工作服务中心", partCode: 30 },
  { partName: "恩平市崇德社会工作综合服务中心", partCode: 31 },
  { partName: "沣东新城民政局", partCode: 32 },
  { partName: "沣东新城益生活社区发展中心", partCode: 33 },
  { partName: "佛山市顺德区乐从镇瑞航社会工作服务与研究中心", partCode: 34 },
  { partName: "福建省正能量公益服务中心", partCode: 35 },
  { partName: "广西和乐社会工作服务中心", partCode: 36 },
  { partName: "广州恒爱", partCode: 37 },
  { partName: "广州市乐翔社会工作服务社", partCode: 38 },
  { partName: "广州市协和社会工作服务中心", partCode: 39 },
  { partName: "海南青年星公益服务中心", partCode: 40 },
  { partName: "海南省嘉树社会工作服务中心", partCode: 41 },
  { partName: "海盐县民联社工服务中心", partCode: 42 },
  { partName: "杭州市上城区亲民社会工作服务中心", partCode: 43 },
  { partName: "合肥市包河区美好志愿服务中心", partCode: 44 },
  { partName: "黑龙江省希望社会工作服务中心", partCode: 45 },
  { partName: "湖北美好公益基金会", partCode: 46 },
  { partName: "惠州市爱之声社会工作发展中心", partCode: 47 },
  { partName: "惠州市西湖公益服务发展中心", partCode: 48 },
  { partName: "惠州仲恺高新区恺悦社会工作服务中心", partCode: 49 },
  { partName: "吉安青原色公益发展中心", partCode: 50 },
  { partName: "济南市基爱社会工作服务中心", partCode: 51 },
  { partName: "济南市历下区善治公益发展中心", partCode: 52 },
  { partName: "济南市中群益社会组织服务孵化中心", partCode: 53 },
  { partName: "江门彩虹社工", partCode: 54 },
  { partName: "江门市江海区乐翔社会工作服务社", partCode: 55 },
  { partName: "江门市蓬江区荷塘镇稻草人社会工作中心", partCode: 56 },
  { partName: "江门市蓬江区恒爱社会工作综合服务中心", partCode: 57 },
  { partName: "江门市新会区乐善汇社会工作服务中心", partCode: 58 },
  { partName: "金华麦地社会工作服务中心", partCode: 59 },
  { partName: "开平市泽城社会工作服务中心", partCode: 60 },
  { partName: "昆明市五华区明心社会工作服务中心", partCode: 61 },
  { partName: "昆明市西山区泽曦社会工作服务中心", partCode: 62 },
  { partName: "莲新邻里互助中心", partCode: 63 },
  { partName: "临夏州义仓慈善公益服务中心", partCode: 64 },
  { partName: "柳州市春晖社会工作服务中心", partCode: 65 },
  { partName: "娄底市民生社会工作发展中心", partCode: 66 },
  { partName: "泸州市江阳区恒德社会工作服务中心", partCode: 67 },
  { partName: "罗湖区社工委", partCode: 68 },
  { partName: "洛阳市欣和社会工作服务中心", partCode: 69 },
  { partName: "眉山市彭山区友仁社会公益发展中心", partCode: 70 },
  { partName: "绵阳春天社会工作服务中心", partCode: 71 },
  { partName: "绵阳市涪城区助民社会工作服务中心", partCode: 72 },
  { partName: "南昌国仁公益服务中心", partCode: 73 },
  { partName: "南昌金葵花社会工作服务中心", partCode: 74 },
  { partName: "南充市顺庆区简安社会工作服务中心", partCode: 75 },
  { partName: "南充阳光家园社区服务中心", partCode: 76 },
  { partName: "南京江宁星火社工事务所", partCode: 77 },
  { partName: "南京市栖霞区姚坊门启蒙社区发展中心", partCode: 78 },
  { partName: "南京市秦淮区双塘街道弓箭坊社区", partCode: 79 },
  { partName: "南京市雨花台区爱之光公益发展中心", partCode: 80 },
  { partName: "南阳市至善社工服务中心", partCode: 81 },
  { partName: "宁德市初心益宁社会工作发展中心", partCode: 82 },
  { partName: "宁德市益本社会工作服务中心", partCode: 83 },
  { partName: "宁夏青年社会创新发展中心", partCode: 84 },
  { partName: "平湖市社会组织培育发展中心", partCode: 85 },
  { partName: "濮阳市心灵家园社工服务中心", partCode: 86 },
  { partName: "青白江义工联合会", partCode: 87 },
  { partName: "青岛12349社区便民服务中心", partCode: 88 },
  { partName: "青岛李沧区快乐沙爱心帮扶中心", partCode: 89 },
  { partName: "青岛你我创益社会工作服务中心", partCode: 90 },
  { partName: "青海爱知扬社会工作服务中心", partCode: 91 },
  { partName: "青海省泽德社会工作发展中心", partCode: 92 },
  { partName: "青海心之助志愿者服务中心", partCode: 93 },
  { partName: "山东省淄博束氏庄园公益中心", partCode: 94 },
  { partName: "陕西宝鸡慧芳公益发展中心", partCode: 95 },
  { partName: "陕西晨星社工服务中心", partCode: 96 },
  { partName: "陕西大荔丰图义仓粮食储备库", partCode: 97 },
  { partName: "陕西普辉青年社会发展中心", partCode: 98 },
  { partName: "陕西万家社区发展促进中心", partCode: 99 },
  { partName: "陕西益路人公益服务中心", partCode: 100 },
  { partName: "陕西致道公益服务中心", partCode: 101 },
  { partName: "陕西众益社会组织服务中心", partCode: 102 },
  { partName: "商洛市巾帼志愿者协会", partCode: 103 },
  { partName: "上海百益社区服务中心", partCode: 104 },
  { partName: "上海静安区知行社区营造服务中心", partCode: 105 },
  { partName: "上海闵行区利群社会工作事务所", partCode: 106 },
  { partName: "上海闵行莘庄工业区景云社会工作服务中心", partCode: 107 },
  { partName: "上海浦东新区沁远社区公益服务中心", partCode: 108 },
  { partName: "上海浦东新区知行一心理咨询服务中心", partCode: 109 },
  { partName: "上海市静安区彭浦广盛苑居民委员会", partCode: 110 },
  { partName: "上海市闵行区浦江镇浦润苑居民委员会", partCode: 111 },
  { partName: "上海市闵行区颛桥镇日月华城居民委员会", partCode: 112 },
  { partName: "上海新途社区健康促进社", partCode: 113 },
  { partName: "绍兴市欢乐慈爱义工团", partCode: 114 },
  { partName: "绍兴市欢乐慈爱义工团", partCode: 115 },
  { partName: "深圳罗湖区和粤公益发展中心", partCode: 116 },
  { partName: "深圳市龙华新区大浪安全梦志愿者协会", partCode: 117 },
  { partName: "深圳市南山区绿野社工服务中心", partCode: 118 },
  { partName: "沈阳市青春志愿者协会", partCode: 119 },
  { partName: "石家庄暖晴文化传播有限公司", partCode: 120 },
  { partName: "水井坊邻里互助中心", partCode: 121 },
  { partName: "四会市民情志愿者协会", partCode: 122 },
  { partName: "苏州市相成区爱众社会工作发展中心", partCode: 123 },
  { partName: "遂宁春晖社会工作发展中心", partCode: 124 },
  { partName: "遂宁怡然志愿者协会", partCode: 125 },
  { partName: "台山市挚爱社工服务中心", partCode: 126 },
  { partName: "太仓市益善社工服务研究中心", partCode: 127 },
  { partName: "天津市西青区宁德社区建设促进中心", partCode: 128 },
  { partName: "天津市易欣向上社会工作服务中心", partCode: 129 },
  { partName: "温州爱心屋网络公益宣传服务中心", partCode: 130 },
  { partName: "文山州第八天青少年事务社会服务中心", partCode: 131 },
  { partName: "武汉美好社区志愿者服务中心", partCode: 132 },
  { partName: "武汉市汉阳美好志愿服务中心", partCode: 133 },
  { partName: "武汉市武昌区美好社区志愿者服务中心", partCode: 134 },
  { partName: "武汉市武昌区融智家庭社区指导中心", partCode: 135 },
  { partName: "武汉市武昌区物回宝循环经济公益促进中心", partCode: 136 },
  { partName: "武汉阳光社会工作服务中心", partCode: 137 },
  { partName: "西安美好社会工作服中心", partCode: 138 },
  { partName: "西安市莲湖区益心社区服务中心", partCode: 139 },
  { partName: "西安挚爱家庭服务中心", partCode: 140 },
  { partName: "下陆区与爱同行义工协会", partCode: 141 },
  { partName: "仙桃市义工联合会", partCode: 142 },
  { partName: "雅安市雨城区敏睿博爱公益服务中心", partCode: 143 },
  { partName: "雅安同耕社区发展中心", partCode: 144 },
  { partName: "烟台市芝罘区领飞蓝天志愿服务中心", partCode: 145 },
  { partName: "扬州市江都乐善志愿者协会", partCode: 146 },
  { partName: "阳江市阳东区北贯镇志愿者协会", partCode: 147 },
  { partName: "伊金霍洛旗哈木图社区服务社", partCode: 148 },
  { partName: "义乌市同悦社会工作服务中心", partCode: 149 },
  { partName: "永州市冷水滩区永爱志愿者协会", partCode: 150 },
  { partName: "云南连心社区照顾服务中心", partCode: 151 },
  { partName: "长沙市芙蓉区义仓公益发展中心", partCode: 152 },
  { partName: "长沙市培源社会工作服务中心", partCode: 153 },
  { partName: "郑州市和勤青年志愿互助中心", partCode: 154 },
  { partName: "郑州市金水区恩夕社会工作服务中心", partCode: 155 },
  { partName: "郑州市金水区同行社会工作服务中心", partCode: 156 },
  { partName: "郑州市中原区德佑社会工作服务中心", partCode: 157 },
  { partName: "钟祥市石牌镇石牌社区居民委员会", partCode: 158 },
  { partName: "株洲市大同社会工作服务中心", partCode: 159 },
  { partName: "珠海恩派非营利组织发展中心", partCode: 160 },
  { partName: "珠海市金湾区恒爱社会工作综合服务中心", partCode: 161 },
  { partName: "珠海市金湾区家乐社会工作服务中心", partCode: 162 },
  { partName: "珠海市青少年综合服务中心", partCode: 163 },
  { partName: "珠海市香洲区梅华街道南村社区居委会", partCode: 164 },
  { partName: "诸暨市彩虹之家居家养老服务中心", partCode: 165 },
  { partName: "驻马店市启航社会工作服务中心", partCode: 166 },
  { partName: "资阳社会工作协会/资阳市心公益社会工作服务中心", partCode: 167 },
  { partName: "自贡市灵犀社会工作服务中心", partCode: 168 },
  { partName: "金都社区", partCode: 170 },
  { partName: "左邻右舍社区治理创新园", partCode: 171 },
  { partName: "比邻驿家", partCode: 172 },
  { partName: "南星邻里中心", partCode: 173 },
  { partName: "红巷生活馆", partCode: 174 },
  { partName: "管墅社区", partCode: 175 },
  { partName: "大渡党群服务中心", partCode: 176 },
  { partName: "马桥社区", partCode: 177 },
  { partName: "湖滨社区", partCode: 178 },
  { partName: "温州爱心屋网络公益宣传服务中心", partCode: 179 },
  { partName: "诸暨市吾欣社会工作服务中心", partCode: 180 },
  { partName: "海盐县民联社工服务中心", partCode: 181 },
  ]

let PART_LIST = DEFAULT_PART_LIST.sort((a, b) => a.partName.localeCompare(b.partName))
PART_LIST.push({ partName: "其他", partCode: 169 })
module.exports = {
  PART_LIST
}