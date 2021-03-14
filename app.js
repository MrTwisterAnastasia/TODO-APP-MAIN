let taskList = document.getElementById('app__list');
let currentTasks = document.getElementById('js-current-tasks');
let addNewTaskField = document.getElementById('app__task-new');

let all = document.querySelectorAll('.app__footer-all');
let active = document.querySelectorAll('.app__footer-active');
let completed = document.querySelectorAll('.app__footer-completed');
let clearCompleted = document.getElementById('app__footer-clear');

class Task {
   constructor(text, taskID, labelID) {
      this.taskContent = text;
      this.taskID = taskID;
      this.labelID = labelID;
      this.taskState = "current";
   }
}

class TodoItemsContainer {
   current = [];
   completed = [];
   constructor(tasks = []) {
      for (let task of tasks) {
         if (task.taskState != "completed") {
            this.current.push(task)
         } else {
            this.completed.push(task)
         }
      }


   }

   get currentTask() {
      return this.current.length;
   }
}
class ToDolist {

   constructor(name) {
      this.name = name;
      let task_1 = new Task("Task 1", this.itemID(), this.itemID());
      let task_2 = new Task("Task 2", this.itemID(), this.itemID());
      let task_3 = new Task("Task 3", this.itemID(), this.itemID());
      task_3.taskState = "completed";
      this.todoItems = new TodoItemsContainer([task_1, task_2, task_3]);

   }




   addTask(el) {
      if (el == '' || el == null) {
         alert("I see you are really lazy today :)");
      } else {
         let elem = new Task(el, this.itemID(), this.itemID())
         this.todoItems.current.push(elem);
         this.createItem(elem);
         currentTasks.innerHTML = this.todoItems.currentTask;
      }


   }
   itemID() {
      return (Math.random()).toString(36).substr(2, 16);
   }



   createItem(el) {

      let item = document.createElement('input'),
         gap = document.createElement('br'),
         labelDiv = document.createElement('div'),
         label = document.createElement('label'),
         wrapper = document.createElement('div'),
         remove = document.createElement('div'),
         text = document.createElement('span');


      item.type = "checkbox";
      remove.classList.add('app__list-remove');
      item.classList.add('app__list-input');
      labelDiv.classList.add('app__list-input-block');
      text.classList.add('app__list-text');



      text.addEventListener('click', (event) => this.completedTask(event.target));
      item.addEventListener('click', (event) => this.checkedTask(event.target));
      remove.addEventListener('click', (event) => this.removeTask(event.target));
      wrapper.addEventListener('dragstart', (event) => this.dragTask(event.target));
      wrapper.addEventListener('dragend', (event) => this.dragTask(event.target));


      switch (el.taskState) {
         case 'completed':
            wrapper.classList.add('app__list-item', 'app__list-item-completed');
            wrapper.setAttribute('draggable', 'true');
            item.setAttribute('checked', 'checked');

            break
         default:
            wrapper.classList.add('app__list-item');
            wrapper.setAttribute('draggable', 'true');
            break
      }

      wrapper.id = el.taskID;
      item.id = el.labelID;
      label.setAttribute('for', `${el.labelID}`);
      text.innerHTML = el.taskContent

      taskList.appendChild(wrapper);
      wrapper.appendChild(labelDiv);
      labelDiv.appendChild(item);
      labelDiv.appendChild(label);
      wrapper.appendChild(text);
      wrapper.appendChild(remove);
      wrapper.appendChild(gap);


   }

   dragTask(draggable) {
      draggable.classList.toggle('dragging');
   }
   completedTask(el) {
      let elem = el.parentNode,
         elemID = elem.id,
         elemState = elem.classList.contains('app__list-item-completed'),
         inputDiv = elem.firstChild,
         input = inputDiv.firstChild;

      const [itemsRemove, itemsAdd] = elemState ? [this.todoItems.completed, this.todoItems.current] : [this.todoItems.current, this.todoItems.completed];
      elem.classList.toggle('app__list-item-completed');

      elemState ? input.checked = false : input.checked = true;

      for (const [index, item] of itemsRemove.entries()) {
         if (item.taskID !== elemID) continue;
         itemsAdd.push(item);
         itemsRemove.splice(index, 1);
      }
      currentTasks.innerHTML = this.todoItems.currentTask;

   }
   checkedTask(el) {

      let elem = el.parentNode,
         elemParent = elem.parentNode,
         elemParentID = elemParent.id,
         elemState = elemParent.classList.contains('app__list-item-completed');


      const [itemsRemove, itemsAdd] = elemState ? [this.todoItems.completed, this.todoItems.current] : [this.todoItems.current, this.todoItems.completed];
      elemParent.classList.toggle('app__list-item-completed');

      for (const [index, item] of itemsRemove.entries()) {
         if (item.taskID !== elemParentID) continue;
         itemsAdd.push(item);
         itemsRemove.splice(index, 1);
      }
      currentTasks.innerHTML = this.todoItems.currentTask;
   }
   removeTask(el) {
      let removeEl = el.parentNode,
         removeElID = removeEl.id,
         removeElStatus = removeEl.classList.contains('app__list-item-completed');
      removeEl.remove();
      const items = removeElStatus ? this.todoItems.completed : this.todoItems.current;
      for (let [index, item] of items.entries()) {
         if (item.taskID !== removeElID) continue;
         items.splice(index, 1);
      }

      currentTasks.innerHTML = this.todoItems.currentTask;
   }

   init() {
      while (taskList.firstChild) {
         taskList.removeChild(taskList.firstChild);
      }
      for (let item of this.todoItems.completed) {
         item.taskState = 'completed';
         this.createItem(item);
      }
      for (let item of this.todoItems.current) {
         item.taskState = 'current';
         this.createItem(item);
      }


      currentTasks.innerHTML = this.todoItems.currentTask
   }
   displayActive() {
      while (taskList.firstChild) {
         taskList.removeChild(taskList.firstChild);
      }
      for (let item of this.todoItems.current) {
         item.taskState = 'current'
         this.createItem(item)
      }

      currentTasks.innerHTML = this.todoItems.currentTask;
   }
   displayCompleted() {
      while (taskList.firstChild) {
         taskList.removeChild(taskList.firstChild);
      }
      for (let item of this.todoItems.completed) {
         item.taskState = 'completed';
         this.createItem(item);
      }

      currentTasks.innerHTML = this.todoItems.currentTask;
   }
   clearCompletedTasks() {

      let removeEls = document.querySelectorAll('.app__list-item-completed');
      removeEls.forEach(function (elem) {
         elem.parentNode.removeChild(elem);
      });

      let items = this.todoItems.completed;

      items.splice(0, items.length);
   }
   dradover(e) {
      e.preventDefault();
      const afteElement = this.getDragAfterElement(taskList, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afteElement == null) {
         taskList.appendChild(draggable);
      } else {
         taskList.insertBefore(draggable, afteElement);
      }
   }
   getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.app__list-item:not(.dragging)')];
      return draggableElements.reduce((closest, child) => {
         const box = child.getBoundingClientRect();
         const offset = y - box.top - box.height / 2;

         if (offset < 0 && offset > closest.offset) {
            return {
               offset: offset,
               element: child
            }
         } else {
            return closest;
         }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
   }
}
let TODO = new ToDolist('TODO');
addNewTaskField.addEventListener('keyup', function (e) {

   if (e.code === 'Enter') {
      TODO.addTask(this.value)
      this.value = ''
   }
});




window.addEventListener('load', TODO.init());

all.forEach(el => el.addEventListener('click', () => TODO.init()));
active.forEach(el => el.addEventListener('click', () => TODO.displayActive()));
completed.forEach(el => el.addEventListener('click', () => TODO.displayCompleted()));
taskList.addEventListener('dragover', (e) => TODO.dradover(e));
clearCompleted.addEventListener('click', () => TODO.clearCompletedTasks());

toggleThemeBtn.addEventListener('click', () => {
   document.body.classList.toggle('dark')
   toggleThemeImg.src = document.body.classList.contains('dark') ? './images/icon-sun.svg' : './images/icon-moon.svg'
});



