document.addEventListener('DOMContentLoaded', () => {
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const taskInput = document.getElementById('new-task');
  const taskDateTime = document.getElementById('task-date-time');

  // Modal elements for editing tasks
  const editTaskModal = document.getElementById('edit-task-modal');
  const editTaskInput = document.getElementById('edit-task-input');
  const editTaskDateTime = document.getElementById('edit-task-date-time');
  const saveTaskButton = document.getElementById('save-task');
  let currentEditTask = null;

  // Add task to the list
  addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value;
      const taskDate = taskDateTime.value;

      if (taskText && taskDate) {
          const taskItem = document.createElement('li');
          taskItem.className = 'task-item';

          taskItem.innerHTML = `
              <span>${taskText} - <em>${taskDate}</em></span>
              <div class="task-buttons">
                  <button class="complete">Complete</button>
                  <button class="edit">Edit</button>
                  <button class="delete">Delete</button>
              </div>
          `;

          taskList.appendChild(taskItem);
          taskInput.value = '';
          taskDateTime.value = '';

          attachTaskEvents(taskItem);
      } else {
          alert('Please enter a task and a date.');
      }
  });

  function attachTaskEvents(taskItem) {
      const completeButton = taskItem.querySelector('.complete');
      const editButton = taskItem.querySelector('.edit');
      const deleteButton = taskItem.querySelector('.delete');

      // Mark task as complete with smooth animation
      completeButton.addEventListener('click', () => {
          taskItem.style.transition = 'background-color 0.5s ease, text-decoration 0.3s ease';
          taskItem.style.backgroundColor = '#d4edda';
          taskItem.style.textDecoration = 'line-through';
      });

      // Open modal to edit the task
      editButton.addEventListener('click', () => {
          currentEditTask = taskItem;
          const taskText = taskItem.querySelector('span').textContent.split(' - ')[0];
          const taskDate = taskItem.querySelector('em').textContent;
          editTaskInput.value = taskText;
          editTaskDateTime.value = taskDate;
          editTaskModal.style.display = 'block';
      });

      // Delete task with smooth removal
      deleteButton.addEventListener('click', () => {
          taskItem.style.transition = 'opacity 0.5s ease';
          taskItem.style.opacity = '0';
          setTimeout(() => {
              taskItem.remove();
          }, 500);
      });
  }

  // Save edited task
  saveTaskButton.addEventListener('click', () => {
      if (currentEditTask) {
          currentEditTask.querySelector('span').innerHTML = `${editTaskInput.value} - <em>${editTaskDateTime.value}</em>`;
          editTaskModal.style.display = 'none';
      }
  });

  // Close modal
  document.querySelector('.close').addEventListener('click', () => {
      editTaskModal.style.display = 'none';
  });

  // Close modal if clicked outside
  window.addEventListener('click', (event) => {
      if (event.target === editTaskModal) {
          editTaskModal.style.display = 'none';
      }
  });
});
