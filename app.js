let taskList = document.getElementById('app__list')
let currentTasks = document.getElementById('js-current-tasks')
let addNewTaskField = document.getElementById('app__task-new')

let all = document.getElementById('app__footer-all')
let active = document.getElementById('app__footer-active')
let completed = document.getElementById('app__footer-completed')
let clearCompleted = document.getElementById('app__footer-clear')


class toDolist {

   constructor(name) {
      this.name = name
   }

   todoItems = {
      current: [{
         taskID: this.itemID(),
         labelID: this.itemID(),
         taskContent: "Task 1",
         taskState: "current"
      }, {
         taskID: this.itemID(),
         labelID: this.itemID(),
         taskContent: "Task 2",
         taskState: "current"
      },],
      completed: [{
         taskID: this.itemID(),
         labelID: this.itemID(),
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
   addTask(el) {
      let elem = {
         taskID: this.itemID(),
         labelID: this.itemID(),
         taskContent: el,
         taskState: "current"
      }
      this.todoItems.current.push(elem)
      this.createItem(elem)

      currentTasks.innerHTML = this.todoItems.currentTask

   }
   itemID() {

      return (Math.random()).toString(36).substr(2, 16)
   }
   textEvent = []
   removeEvent = []
   itemEvent = []
   wrapperEvent = []
   createItem(el) {
      // console.log(el)
      // console.log(this)
      this.item = document.createElement('input')
      let gap = document.createElement('br'),
         labelDiv = document.createElement('div'),
         label = document.createElement('label');
      this.wrapper = document.createElement('div');
      this.remove = document.createElement('div')
      this.text = document.createElement('span')
      this.item = document.createElement('input')

      this.textEvent.push(this.text)
      this.removeEvent.push(this.remove)
      this.itemEvent.push(this.item)
      this.wrapperEvent.push(this.wrapper)

      // console.log(this.textEvent)
      // console.log(this.removeEvent)
      // console.log(this.itemEvent)
      // console.log(this.wrapperEvent)

      this.item.type = "checkbox";
      this.remove.classList.add('app__list-remove')
      this.item.classList.add('app__list-input')
      labelDiv.classList.add('app__list-input-block')
      this.text.setAttribute('onclick', 'TODO.completedTask(this)')
      this.item.setAttribute('onclick', 'TODO.checkedTask(this)')
      // label.setAttribute('onclick', 'TODO.completedTask(this)')
      this.remove.setAttribute('onclick', 'TODO.removeTask(this)')
      this.wrapper.setAttribute('ondragstart', 'TODO.dragTask(this)')
      this.wrapper.setAttribute('ondragend', 'TODO.dragTask(this)')
      this.text.classList.add('app__list-text')

      // console.log(this.text)
      switch (el.taskState) {
         case 'completed':
            this.wrapper.classList.add('app__list-item', 'app__list-item-completed')
            this.item.setAttribute('checked', 'checked')
            this.wrapper.setAttribute('draggable', 'true')
            break
         default:
            this.wrapper.classList.add('app__list-item')
            this.wrapper.setAttribute('draggable', 'true')
            break
      }

      this.wrapper.id = el.taskID
      this.item.id = el.labelID
      label.setAttribute('for', `${el.labelID}`)
      this.text.innerHTML = el.taskContent

      taskList.appendChild(this.wrapper)
      this.wrapper.appendChild(labelDiv)
      labelDiv.appendChild(this.item)
      labelDiv.appendChild(label)
      this.wrapper.appendChild(this.text)
      this.wrapper.appendChild(this.remove);
      this.wrapper.appendChild(gap)

      // console.log(this)
   }

   dragTask(draggable) {
      draggable.classList.toggle('dragging')
   }
   completedTask(el) {
      let elem = el.parentNode,
         elemID = elem.id,
         elemState = elem.classList.contains('app__list-item-completed'),
         inputDiv = elem.firstChild,
         input = inputDiv.firstChild;

      const [itemsRemove, itemsAdd] = elemState ? [this.todoItems.completed, this.todoItems.current] : [this.todoItems.current, this.todoItems.completed]
      elem.classList.toggle('app__list-item-completed')
      elemState ? input.removeAttribute('checked') : input.setAttribute('checked', 'checked')

      for (const [index, item] of itemsRemove.entries()) {
         if (item.taskID !== elemID) continue
         itemsAdd.push(item)
         itemsRemove.splice(index, 1)
      }
      currentTasks.innerHTML = this.todoItems.currentTask

   }
   checkedTask(el) {

      let elem = el.parentNode,
         elemParent = elem.parentNode,
         elemParentID = elemParent.id,
         elemState = elemParent.classList.contains('app__list-item-completed');

      const [itemsRemove, itemsAdd] = elemState ? [this.todoItems.completed, this.todoItems.current] : [this.todoItems.current, this.todoItems.completed]
      elemParent.classList.toggle('app__list-item-completed')
      elemState ? el.removeAttribute('checked') : el.setAttribute('checked', 'checked')
      for (const [index, item] of itemsRemove.entries()) {
         if (item.taskID !== elemParentID) continue
         itemsAdd.push(item)
         itemsRemove.splice(index, 1)
      }
      currentTasks.innerHTML = this.todoItems.currentTask
   }
   removeTask(el) {
      let removeEl = el.parentNode,
         removeElID = removeEl.id,
         removeElStatus = removeEl.classList.contains('app__list-item-completed');
      removeEl.remove();
      const items = removeElStatus ? this.todoItems.completed : this.todoItems.current;
      for (let [index, item] of items.entries()) {
         if (item.taskID !== removeElID) continue
         items.splice(index, 1)
      }

      currentTasks.innerHTML = this.todoItems.currentTask
   }

   init() {
      while (taskList.firstChild) {
         taskList.removeChild(taskList.firstChild);
      }
      for (let item of this.todoItems.completed) {
         item.taskState = 'completed'
         this.createItem(item)
      }
      for (let item of this.todoItems.current) {
         item.taskState = 'current'
         this.createItem(item)
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

      currentTasks.innerHTML = this.todoItems.currentTask
   }
   displayCompleted() {
      while (taskList.firstChild) {
         taskList.removeChild(taskList.firstChild);
      }
      for (let item of this.todoItems.completed) {
         item.taskState = 'completed'
         this.createItem(item)
      }

      currentTasks.innerHTML = this.todoItems.currentTask
   }
   clearCompleted() {

      let removeEls = document.querySelectorAll('.app__list-item-completed');
      removeEls.forEach(function (elem) {
         elem.parentNode.removeChild(elem);
      });
      let items = this.todoItems.completed
      items.splice(0, items.length)
   }
}
let TODO = new toDolist('TODO')
addNewTaskField.addEventListener('keyup', function (e) {

   if (e.code === 'Enter') {
      TODO.addTask(this.value)
      this.value = ''
   }
})
window.addEventListener('load', TODO.init())
all.addEventListener('click', () => TODO.init())
active.addEventListener('click', () => TODO.displayActive())
completed.addEventListener('click', () => TODO.displayCompleted())
clearCompleted.addEventListener('click', () => TODO.clearCompleted())
taskList.addEventListener('dragover', (e) => {
   // console.log('drag over')
   e.preventDefault()
   const afteElement = getDragAfterElement(taskList, e.clientY)
   const draggable = document.querySelector('.dragging')
   if (afteElement == null) {
      taskList.appendChild(draggable)
   } else {
      taskList.insertBefore(draggable, afteElement)
   }


})

function getDragAfterElement(container, y) {
   const draggableElements = [...container.querySelectorAll('.app__list-item:not(.dragging)')]
   return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2

      if (offset < 0 && offset > closest.offset) {
         return {
            offset: offset,
            element: child
         }
      } else {
         return closest
      }
   }, { offset: Number.NEGATIVE_INFINITY }).element
}

toggleThemeBtn.onclick = () => {
   document.body.classList.toggle('dark')
   toggleThemeImg.src = document.body.classList.contains('dark') ? './images/icon-sun.svg' : './images/icon-moon.svg'
}

// TODO.wrapperEvent.forEach(wrapper => {
//    wrapper.addEventListener('dragging', () => {
//       wrapper.classList.add('dragging')
//    })
// })

// TODO.textEvent[TODO.textEvent.length - 1].onclick = () => console.log('TODO.completedTask(TODO.textEvent[TODO.textEvent.length - 1])')
// for (let i = 0; i < TODO.textEvent.length; i++) {

//    TODO.textEvent[i].addEventListener('click', function (e) {
//       console.log(TODO.textEvent)
//       console.log(TODO.todoItems)
//       console.log(e.target)
//       TODO.completedTask(e.target)
//    })
// }
// for (let index in TODO.itemEvent) {
//    TODO.itemEvent[index].addEventListener('click', function (e) {
//       TODO.completedTask(e.target)
//    })
// }
// for (let index in TODO.removeEvent) {
//    TODO.removeEvent[index].addEventListener('click', function (e) {
//       TODO.removeTask(e.target)
//    })
// }

// class BaseClass {
//    msg = {
//       state: 'id'
//    }
//    basePublicMethod() {
//       console.log(this)
//       return this.msg
//    }
// }
// let User = new BaseClass()
// console.log(User.basePublicMethod())
// console.log(User.msg.state)