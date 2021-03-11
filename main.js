(function () {
   console.log('hi')
   let todoItems = {
      current: [{
         taskID: itemID(),
         taskContent: "Task 1",
         taskState: "current"
      }, {
         taskID: itemID(),
         taskContent: "Task 2",
         taskState: "current"
      },],
      completed: [{
         taskID: itemID(),
         taskContent: "Task 3",
         taskState: "completed"
      }],
      get currentTask() {
         return this.current.length
      },
      get allTask() {
         return this.current.length + this.completed.length
      }

   }
   let taskList = document.getElementById('app__list')
   let allTasks = document.getElementById('js-all-tasks')
   let currentTasks = document.getElementById('js-current-tasks')
   let addNewTaskField = document.getElementById('app__task-new')

   function init() {
      for (let item of todoItems.current) {
         createItem(item)
      }
      for (let item of todoItems.completed) {
         createItem(item)
      }
      allTasks.innerHTML = todoItems.allTask
      currentTasks.innerHTML = todoItems.currentTask
   }

   function itemID() {
      console.log((Math.random()).toString(36).substr(2, 16))
      return (Math.random()).toString(36).substr(2, 16)
   }
   function createItem(el) {
      console.log(el)
      let item = document.createElement('input'),
         gap = document.createElement('br'),
         remove = document.createElement('div'),
         wrapper = document.createElement('div'),
         text = document.createElement('span');
      item.type = "checkbox";
      remove.classList.add('app__list-remove')
      remove.addEventListener('click', function () {
         removeTask(this)
      })
      text.classList.add('app__list-text')
      text.addEventListener('click', function () {
         completedTask(this)
      })
      item.addEventListener('click', function () {
         completedTask(this)
      })
      switch (el.taskState) {
         case 'completed':
            wrapper.classList.add('app__list-item', 'app__list-item-completed')
            item.setAttribute('checked', 'checked')
            break
         default:
            wrapper.classList.add('app__list-item')
            break
      }
      (function displayAll() {
         wrapper.id = el.taskID
         text.innerHTML = el.taskContent

         taskList.appendChild(wrapper)
         wrapper.appendChild(item)
         wrapper.appendChild(text)
         wrapper.appendChild(remove);
         wrapper.appendChild(gap)
      })()

   }



   function completedTask(el) {
      let elem = el.parentNode,
         input = elem.firstChild,
         elemID = elem.id,
         elemState = elem.classList.contains('app__list-item-completed');

      const [itemsRemove, itemsAdd] = elemState ? [todoItems.completed, todoItems.current] : [todoItems.current, todoItems.completed]
      elem.classList.toggle('app__list-item-completed')
      elemState ? input.removeAttribute('checked') : input.setAttribute('checked', 'checked')

      for (const [index, item] of itemsRemove.entries()) {
         if (item.taskID !== elemID) continue
         itemsAdd.push(item)
         itemsRemove.splice(index, 1)
      }
      currentTasks.innerHTML = todoItems.currentTask

   }
   function removeTask(el) {
      let removeEl = el.parentNode,
         removeElID = removeEl.id,
         removeElStatus = removeEl.classList.contains('app__list-item-completed');
      removeEl.remove();
      const items = removeElStatus ? todoItems.completed : todoItems.current;
      for (let [index, item] of items.entries()) {
         if (item.taskID !== removeElID) continue
         items.splice(index, 1)
      }
      allTasks.innerHTML = todoItems.allTask
      currentTasks.innerHTML = todoItems.currentTask
   }
   init()
   function addTask(el) {
      let elem = {
         taskID: itemID(),
         taskContent: el,
         taskState: "current"
      }
      todoItems.current.push(elem)
      createItem(elem)
      allTasks.innerHTML = todoItems.allTask
      currentTasks.innerHTML = todoItems.currentTask
   }
   addNewTaskField.addEventListener('keyup', function (e) {

      if (e.code === 'Enter') {
         addTask(this.value)
         this.value = ''
      }
   })
})()
