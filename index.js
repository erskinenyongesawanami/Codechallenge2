const form = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');

let guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = guestInput.value.trim();
  if (!name) return;

  if (guests.length >= 10) {
    alert('The guest list is full. The maximum is 10 people.');
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    attending: true
  };

  guests.push(guest);
  renderGuests();
  guestInput.value = '';
});

function renderGuests() {
  guestList.innerHTML = '';
  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = guest.attending ? '' : 'not-attending';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = guest.name;

    const statusSpan = document.createElement('span');
    statusSpan.className = 'status';
    statusSpan.textContent = guest.attending ? '(Attending)' : '(Not Attending)';

    const btnGroup = document.createElement('div');
    btnGroup.className = 'buttons';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    };

    btnGroup.appendChild(toggleBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(nameSpan);
    li.appendChild(statusSpan);
    li.appendChild(btnGroup);
    guestList.appendChild(li);
  });
}
