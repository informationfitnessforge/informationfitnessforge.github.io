// Contact page message form: sends to the Fitness Forge inbox through Web3Forms
// (same free service and public key as the Forge form).
const MESSAGE_KEY = 'b0d8ff2a-e942-4927-a226-f63c8a366a4b';
const byId = (id) => document.getElementById(id);
const messageForm = byId('message');
const messageStatus = byId('message-status');

function messageError(text, field) {
  messageStatus.textContent = text;
  messageStatus.classList.add('error');
  if (field) field.focus();
}

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = byId('message-name').value.trim();
  const email = byId('message-email').value.trim();
  const text = byId('message-text').value.trim();
  if (!name) return messageError('Please add your name.', byId('message-name'));
  if (!email || !byId('message-email').checkValidity()) return messageError('Please add a valid email so the Forgemaster can reply.', byId('message-email'));
  if (!text) return messageError('Please write your message.', byId('message-text'));

  const button = byId('message-send');
  button.disabled = true;
  button.textContent = 'Sending…';
  messageStatus.textContent = '';
  messageStatus.classList.remove('error');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: MESSAGE_KEY,
        subject: `Message from ${name}`,
        from_name: 'Fitness Forge website',
        name,
        email,
        message: text,
        botcheck: messageForm.querySelector('.trap').checked,
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Send failed');
    byId('message-sent-email').textContent = email;
    messageForm.hidden = true;
    byId('message-sent').hidden = false;
    byId('message-sent').focus();
  } catch {
    messageError("That didn't go through. Please check your connection and try again in a moment.");
  } finally {
    button.disabled = false;
    button.textContent = 'Send message';
  }
});
