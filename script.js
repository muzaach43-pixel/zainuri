// Simple frontend-only "Discord-like" chat app
// - Stores messages in localStorage
// - Supports sending, timestamp, and simple bot reply
// - Works as a static site (GitHub Pages friendly)

const chatEl = document.getElementById('chat');
const inputEl = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const usernameLabel = document.getElementById('usernameLabel');
const changeNameBtn = document.getElementById('changeNameBtn');

const STORAGE_KEY = 'discordish_messages_v1';
const NAME_KEY = 'discordish_name_v1';

let username = localStorage.getItem(NAME_KEY) || Guest${Math.floor(Math.random()*900+100)};
usernameLabel.textContent = username;

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function saveMessages(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function formatTime(ts){
  const d = new Date(ts);
  return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}

function createMessageElement(msg){
  const wrap = document.createElement('div');
  wrap.className = 'msg';

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = msg.name[0].toUpperCase();

  const body = document.createElement('div');
  body.className = 'msg-body';

  const meta = document.createElement('div');
  meta.className = 'msg-meta';
  const nameEl = document.createElement('span');
  nameEl.className = 'username';
  nameEl.textContent = msg.name;
  const timeEl = document.createElement('span');
  timeEl.className = 'timestamp';
  timeEl.textContent = formatTime(msg.ts);

  meta.appendChild(nameEl);
  meta.appendChild(timeEl);

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = escapeHtml(msg.text);

  body.appendChild(meta);
  body.appendChild(bubble);

  wrap.appendChild(avatar);
  wrap.appendChild(body);

  return wrap;
}

function escapeHtml(unsafe) {
  return unsafe
       .replaceAll('&', '&amp;')
       .replaceAll('<', '&lt;')
       .replaceAll('>', '&gt;')
       .replaceAll('"', '&quot;')
       .replaceAll("'", '&#039;');
}

function render(){
  chatEl.innerHTML = '';
  messages.forEach(m=>{
    chatEl.appendChild(createMessageElement(m));
  });
  // scroll to bottom
  chatEl.scrollTop = chatEl.scrollHeight;
}

function addMessage(name, text){
  if(!text || text.trim()==='') return;
  const msg = { name, text: text.trim(), ts: Date.now() };
  messages.push(msg);
  saveMessages();
  render();
  // simple "bot" reply for demo
  if(Math.random() < 0.25){
    setTimeout(()=> addBotReply(msg), 700 + Math.random()*1000);
  }
}

function addBotReply(triggerMsg){
  const botName = 'HelperBot';
  const replies = [
    Keren, ${triggerMsg.name}!,
    Aku ngerti — "${shorten(triggerMsg.text, 30)}",
    Hehe 😂,
    Mau bantu apa lagi, ${triggerMsg.name}?,
    Noted ✅
  ];
  const text = replies[Math.floor(Math.random()*replies.length)];
  const msg = { name: botName, text, ts: Date.now() };
  messages.push(msg);
  saveMessages();
  render();
}

function shorten(s, n){
  return s.length > n ? s.slice(0,n-1) + '…' : s;
}

// UI events
sendBtn.addEventListener('click', ()=> {
  addMessage(username, inputEl.value);
  inputEl.value = '';
  inputEl.focus();
});

inputEl.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    e.preventDefault();
    addMessage(username, inputEl.value);
    inputEl.value = '';
  }
});

// change username
changeNameBtn.addEventListener('click', ()=>{
  const nm = prompt('Masukkan nama (1-20 karakter):', username) || username;
  const trimmed = nm.trim().slice(0,20);
  username = trimmed || username;
  localStorage.setItem(NAME_KEY, username);
  usernameLabel.textContent = username;
});

// initial render
render();

// For demo: populate with sample messages if empty
if(messages.length === 0){
  messages = [
    {name:'System', text:'Selamat datang di Discord-ish!', ts: Date.now()-1000*60*60},
    {name:'Alice', text:'Halo semuanya 👋', ts: Date.now()-1000*60*50},
    {name:'Bob', text:'Siap work from home hari ini.', ts: Date.now()-1000*60*30}
  ];
  saveMessages();
  render();
}
