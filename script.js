let list = document.querySelector('ul.list');
let btnAdd = document.getElementById('btnAdd');
let listTask = [];

if(localStorage.getItem('listTask')) {
	listTask = JSON.parse(localStorage.getItem('listTask'));
}

function saveLocalStorage() {
	localStorage.setItem('listTask', JSON.stringify(listTask));
}

btnAdd.addEventListener('click', function(event) {
	event.preventDefault();
	let content = document.getElementById('task').value.trim();

	if(content === '') {
		alert('Please enter a task!');
		return;
	}

	listTask.unshift({
		content: content,
		status: 'doing'
	});

	addTaskToHTML();
	document.getElementById('task').value = '';
	saveLocalStorage();
});

function addTaskToHTML() {
	list.innerHTML = '';

	listTask.forEach((task, index) => {
		let newTask = document.createElement('li');
		newTask.classList.add(task.status);
		newTask.innerHTML = `
			<div class="complete-icon" onClick="completeTask(${index})">
				<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
				</svg>
			</div>
			<div class="content">${escapeHtml(task.content)}</div>
			<div class="close-icon" onClick="deleteTask(${index})">
				<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
				</svg>
			</div>
		`;
		list.appendChild(newTask);
	});
}

function escapeHtml(str) {
	return str.replace(/[&<>"']/g, function(match) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		};
		return map[match];
	});
}

function completeTask(index) {
	listTask[index].status = 'complete';
	addTaskToHTML();
	saveLocalStorage();
}

function deleteTask(index) {
	listTask = listTask.filter((task, newIndex) => newIndex !== index);
	addTaskToHTML();
	saveLocalStorage();
}

addTaskToHTML();