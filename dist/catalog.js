// X EIGHT concept products. Prices and specifications are sample storefront content.
const baseProducts=[
 {id:'ultra',name:'X Ultra',price:24999,type:'performance',tag:'THE FLAGSHIP',subtitle:'FOR THE UNCHARTED',description:'Beyond the edge of your comfort zone.',detail:'The adventure companion. A titanium case, sapphire crystal, dual-band GPS and the power to keep exploring.',case:'49 mm titanium',display:'1.92″ AMOLED',brightness:'3,000 nits',battery:'Up to 72 hours',water:'100 m',gps:'Dual-band GPS',weight:'61 g',defaultColor:'graphite',madeFor:'Outdoor adventure',tone:'ultra'},
 {id:'pro',name:'X Pro',price:17999,type:'performance',tag:'THE EVERYDAY ATHLETE',subtitle:'FOR YOUR NEXT PERSONAL BEST',description:'Your ambition. Beautifully equipped.',detail:'An expansive AMOLED display, activity insights and built-in GPS in a lighter aluminium case.',case:'45 mm aluminium',display:'1.78″ AMOLED',brightness:'2,000 nits',battery:'Up to 48 hours',water:'50 m',gps:'Built-in GPS',weight:'42 g',defaultColor:'titanium',madeFor:'Training and everyday',tone:'pro'},
 {id:'core',name:'X Core',price:9999,type:'everyday',tag:'THE ESSENTIAL',subtitle:'FOR EVERY VERSION OF YOU',description:'Everything you need. Nothing in the way.',detail:'Daily activity, sleep insights, notifications and a bright display in our most compact watch.',case:'41 mm aluminium',display:'1.65″ AMOLED',brightness:'1,000 nits',battery:'Up to 36 hours',water:'50 m',gps:'Connected GPS',weight:'32 g',defaultColor:'graphite',madeFor:'Daily essentials',tone:'core'},
 {id:'active',name:'X Active',price:14999,type:'performance',tag:'MADE TO MOVE',subtitle:'FOR THE NEXT MILE',description:'Stay ready for every session.',detail:'Built for training days with a bright display, built-in GPS and a lightweight case that keeps up.',case:'44 mm aluminium',display:'1.75″ AMOLED',brightness:'1,800 nits',battery:'Up to 50 hours',water:'50 m',gps:'Built-in GPS',weight:'39 g',defaultColor:'orange',madeFor:'Fitness and training',tone:'active'},
 {id:'air',name:'X Air',price:12999,type:'everyday',tag:'LIGHT BY DESIGN',subtitle:'FOR THE EVERYDAY FLOW',description:'A lighter way to stay connected.',detail:'A slim profile, glanceable notifications and daily wellbeing insights for the rhythm of every day.',case:'40 mm aluminium',display:'1.68″ AMOLED',brightness:'1,400 nits',battery:'Up to 40 hours',water:'50 m',gps:'Connected GPS',weight:'29 g',defaultColor:'titanium',madeFor:'Comfort and connection',tone:'air'},
 {id:'mini',name:'X Mini',price:7999,type:'everyday',tag:'SMALL FORM. BIG DAY.',subtitle:'FOR A SIMPLE START',description:'All the essentials, beautifully sized.',detail:'A compact display with notifications, activity and sleep tracking, created for smaller wrists.',case:'38 mm aluminium',display:'1.48″ AMOLED',brightness:'900 nits',battery:'Up to 30 hours',water:'30 m',gps:'Connected GPS',weight:'27 g',defaultColor:'graphite',madeFor:'Compact everyday wear',tone:'mini'}
];
export const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
export const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
export const finishes={graphite:'Graphite',titanium:'Natural titanium',orange:'Expedition orange'};
export const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export const CATALOG_KEY='xeight-admin-catalog-v1';
const cleanText=(value,max=180)=>String(value??'').replace(/[<>&"'\u0000-\u001f]/g,'').trim().slice(0,max);
export function normalizeProduct(value){
 if(!value||typeof value!=='object')return null;
 const id=String(value.id??'').toLowerCase().trim();
 if(!/^[a-z0-9-]{2,40}$/.test(id))return null;
 const existing=baseProducts.find(p=>p.id===id),fallback=existing??baseProducts[1];
 const field=(key,max=180)=>cleanText(value[key]??fallback[key],max);
 const price=Number(value.price),stock=Number(value.stock??20);
 if(!Number.isInteger(price)||price<1||price>10000000||!Number.isInteger(stock)||stock<0||stock>9999)return null;
 const name=field('name',60);if(!name)return null;
 return {id,name,price,type:value.type==='performance'?'performance':'everyday',tag:field('tag',60),subtitle:field('subtitle',80),description:field('description',140),detail:field('detail',320),case:field('case',70),display:field('display',70),brightness:field('brightness',50),battery:field('battery',70),water:field('water',50),gps:field('gps',70),weight:field('weight',50),defaultColor:finishes[value.defaultColor]?value.defaultColor:'graphite',madeFor:field('madeFor',90),tone:['ultra','pro','core','active','air','mini'].includes(value.tone)?value.tone:'pro',stock,published:value.published!==false};
}
function catalogFromStorage(){const raw=read(CATALOG_KEY,null);if(!Array.isArray(raw))return baseProducts.map(p=>({...p,stock:20,published:true}));const seen=new Set();return raw.slice(0,30).map(normalizeProduct).filter(p=>{if(!p||seen.has(p.id))return false;seen.add(p.id);return true;});}
export const allProducts=catalogFromStorage();
export const products=allProducts.filter(p=>p.published);
export const getProduct=id=>products.find(p=>p.id===id);
export function saveCatalog(list){if(!Array.isArray(list)||list.length>30)return false;const seen=new Set(),clean=[];for(const entry of list){const p=normalizeProduct(entry);if(!p||seen.has(p.id))return false;seen.add(p.id);clean.push(p);}write(CATALOG_KEY,clean);return true;}
export function readBag(){const raw=read('xeight-bag',[]);return Array.isArray(raw)?raw.filter(i=>getProduct(i.id)&&finishes[i.color]&&['S/M','M/L'].includes(i.size)&&Number.isInteger(i.qty)&&i.qty>0&&i.qty<=10):[];}
export function readSaved(){const raw=read('xeight-saved',[]);return Array.isArray(raw)?raw.filter(id=>getProduct(id)):[];}
export function addBag(id,color='graphite',size='M/L',qty=1){const p=getProduct(id);if(!p||p.stock===0||!finishes[color]||!['S/M','M/L'].includes(size)||!Number.isInteger(qty)||qty<1||qty>10)return false;const bag=readBag(),old=bag.find(i=>i.id===id&&i.color===color&&i.size===size);if(old){if(old.qty+qty>10||old.qty+qty>p.stock)return false;old.qty+=qty;}else{if(qty>p.stock)return false;bag.push({id,color,size,qty});}write('xeight-bag',bag);return true;}
export const subtotal=bag=>bag.reduce((sum,i)=>sum+getProduct(i.id).price*i.qty,0);
export const productImage=p=>`<img class="product-image ${p.tone}" src="assets/watch.png" alt="${p.name} concept watch" width="500" height="500" loading="lazy">`;
export function readDemoOrders(){const orders=read('xeight-demo-orders',[]);return Array.isArray(orders)?orders.filter(order=>order&&order.demo===true&&typeof order.id==='string').slice(0,50):[];}
export function recordDemoOrder(order){const safe={id:String(order.id).slice(0,40),date:String(order.date).slice(0,30),items:Array.isArray(order.items)?order.items.map(i=>({id:i.id,color:i.color,size:i.size,qty:i.qty})):[],total:Number(order.total)||0,demo:true};write('xeight-last-demo-order',safe);write('xeight-demo-orders',[safe,...readDemoOrders()].slice(0,50));return safe;}
