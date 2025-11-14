function toggleMenu(){
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");
  const open = menu.classList.toggle("show");
  overlay.classList.toggle("show", open);
}

function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=> t.classList.remove("show"), 2600);
}

// زر "تمت المعالجة"
function markDone(id){
  const card = document.querySelector(`.message-card[data-id="${id}"]`);
  if(card){
    card.style.opacity = "0.4";
    showToast("✔ تم تعليم الشكوى كـ 'معالجة'");
  }
}

// زر "حذف"
function deleteMessage(id){
  const card = document.querySelector(`.message-card[data-id="${id}"]`);
  if(card){
    card.remove();
    showToast("🗑 تم حذف الشكوى");
  }
}