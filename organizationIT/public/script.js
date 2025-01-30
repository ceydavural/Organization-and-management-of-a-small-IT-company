
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const calendar = document.getElementById('calendar');
  
    let selectedDate = null;
  
    
    function generateCalendar() {
      const date = new Date();
      const month = date.getMonth();
      const year = date.getFullYear();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();
  
      calendar.innerHTML = '';
  
      for (let i = 1; i <= totalDays; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.style.padding = "5px";
        dayDiv.style.fontSize = "12px";
        dayDiv.addEventListener('click', () => {
          selectedDate = new Date(year, month, i); 
          highlightSelectedDay(dayDiv); 
          alert(`Selected Day: ${i}`); 
        });
        calendar.appendChild(dayDiv);
      }
    }
  
    function highlightSelectedDay(selectedDiv) {
      const days = calendar.querySelectorAll('div');
      days.forEach(day => day.classList.remove('selected')); 
      selectedDiv.classList.add('selected'); 
    }
  
    generateCalendar(); 
  
    



    addButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '' && selectedDate !== null) {
        addTask(taskText, selectedDate);
        taskInput.value = ''; 
      } else if (selectedDate === null) {
        alert('Please select a date from the calendar!');
      }
    });
  
    
    function addTask(taskText, date) {
      const li = document.createElement('li');
      li.textContent = taskText;
      const dateString = date.toDateString(); 
      li.setAttribute('data-date', dateString); 
  
     
      const closeBtn = document.createElement('span');
      closeBtn.textContent = '×';
      closeBtn.className = 'close';
      closeBtn.addEventListener('click', () => {
        li.remove();
      });
      li.appendChild(closeBtn);
  
     
      li.addEventListener('click', () => {
        li.classList.toggle('checked');
      });
  
      taskList.appendChild(li); 
    }
  
    
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addButton.click();
      }
    });
  });
  