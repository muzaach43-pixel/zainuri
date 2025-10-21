const tombolSapa=document.getElementById('sapaButton');
tombolSapa.addEventListener('click',function() {
  alert('Welcome To Store!,Terima Kasih Sudah Berkunjung!');
});

// script.js — interaksi sederhana untuk navbar, modal, dan form
document.addEventListener('DOMContentLoaded', ()=>{
  // tahun otomatis
  document.getElementById('year').textContent = new Date().getFullYear()

  // toggle nav (mobile)
  const nav = document.getElementById('nav')
  const navToggle = document.getElementById('navToggle')
  navToggle.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = 'none'
    else nav.style.display = 'flex'
  })

  // modal proyek
  const modal = document.getElementById('modal')
  const modalTitle = document.getElementById('modalTitle')
  const modalDesc = document.getElementById('modalDesc')
  const modalClose = document.getElementById('modalClose')

  document.querySelectorAll('.project-card .details-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.project-card')
      modalTitle.textContent = card.dataset.title
      modalDesc.textContent = card.dataset.desc
      modal.classList.remove('hidden')
      modal.setAttribute('aria-hidden','false')
    })
  })

  modalClose.addEventListener('click', ()=>{
    modal.classList.add('hidden')
    modal.setAttribute('aria-hidden','true')
  })

  modal.addEventListener('click', (e)=>{
    if(e.target === modal) { modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true') }
  })

  // contact form (contoh: prevent default, bisa diganti dengan fetch/ajax)
  const form = document.getElementById('contactForm')
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    alert('Pesan terkirim! (contoh)')
    form.reset()
  })
})
