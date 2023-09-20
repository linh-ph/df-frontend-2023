// Your JS code goes here
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
///
const btnAdd = $('#btn-add');
const modalAdd = $('#modal-add');
const tableContent = $('#content-table');
const randomId = () => Math.floor(Math.random() * 100);

let dataLocal = JSON.parse(localStorage.getItem('data')) || [];
const tableData = [
  {
    id: randomId(),
    name: 'Refactoring',
    author: 'Martin fowler',
    topic: 'Programming',
  },
  {
    id: randomId(),
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: randomId(),
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'Devops',
  },
];
//set data local
const handleSetDataLocal = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
};

if (!dataLocal.length) {
    handleSetDataLocal(tableData);

    window.location.reload();
}

const displayTableData = (data = []) => {
    const dataTable = data
    .map(
        (item) => `
        <tr id="${item.id}">
        <td>${item.name}</td>
        <td>${item.author}</td>
        <td>${item.topic}</td>
        <td class="action-item" id="${item.name}__${item.id}">Delete</td>
        </tr>
        `
    )
    .join('');
  
    tableContent.innerHTML = dataTable;
};
  
displayTableData(dataLocal);

///
btnAdd.addEventListener('click', () => {
    modalAdd.style.display = 'block';
    console.log("action add...");
});

const btnClose = $('#btn-close');
const inputName = $('#name');
const inputAuthor = $('#author');
const inputTopic = $('#topic');
btnClose.addEventListener('click', () => {
    inputName.value = '';
  
    inputAuthor.value = '';
  
    inputTopic.value = '';
  
    modalAdd.style.display = 'none';
});

const form = $('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const nameValue = inputName.value;
  
    const authorValue = inputAuthor.value;
  
    const topicValue = inputTopic.value;
  
    if (nameValue && authorValue && topicValue) {
      dataLocal.push({
        id: randomId() * 10,
        name: nameValue,
        author: authorValue,
        topic: topicValue,
      });
  
      handleSetDataLocal(dataLocal);
    }
  
    inputName.value = '';
  
    inputAuthor.value = '';
  
    inputTopic.value = '';
  
    modalAdd.style.display = 'none';
  
    window.location.reload();
});

//delete item
const modalConfirm = $('#modal-confirm');
const deleteActions = $$('.action-item');
const btnCloseDelete = $('#close-modal-confirm');
const btnCancel = $('#btn-cancel');
const btnDelete = $('#btn-delete');

const handleRemoveRow = (id) => {
    if (id) {
      const findItem = dataLocal.findIndex((item) => item.id === Number(id));
  
      dataLocal.splice(findItem, 1);
  
      handleSetDataLocal(dataLocal);
    }
};

tableContent.addEventListener('click',(e) => {
    const className = e.target.className;
    if (className === 'action-item') {
        modalConfirm.style.display = 'block';

        // console.log("cjecl " +  e.target.id.split('__'));
        //lấy id của class="action-item" trong data table
        let content = e.target.id.split('__');// name, id

        const ele = e.target.parentElement;

        const nameDelete = $('#name-delete');

        nameDelete.innerText = content[0];

        btnDelete.addEventListener('click', (e) => {
            if (content) {
                handleRemoveRow(content[1]);
                ele.remove();
            }

            modalConfirm.style.display = 'none';
        });

        btnCancel.addEventListener('click', () => {
            content = null;
            modalConfirm.style.display = 'none';
        });
        }
    },
    false
);

////
btnCloseDelete.addEventListener('click', () => {
    modalConfirm.style.display = 'none';
});

